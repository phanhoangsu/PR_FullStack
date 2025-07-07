package com.barbershop.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.sql.Timestamp;
import java.util.List;

@Data
public class StaffScheduleResponse {
    private Integer id;
    private Integer staffId;

    private String staffName;
    private String staffAvatar;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss",timezone = "UTC")
    private Timestamp startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss",timezone = "UTC")
    private Timestamp endTime;


    private List<AppointmentSimpleResponse> appointments;  // Thêm trường này

    @Data
    public static class AppointmentSimpleResponse {
        private Integer id;
        private String status;
        private String note;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "UTC")
        private Timestamp startTime;
    }
}
