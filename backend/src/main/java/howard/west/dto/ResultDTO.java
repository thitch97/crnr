package howard.west.dto;

import lombok.Builder;
import lombok.Data;

/**
 * DTO's make json serialization easier
 * @Data generates getters and setters to reduce java boilerplate
 */
@Data
@Builder
public class ResultDTO
{
<<<<<<< HEAD
  private String title
=======
  private String title;
  private String url;

>>>>>>> 7fe01aa6fd9f32e64cdbda237303ea3827abbb90
}
