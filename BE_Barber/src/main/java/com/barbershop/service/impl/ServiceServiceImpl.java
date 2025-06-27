package com.barbershop.service.impl;


import com.barbershop.domain.ServiceEntity;
import com.barbershop.enums.ServiceType;
import com.barbershop.exception.BarberException;
import com.barbershop.exception.ErrorCode.ServiceErrorCode;
import com.barbershop.exception.ErrorMessage;
import com.barbershop.exception.ErrorMessageLoader;
import com.barbershop.model.request.ServiceRequest;
import com.barbershop.model.response.ServiceResponse;
import com.barbershop.repository.ServiceRepository;
import com.barbershop.service.ServiceService;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import static com.barbershop.exception.ErrorCode.ServiceErrorCode.*;


@Service
@RequiredArgsConstructor
@Transactional
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;
    private final ModelMapper modelMapper;


    @Override
    public ServiceResponse create(ServiceRequest request) {
        // kiểm tra tên trùng
        if(serviceRepository.existsByServiceName(request.getServiceName())){
            throw new BarberException(DUPLICATE_SERVICE_NAME);
        }
        try {
            ServiceEntity entity = modelMapper.map(request, ServiceEntity.class);
            entity.setIsActive(true);   // đảm bảo mặc định luôn là true khi tạo
            entity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            serviceRepository.save(entity);

          return modelMapper.map(entity, ServiceResponse.class);

        }catch (Exception e){
            throw new BarberException(CREATE_FAILED,e.getMessage());
        }
    }

    @Override
    public ServiceResponse update(Integer id, ServiceRequest request) {
        ServiceEntity entity = serviceRepository.findById(id)
                .orElseThrow(() -> new BarberException(ServiceErrorCode.NOT_FOUND));
        try{
            entity.setServiceName(request.getServiceName());
            entity.setDescription(request.getDescription());
            entity.setPrice(request.getPrice());
            entity.setImageUrl(request.getImageUrl());
            entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            serviceRepository.save(entity);
            return modelMapper.map(entity, ServiceResponse.class);
        }catch (Exception e){
            throw new BarberException(UPDATE_FAILED,e.getMessage());
        }
    }

    @Override
    public void delete(Integer id) {
       ServiceEntity entity= serviceRepository.findById(id)
               .orElseThrow(() -> new BarberException(ServiceErrorCode.NOT_FOUND));
       try{
           entity.setIsActive(false);
           entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
           serviceRepository.save(entity);

       }catch (Exception e){
           throw new BarberException(DELETE_FAILED,e.getMessage());
       }
    }

    @Override
    public List<ServiceResponse> getAll() {
      try{
          return serviceRepository.findByIsActiveTrue().stream()
                  .map(entity -> modelMapper.map(entity, ServiceResponse.class))
                  .toList();
      }catch (Exception e){
          throw new BarberException(GET_LIST_FAILED,e.getMessage());
      }
    }

    @Override
    public ServiceResponse getById(Integer id) {

        ServiceEntity entity =serviceRepository.findById(id)
                .filter(ServiceEntity::getIsActive)
                .orElseThrow(() -> new BarberException(ServiceErrorCode.NOT_FOUND));

        return modelMapper.map(entity, ServiceResponse.class);
    }


    private ServiceResponse mapToResponse(ServiceEntity entity) {
        ServiceResponse response = modelMapper.map(entity, ServiceResponse.class);
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        response.setActive(entity.getIsActive()); // nếu field trong response là `active`
        return response;
    }

}
