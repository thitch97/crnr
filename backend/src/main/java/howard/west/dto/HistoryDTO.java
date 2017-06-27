package howard.west.dto;

import lombok.Builder;
import lombok.Data;

/**
 * DTO's make json serialization easier
 * @Data generates getters and setters to reduce java boilerplate
 */
@Data
@Builder

public class HistoryDTO
{

    private String title;
    private String url;
    private String day;
    private String month;
    private String year;

}