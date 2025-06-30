package com.barbershop.service.impl;

import com.barbershop.domain.ComboItem;
import com.barbershop.domain.Product;
import com.barbershop.domain.ServiceEntity;
import com.barbershop.enums.ServiceType;
import com.barbershop.exception.BarberException;
import com.barbershop.exception.ErrorCode.ComboErrorCode;
import com.barbershop.exception.ErrorCode.ProductErrorCode;
import com.barbershop.model.request.ComboRequest;
import com.barbershop.model.response.ComboDetailResponse;
import com.barbershop.model.response.ComboItemResponse;
import com.barbershop.repository.ComboItemRepository;
import com.barbershop.repository.ProductRepository;
import com.barbershop.repository.ServiceRepository;
import com.barbershop.service.ComboService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class ComboServiceImpl implements ComboService {
    private final ServiceRepository serviceRepository;
    private final ProductRepository productRepository;
    private final ComboItemRepository comboItemRepository;
    private final ModelMapper modelMapper;

    @Override
    public String createCombo(ComboRequest request) {
        // Kiểm tra tên combo đã tồn tại chưa
        if (serviceRepository.existsByServiceName(request.getName())) {
            throw new BarberException(ComboErrorCode.DUPLICATE_COMBO_ITEM, "Tên combo đã tồn tại");
        }
        try {
            // Tạo combo
            ServiceEntity combo = new ServiceEntity();
            combo.setServiceName(request.getName());
            combo.setDescription(request.getDescription());
            combo.setType(ServiceType.Combo);
            combo.setIsActive(true);
            combo.setPrice(BigDecimal.ZERO);
            combo.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            combo.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            // ✅ Lưu combo trước để có ID (tránh lỗi TransientPropertyValueException)
            combo = serviceRepository.save(combo);

            BigDecimal totalPrice = BigDecimal.ZERO;

            for (ComboRequest.Item item : request.getItems()) {
                ComboItem item1 = new ComboItem();
                item1.setCombo(combo); // Đã có ID hợp lệ
                item1.setQuantity(item.getQuantity());
                item1.setPrice(item.getPrice());

                // Nếu là Product
                if (item.getProductId() != null) {
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new BarberException(ProductErrorCode.NOT_FOUND));

                    // ✅ Kiểm tra tồn kho
                    if (product.getStock() == null || product.getStock() < item.getQuantity()) {
                        throw new BarberException(ProductErrorCode.OUT_OF_STOCK,
                                "Sản phẩm '" + product.getTitle() + "' không đủ trong kho");
                    }

                    item1.setProduct(product);

                    // Gán mô tả fallback
                    item1.setDescription(item.getDescription() != null
                            ? item.getDescription()
                            : product.getDescription());

                }
                // Nếu là Service
                else if (item.getServiceId() != null) {
                    ServiceEntity service = serviceRepository.findById(item.getServiceId())
                            .filter(ServiceEntity::getIsActive)
                            .orElseThrow(() -> new BarberException(ComboErrorCode.CONTAINS_OUT_OF_STOCK_ITEM));

                    item1.setService(service);

                    // Gán mô tả fallback
                    item1.setDescription(item.getDescription() != null
                            ? item.getDescription()
                            : service.getDescription());
                }
                // Không có ID nào
                else {
                    throw new BarberException(ComboErrorCode.INVALID_DATA, "Mỗi Item phải có productId hoặc serviceId");
                }

                // Lưu item
                comboItemRepository.save(item1);

                // ✅ Tính tổng giá
                totalPrice = totalPrice.add(item1.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            }

            // ✅ Cập nhật tổng giá combo
            combo.setPrice(totalPrice);
            combo.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            serviceRepository.save(combo); // update lại giá combo

            return ComboErrorCode.CREATE_SUCCESS;
        } catch (BarberException e) {
            throw e; // giữ nguyên lỗi có mã lỗi riêng
        } catch (Exception e) {
            throw new BarberException(ComboErrorCode.CREATE_FAILED, e.getMessage());
        }
    }

//    @Override
//    public String updateCombo(Integer id, ComboRequest request) {
//        ServiceEntity combo = serviceRepository.findById(id)
//                .filter(s -> s.getType() == ServiceType.Combo)
//                .orElseThrow(() -> new RuntimeException("Combo not found"));
//
//        // Xóa tất cả ComboItem cũ
//        comboItemRepository.deleteAllByCombo_ServiceId(id);
//
//        BigDecimal totalPrice = BigDecimal.ZERO;
//
//        // Duyệt và thêm lại các item mới từ request
//        for (ComboRequest.Item item : request.getItems()) {
//            ComboItem newItem = new ComboItem();
//            newItem.setCombo(combo);
//            newItem.setQuantity(item.getQuantity());
//            newItem.setPrice(item.getPrice());
//
//            if (item.getProductId() != null) {
//                Product product = productRepository.findById(item.getProductId())
//                        .filter(p -> p.getStock() >= item.getQuantity())
//                        .orElseThrow(() -> new BarberException(ComboErrorCode.CONTAINS_OUT_OF_STOCK_ITEM));

    /// /                Product product=productRepository.findById(item.getProductId())
    /// /                                .orElseThrow(()->new BarberException(ProductErrorCode.NOT_FOUND));
    /// /
    /// /                if(product.getStock() ==null || product.getStock() < item.getQuantity()){
    /// /                    throw new BarberException(ProductErrorCode.OUT_OF_STOCK, "Sản phẩm '" +product.getTitle() + "' không đủ trong kho");
    /// /                }
//
//                newItem.setProduct(product);
//                newItem.setDescription(item.getDescription() != null ? item.getDescription() : product.getDescription());
//
//            } else if (item.getServiceId() != null) {
//                ServiceEntity service = serviceRepository.findById(item.getServiceId())
//                        .filter(ServiceEntity::getIsActive)
//                        .orElseThrow(() -> new BarberException(ComboErrorCode.CONTAINS_DISABLED_ITEM));
//
//                newItem.setService(service);
//                newItem.setDescription(item.getDescription() != null ? item.getDescription() : service.getDescription());
//
//
//            } else {
//                throw new BarberException(ComboErrorCode.INVALID_DATA, "Item phải có serviceId hoặc productId");
//            }
//
//            comboItemRepository.save(newItem);
//            totalPrice = totalPrice.add(newItem.getPrice().multiply(BigDecimal.valueOf(newItem.getQuantity())));
//        }
//
//        combo.setPrice(totalPrice);
//        combo.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
//        serviceRepository.save(combo);
//
//        return ComboErrorCode.UPDATE_SUCCESS;
//    }
    @Override
    public ComboDetailResponse updateCombo(Integer id, ComboRequest request) {
        // Tìm combo cần cập nhật
        ServiceEntity combo = serviceRepository.findById(id)
                .filter(s -> s.getType() == ServiceType.Combo)
                .orElseThrow(() -> new BarberException(ComboErrorCode.NOT_FOUND, "Combo không tồn tại"));

        // Xóa toàn bộ item cũ
        comboItemRepository.deleteAllByCombo_ServiceId(id);

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<ComboItemResponse> itemResponses = new ArrayList<>();

        for (ComboRequest.Item item : request.getItems()) {
            ComboItem newItem = new ComboItem();
            newItem.setCombo(combo);
            newItem.setQuantity(item.getQuantity());
            newItem.setPrice(item.getPrice());

            if (item.getProductId() != null) {
                Product product = productRepository.findById(item.getProductId())
                        .orElseThrow(() -> new BarberException(ProductErrorCode.NOT_FOUND));

                if (product.getStock() == null || product.getStock() < item.getQuantity()) {
                    throw new BarberException(ProductErrorCode.OUT_OF_STOCK,
                            "Sản phẩm '" + product.getTitle() + "' không đủ trong kho");
                }

                newItem.setProduct(product);
                newItem.setDescription(item.getDescription() != null
                        ? item.getDescription()
                        : product.getDescription());

            } else if (item.getServiceId() != null) {
                ServiceEntity service = serviceRepository.findById(item.getServiceId())
                        .filter(ServiceEntity::getIsActive)
                        .orElseThrow(() -> new BarberException(ComboErrorCode.CONTAINS_DISABLED_ITEM));

                newItem.setService(service);
                newItem.setDescription(item.getDescription() != null
                        ? item.getDescription()
                        : service.getDescription());

            } else {
                throw new BarberException(ComboErrorCode.INVALID_DATA, "Item phải có serviceId hoặc productId");
            }

            // Lưu item
            comboItemRepository.save(newItem);

            // Tính tổng tiền
            totalPrice = totalPrice.add(newItem.getPrice().multiply(BigDecimal.valueOf(newItem.getQuantity())));

            // Chuẩn bị phản hồi
            ComboItemResponse itemResponse = new ComboItemResponse();
            itemResponse.setId(newItem.getId());
            itemResponse.setPrice(newItem.getPrice());
            itemResponse.setQuantity(newItem.getQuantity());
            itemResponse.setDescription(newItem.getDescription());

            if (newItem.getProduct() != null) {
                itemResponse.setProductId(newItem.getProduct().getId());
                itemResponse.setServiceName(newItem.getProduct().getTitle());
            } else if (newItem.getService() != null) {
                itemResponse.setServiceId(newItem.getService().getServiceId());
                itemResponse.setServiceName(newItem.getService().getServiceName());
            }

            itemResponses.add(itemResponse);
        }

        // Cập nhật combo
        combo.setPrice(totalPrice);
        combo.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        serviceRepository.save(combo);

        // Trả về thông tin chi tiết combo sau khi cập nhật
        return new ComboDetailResponse(combo.getServiceId(), combo.getServiceName(), itemResponses, totalPrice);
    }

    @Override
    public void softDeleteCombo(Integer id) {
        ServiceEntity combo = serviceRepository.findById(id)
                .filter(s -> s.getType() == ServiceType.Combo)
                .orElseThrow(() -> new BarberException(ComboErrorCode.NOT_FOUND));

        combo.setIsActive(false);
        combo.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        serviceRepository.save(combo);

        List<ComboItem> items = comboItemRepository.findByCombo_ServiceId(id);
        for (ComboItem item : items) {
            item.setIsActive(false);
        }
        comboItemRepository.saveAll(items);
    }

    @Override
    public ComboDetailResponse getComboDetails(Integer id) {
        ServiceEntity combo = serviceRepository.findById(id)
                .filter(s -> s.getType() == ServiceType.Combo)
                .orElseThrow(() -> new BarberException(ComboErrorCode.NOT_FOUND));

        List<ComboItem> items = comboItemRepository.findByCombo_ServiceId(id);

        List<ComboItemResponse> itemResponses = items.stream()
                .map(item -> {
                    ComboItemResponse response = new ComboItemResponse();
                    response.setId(item.getId());
                    response.setPrice(item.getPrice());
                    response.setQuantity(item.getQuantity());
                    response.setDescription(item.getDescription());

                    if (item.getService() != null) {
                        response.setServiceId(item.getService().getServiceId());
                        response.setServiceName(item.getService().getServiceName());

                    } else if (item.getProduct() != null) {
                        response.setProductId(item.getProduct().getId());
                        response.setServiceName(item.getProduct().getTitle());
                    }

                    return response;
                })
                .collect(Collectors.toList());

        BigDecimal total = items.stream()
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new ComboDetailResponse(combo.getServiceId(),combo.getServiceName(), itemResponses, total);
    }

    @Override
    public List<ComboDetailResponse> getAllActiveCombos() {
        List<ServiceEntity> combos = serviceRepository.findByTypeAndIsActiveTrue(ServiceType.Combo);


        return combos.stream().map(combo -> {
            List<ComboItem> items = comboItemRepository.findByCombo_ServiceId(combo.getServiceId());

            List<ComboItemResponse> itemResponses = items.stream().map(item -> {
                ComboItemResponse response = new ComboItemResponse();
                response.setId(item.getId());
                response.setPrice(item.getPrice());
                response.setQuantity(item.getQuantity());
                response.setDescription(item.getDescription());

                if (item.getService() != null) {
                    response.setServiceId(item.getService().getServiceId());
                    response.setServiceName(item.getService().getServiceName());
                } else if (item.getProduct() != null) {
                    response.setProductId(item.getProduct().getId());
                    response.setServiceName(item.getProduct().getTitle());
                }

                return response;
            }).toList();

            BigDecimal total = items.stream()
                    .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            return new ComboDetailResponse(combo.getServiceId(),combo.getServiceName(), itemResponses, total);
        }).toList();
    }

    @Override
    public List<ComboDetailResponse> getAllCombos() {
        List<ServiceEntity> allCombos = serviceRepository.findByType(ServiceType.Combo); // lấy tất cả combo

        return allCombos.stream().map(combo -> {
            List<ComboItem> items = comboItemRepository.findByCombo_ServiceId(combo.getServiceId());

            List<ComboItemResponse> itemResponses = items.stream().map(item -> {
                ComboItemResponse response = new ComboItemResponse();
                response.setId(item.getId());
                response.setPrice(item.getPrice());
                response.setQuantity(item.getQuantity());
                response.setDescription(item.getDescription());

                if (item.getService() != null) {
                    response.setServiceId(item.getService().getServiceId());
                    response.setServiceName(item.getService().getServiceName());
                } else if (item.getProduct() != null) {
                    response.setProductId(item.getProduct().getId());
                    response.setServiceName(item.getProduct().getTitle());
                }

                return response;
            }).toList();

            BigDecimal total = items.stream()
                    .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            return new ComboDetailResponse(combo.getServiceId(),combo.getServiceName(), itemResponses, total);
        }).toList();
    }


}
