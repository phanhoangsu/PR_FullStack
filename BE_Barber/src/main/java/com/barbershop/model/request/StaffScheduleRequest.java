    package com.barbershop.model.request;

    import com.fasterxml.jackson.annotation.JsonFormat;
    import jakarta.validation.constraints.*;
    import lombok.Data;

    import java.sql.Timestamp;
    @Data
    public class StaffScheduleRequest {
//        @NotNull(message = "Staff ID không được để trống")
        private Integer staff;

//        @NotNull(message = "Thời gian bắt đầu không được để trống")
//        @Future(message = "Thời gian bắt đầu phải ở tương lai")
//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss",timezone = "UTC")
        private Timestamp startTime;


//        @NotNull(message = "Thời gian kết thúc không được để trống")
//        @Future(message = "Thời gian kết thúc phải ở tương lai")
//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss",timezone = "UTC")
        private Timestamp endTime;

    //    // Kiểm tra startTime < endTime
    //    @AssertTrue(message = "Thời gian bắt đầu phải trước thời gian kết thúc")
    //    private boolean isValidTimeRange() {
    //        return startTime != null && endTime != null && startTime.before(endTime);
    //    }
    }
