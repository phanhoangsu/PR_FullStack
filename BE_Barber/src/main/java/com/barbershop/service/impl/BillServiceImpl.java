package com.barbershop.service.impl;


import com.barbershop.domain.Bill;
import com.barbershop.domain.BillItem;
import com.barbershop.domain.Customer;
import com.barbershop.model.request.BillCreateRequest;
import com.barbershop.model.request.BillItemCreateRequest;
import com.barbershop.model.response.BillItemResponse;
import com.barbershop.model.response.BillResponse;
import com.barbershop.repository.*;
import com.barbershop.service.BillService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final BillItemRepository billItemRepository;
    private final CustomerRepository customerRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final ProductRepository productRepository;
    private final StaffRepository staffRepository;
    private final ModelMapper modelMapper;


    @Override
    public BillResponse getBillId(Integer id) {
        try {
            Bill bill = billRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn ID = " + id));

            BillResponse res = modelMapper.map(bill, BillResponse.class);
            res.setPhoneNumber(bill.getPhoneNumber().getPhoneNumber());

            List<BillItemResponse> items = bill.getBillItems().stream().map(item -> {
                BillItemResponse i = new BillItemResponse();
                i.setServiceName(item.getService() != null ? item.getService().getServiceName() : null);
                i.setProductName(item.getProduct() != null ? item.getProduct().getTitle() : null);
                i.setQuantity(item.getQuantity());
                i.setUnitPrice(item.getUnitPrice());
                i.setTotalPrice(item.getTotalPrice());
                i.setStaffName(item.getStaff() != null ? item.getStaff().getFullName() : null);
                i.setNote(item.getNote());
                return i;
            }).toList();

            res.setItems(items);
            return res;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy hóa đơn: " + e.getMessage(), e);
        }
    }

    @Override
    public BillResponse createBill(BillCreateRequest request) {
        try {
            Bill bill = new Bill();

            Customer customer = customerRepository.findById(request.getPhoneNumber())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));
            bill.setPhoneNumber(customer);
            bill.setNote(request.getNote());
            bill.setPaymentMethod(request.getPaymentMethod());
            bill.setStatus("Chưa thanh toán");
            bill.setBillDate(Timestamp.from(Instant.now()));

            if (request.getAppointmentId() != null) {
                bill.setAppointment(appointmentRepository.findById(request.getAppointmentId()).orElse(null));
            }

            if (request.getCreatedBy() != null) {
                bill.setCreatedBy(userRepository.findById(request.getCreatedBy()).orElse(null));
            }

            bill = billRepository.save(bill);

            BigDecimal totalAmount = BigDecimal.ZERO;

            for (BillItemCreateRequest itemReq : request.getItems()) {
                BillItem item = new BillItem();
                item.setBill(bill);
                item.setQuantity(itemReq.getQuantity());
                item.setUnitPrice(itemReq.getUnitPrice());
                item.setNote(itemReq.getNote());

                if (itemReq.getServiceId() != null) {
                    item.setService(serviceRepository.findById(itemReq.getServiceId()).orElse(null));
                }
                if (itemReq.getProductId() != null) {
                    item.setProduct(productRepository.findById(itemReq.getProductId()).orElse(null));
                }
                if (itemReq.getStaffId() != null) {
                    item.setStaff(staffRepository.findById(itemReq.getStaffId()).orElse(null));
                }

                BigDecimal total = itemReq.getUnitPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
                item.setTotalPrice(total);
                totalAmount = totalAmount.add(total);

                billItemRepository.save(item);
            }

            bill.setTotalAmount(totalAmount);
            bill.setFinalTotal(totalAmount);
            billRepository.save(bill);

            return getBillId(bill.getId());
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tạo hóa đơn: " + e.getMessage(), e);
        }
    }
}