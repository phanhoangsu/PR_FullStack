package com.barbershop.service;

import com.barbershop.model.request.ComboRequest;
import com.barbershop.model.response.ComboDetailResponse;

import java.util.List;

public interface ComboService {
    String createCombo(ComboRequest request);
//    String updateCombo(Integer id, ComboRequest request);
    void softDeleteCombo(Integer id);
    ComboDetailResponse getComboDetails(Integer id);
    List<ComboDetailResponse> getAllActiveCombos();
    ComboDetailResponse updateCombo(Integer id, ComboRequest request);
    List<ComboDetailResponse> getAllCombos(); // <-- mới

}
