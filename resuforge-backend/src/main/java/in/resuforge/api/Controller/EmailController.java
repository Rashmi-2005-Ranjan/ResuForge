package in.resuforge.api.Controller;

import in.resuforge.api.Service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static in.resuforge.api.Utils.AppConstants.EMAIL_CONTROLLER;
import static in.resuforge.api.Utils.AppConstants.SEND_RESUME_WITH_EMAIL;

@RestController
@RequiredArgsConstructor
@RequestMapping(EMAIL_CONTROLLER)
@Slf4j
public class EmailController {
    private final EmailService emailService;

    @PostMapping(value = SEND_RESUME_WITH_EMAIL, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> sendResumeByEmail(@RequestPart("recipientEmail") String recipientEmail , @RequestPart("subject") String subject , @RequestPart("message") String message , @RequestPart("pdfFile") MultipartFile pdfFile , Authentication authentication) throws IOException {
        //Step 1: Validate the inputs
        Map<String, Object> response = new HashMap<> ( );
        if (Objects.isNull ( recipientEmail ) || Objects.isNull ( pdfFile )) {
            response.put ( "success" , false );
            response.put ( "message" , "Missing required fields" );
            return ResponseEntity.badRequest ( ).body ( response );
        }
        //Step 2: Get the file data
        byte[] pdfBytes = pdfFile.getBytes ( );
        String originalFilename = pdfFile.getOriginalFilename ( );
        String defaultFileName = Objects.nonNull ( originalFilename ) ? originalFilename : "resume.pdf";
        //Step 3: Prepare the email content
        String emailSubject = Objects.nonNull ( subject ) ? subject : "Job Application Form";
        String emailBody = Objects.nonNull ( message ) ? message : "Please find my attached resume";
        //Step 4: Call the service method to send email
        emailService.sendEmailWithAttachment ( recipientEmail , emailSubject , pdfBytes , defaultFileName );
        //Step 5: Return Response
        response.put ( "success" , true );
        response.put ( "message" , "Resume send successfully to " + recipientEmail );
        return ResponseEntity.ok ( response );
    }
}
