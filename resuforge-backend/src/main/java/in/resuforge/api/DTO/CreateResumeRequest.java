package in.resuforge.api.DTO;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateResumeRequest {
    @NotBlank(message = "Title is mandatory")
    private String title;
}
