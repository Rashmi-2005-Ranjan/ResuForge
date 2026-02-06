package in.resuforge.api.Controller;

import in.resuforge.api.DTO.CreateResumeRequest;
import in.resuforge.api.Document.Resume;
import in.resuforge.api.Service.FileUploadService;
import in.resuforge.api.Service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static in.resuforge.api.Utils.AppConstants.*;

@RestController
@RequestMapping(RESUME_CONTROLLER)
@Slf4j
@RequiredArgsConstructor
public class ResumeController {
    private final ResumeService resumeService;
    private final FileUploadService fileUploadService;

    @PostMapping(CREATE_RESUME)
    public ResponseEntity<?> createResume(@RequestBody CreateResumeRequest request , Authentication authentication) {
        //Step 1: Call the service method
        Resume newResume = resumeService.createResume ( request , authentication.getPrincipal ( ) );
        //Step 2: Return the response entity
        return ResponseEntity.status ( HttpStatus.CREATED ).body ( newResume );
    }

    @GetMapping(GET_CURRENT_LOGGED_IN_USER_RESUMES)
    public ResponseEntity<?> getUserResumes(Authentication authentication) {
        //Step 1: Call the service method
        List<Resume> resumes = resumeService.getUserResumes ( authentication.getPrincipal ( ) );
        //Step 2: Return the response entity
        return ResponseEntity.ok ( resumes );
    }

    @GetMapping(GET_RESUME_BY_RESUME_ID)
    public ResponseEntity<?> getResumeById(@PathVariable String resumeId , Authentication authentication) {
        //Step 1: Call the service method
        Resume resume = resumeService.getResumesById ( resumeId , authentication.getPrincipal ( ) );
        //Step 2: Return the response entity
        return ResponseEntity.ok ( resume );
    }

    @PutMapping(UPDATE_RESUME)
    public ResponseEntity<?> updateResume(@PathVariable String resumeId , @RequestBody Resume updatedData , Authentication authentication) {
        //Step 1: Call the service method
        Resume updatedResume = resumeService.updateResume ( resumeId , updatedData , authentication.getPrincipal ( ) );
        //Step 2: Return the response entity
        return ResponseEntity.ok ( updatedResume );
    }

    @PutMapping(UPLOAD_RESUME_IMAGES)
    public ResponseEntity<?> uploadResumeImages(@PathVariable String resumeId ,
                                                @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail ,
                                                @RequestPart(value = "profileImage", required = false) MultipartFile profileImage ,
                                                Authentication authentication) throws IOException {
        //Step 1: Call the service method to handle file upload and update resume with image URLs
        Map<String, String> response = fileUploadService.uploadResumeImages ( resumeId , authentication.getPrincipal ( ) , thumbnail , profileImage );
        //Step 2: Return the response entity with updated resume data
        return ResponseEntity.ok ( response );
    }

    @DeleteMapping(DELETE_RESUME)
    public ResponseEntity<?> deleteResume(@PathVariable String resumeId , Authentication authentication) {
        //Step 1: Call the service method to delete the resume
        resumeService.deleteResume ( resumeId , authentication.getPrincipal ( ) );
        //Step 2: Return a success response
        return ResponseEntity.ok ( Map.of ( "message" , "Resume deleted successfully" ) );
    }
}
