package com.barbershop.api;


import com.barbershop.model.request.BillCreateRequest;
import com.barbershop.model.response.BillResponse;
import com.barbershop.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BillApi {
    private final BillService billService;
    @GetMapping("/{id}")
    public ResponseEntity<BillResponse> getBillById(@PathVariable Integer id) {
        BillResponse result = billService.getBillId(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<BillResponse> createBill(@RequestBody BillCreateRequest request) {
        return ResponseEntity.ok(billService.createBill(request));
    }
}
