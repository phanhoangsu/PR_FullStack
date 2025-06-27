package com.barbershop.service;

import com.barbershop.domain.Product;
import com.barbershop.model.request.ProductRequest;
import com.barbershop.model.response.ProductResponse;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface ProductService {
    ProductResponse create(ProductRequest request);
    ProductResponse update(Integer id, ProductRequest request);
    void delete(Integer id);
    List<ProductResponse> getAll();
    ProductResponse getById(Integer id);
}
