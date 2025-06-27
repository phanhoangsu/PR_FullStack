package com.barbershop.service.impl;

import com.barbershop.domain.Product;
import com.barbershop.exception.BarberException;
import com.barbershop.exception.ErrorCode.ProductErrorCode;
import com.barbershop.model.request.ProductRequest;
import com.barbershop.model.response.ProductResponse;
import com.barbershop.repository.ProductRepository;
import com.barbershop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional

public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;


    @Override
    public ProductResponse create(ProductRequest request) {

        if (productRepository.existsByTitle(request.getTitle())) {
            throw new BarberException(ProductErrorCode.DUPLICATE_NAME);
        }
        try {
            Product entity = modelMapper.map(request, Product.class);
            entity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            entity.setIsActive(true);
            productRepository.save(entity);

            return modelMapper.map(entity, ProductResponse.class);

        } catch (Exception e) {
            throw new BarberException(ProductErrorCode.CREATE_FAILED, e.getMessage());
        }
    }

    @Override
    public ProductResponse update(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BarberException(ProductErrorCode.NOT_FOUND));

        try {
            modelMapper.map(request, product);
            product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            productRepository.save(product);
            return modelMapper.map(product, ProductResponse.class);
        } catch (Exception e) {
            throw new BarberException(ProductErrorCode.UPDATE_FAILED, e.getMessage());
        }
    }

    @Override
    public void delete(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BarberException(ProductErrorCode.NOT_FOUND));

        product.setIsActive(false); // soft delete
        productRepository.save(product);
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.findAllByIsActiveTrue().stream()
                .map(p -> modelMapper.map(p, ProductResponse.class))
                .toList();
    }

    @Override
    public ProductResponse getById(Integer id) {
        Product product = productRepository.findById(id)
                .filter(Product::getIsActive)
                .orElseThrow(() -> new BarberException(ProductErrorCode.NOT_FOUND));
        return modelMapper.map(product, ProductResponse.class);
    }
}