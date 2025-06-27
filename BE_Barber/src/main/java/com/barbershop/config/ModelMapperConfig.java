package com.barbershop.config;

import com.barbershop.domain.StaffSchedule;
import com.barbershop.model.request.StaffScheduleRequest;
import com.barbershop.model.response.StaffScheduleResponse;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        // Map entity -> response (Staff -> staffId)
        mapper.typeMap(StaffSchedule.class, StaffScheduleResponse.class)
                .addMapping(src -> src.getStaff().getId(), StaffScheduleResponse::setStaffId);

        // Bỏ qua Staff khi mapping từ request -> entity
        mapper.typeMap(StaffScheduleRequest.class, StaffSchedule.class)
                .addMappings(map -> map.skip(StaffSchedule::setStaff));

        return mapper;
    }

}
