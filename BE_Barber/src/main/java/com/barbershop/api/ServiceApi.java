package com.barbershop.api;

import com.barbershop.exception.ErrorCode.CustomerErrorCode;
import com.barbershop.exception.ErrorCode.ServiceErrorCode;
import com.barbershop.exception.ErrorMessage;
import com.barbershop.exception.ErrorMessageLoader;
import com.barbershop.model.request.ServiceRequest;
import com.barbershop.model.response.ServiceResponse;
import com.barbershop.service.ServiceService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ServiceApi {
    private final ServiceService serviceService;

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ErrorMessage  create(@RequestBody ServiceRequest request) {
        ServiceResponse response= serviceService.create(request);

        return ErrorMessage.builder()
                .errorCode(ServiceErrorCode.CREATE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.CREATE_SUCCESS))
                .dataError(response)
                .build();
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ErrorMessage  update(@PathVariable Integer id, @RequestBody ServiceRequest request) {
     ServiceResponse response= serviceService.update(id, request);
        return ErrorMessage.builder()
                .errorCode(ServiceErrorCode.UPDATE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ServiceErrorCode.UPDATE_SUCCESS))
                .dataError(response)
                .build();
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ErrorMessage  delete(@PathVariable Integer id) {
        serviceService.delete(id);
        return ErrorMessage.builder()
                .errorCode(ServiceErrorCode.DELETE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ServiceErrorCode.DELETE_SUCCESS))
                .build();
    }

    @GetMapping
    public ErrorMessage  getAll() {
        List<ServiceResponse> list = serviceService.getAll();
        return ErrorMessage.builder()
                .errorCode(ServiceErrorCode.GET_LIST_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ServiceErrorCode.GET_LIST_SUCCESS))
                .dataError(list)
                .build();
    }

    @GetMapping("/{id}")
    public ErrorMessage  getById(@PathVariable Integer id) {
        ServiceResponse response = serviceService.getById(id);
        return ErrorMessage.builder()
                .errorCode(ServiceErrorCode.GET_LIST_SUCCESS)
                .errorMessage("Lấy dịch vụ thành công")
                .dataError(response)
                .build();
    }

}