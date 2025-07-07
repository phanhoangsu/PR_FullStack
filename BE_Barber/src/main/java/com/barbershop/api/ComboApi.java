package com.barbershop.api;

import com.barbershop.exception.ErrorCode.ComboErrorCode;
import com.barbershop.exception.ErrorMessage;
import com.barbershop.exception.ErrorMessageLoader;
import com.barbershop.model.request.ComboRequest;
import com.barbershop.model.response.ComboDetailResponse;
import com.barbershop.service.ComboService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/combos")
@CrossOrigin(origins = "*")
public class ComboApi {
    private final ComboService comboService;

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ErrorMessage  create(@RequestBody ComboRequest request) {
        String resultCode  = comboService.createCombo(request);
        return ErrorMessage.builder()
                .errorCode(resultCode)
                .errorMessage(ErrorMessageLoader.getProperty(resultCode))
                .dataError(Map.of("comboName", request.getName())) // tuỳ bạn
                .build();
    }

//@PreAuthorize("hasRole('ROLE_ADMIN')")
@PutMapping("/{id}")
public ErrorMessage update(@PathVariable Integer id, @RequestBody ComboRequest request) {
    ComboDetailResponse response = comboService.updateCombo(id, request);

    return ErrorMessage.builder()
            .errorCode(ComboErrorCode.UPDATE_SUCCESS)
            .errorMessage("Cập nhật combo thành công.")
            .dataError(response)
            .build();
}


//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ErrorMessage  delete(@PathVariable Integer id) {
        comboService.softDeleteCombo(id);
        return ErrorMessage.builder()
                .errorCode(ComboErrorCode.DELETE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ComboErrorCode.DELETE_SUCCESS))
                .build();
    }

    @GetMapping("/{id}")
    public ComboDetailResponse   getDetails(@PathVariable Integer id) {
        return comboService.getComboDetails(id);
    }

    @GetMapping
    public  List<ComboDetailResponse>  getAllActiveCombos() {
        return comboService.getAllActiveCombos();
    }

    @GetMapping("/all")
    public List<ComboDetailResponse> getAllCombos() {
        return comboService.getAllCombos();
    }
}
