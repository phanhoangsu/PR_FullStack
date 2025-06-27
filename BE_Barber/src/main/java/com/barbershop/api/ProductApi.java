package com.barbershop.api;


import com.barbershop.exception.ErrorCode.ProductErrorCode;
import com.barbershop.exception.ErrorMessage;
import com.barbershop.exception.ErrorMessageLoader;
import com.barbershop.model.request.ProductRequest;
import com.barbershop.model.response.ProductResponse;
import com.barbershop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductApi {
    private final ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ErrorMessage  create(@RequestBody ProductRequest productRequest) {
        ProductResponse response = productService.create(productRequest);
        return ErrorMessage.builder()
                .errorCode(ProductErrorCode.CREATE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ProductErrorCode.CREATE_SUCCESS))
                .dataError(response)
                .build();
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ErrorMessage update(@PathVariable Integer id, @RequestBody ProductRequest productRequest) {
        ProductResponse response = productService.update(id, productRequest);
        return ErrorMessage.builder()
                .errorCode(ProductErrorCode.UPDATE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ProductErrorCode.UPDATE_SUCCESS))
                .dataError(response)
                .build();
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ErrorMessage delete(@PathVariable Integer id) {
        productService.delete(id);
        return ErrorMessage.builder()
                .errorCode(ProductErrorCode.DELETE_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ProductErrorCode.DELETE_SUCCESS))
                .build();
    }

    @GetMapping
    public ErrorMessage  getAll() {
        List<ProductResponse> list = productService.getAll();
        return ErrorMessage.builder()
                .errorCode(ProductErrorCode.GET_LIST_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ProductErrorCode.GET_LIST_SUCCESS))
                .dataError(list)
                .build();
    }

    @GetMapping("{id}")
    public ErrorMessage getById(@PathVariable Integer id) {
        ProductResponse response = productService.getById(id);
        return ErrorMessage.builder()
                .errorCode(ProductErrorCode.GET_LIST_SUCCESS)
                .errorMessage(ErrorMessageLoader.getProperty(ProductErrorCode.GET_LIST_SUCCESS))
                .dataError(response)
                .build();
    }
}
