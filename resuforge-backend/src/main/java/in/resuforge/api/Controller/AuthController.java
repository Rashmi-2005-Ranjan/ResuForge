package in.resuforge.api.Controller;

import in.resuforge.api.DTO.AuthResponse;
import in.resuforge.api.DTO.LoginRequest;
import in.resuforge.api.DTO.RegisterRequest;
import in.resuforge.api.Document.User;
import in.resuforge.api.Service.AuthService;
import in.resuforge.api.Service.FileUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

import static in.resuforge.api.Utils.AppConstants.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(AUTH_CONTROLLER)
public class AuthController {
    private final AuthService authService;
    private final FileUploadService fileUploadService;

    @PostMapping(REGISTER_ENDPOINT)
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        log.info ( "Inside AuthController: register() {}" , request );
        AuthResponse response = authService.registerUser ( request );
        log.info ( "Response from Auth Request {}" , response );
        return ResponseEntity.status ( HttpStatus.CREATED ).body ( response );
    }

    @GetMapping(VERIFY_EMAIL_ENDPOINT)
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        log.info ( "Inside AuthController: verifyEmail() {}" , token );
        authService.verifyEmail ( token );
        return ResponseEntity.status ( HttpStatus.OK ).body ( Map.of ( "message" , "Email verified successfully" ) );
    }

    @PostMapping(UPLOAD_IMAGE_ENDPOINT)
    public ResponseEntity<?> uploadImage(@RequestPart("image") MultipartFile file) throws IOException {
        log.info ( "Inside AuthController: uploadImage() --- Image name: {}" , file.getOriginalFilename ( ) );
        Map<?, ?> response = fileUploadService.uploadSingleImage ( file );
        log.info ( "Response from Upload Image Request {}" , response );
        return ResponseEntity.ok ( response );
    }

    @PostMapping(LOGIN_ENDPOINT)
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        log.info ( "Inside AuthController: login() {}" , request );
        AuthResponse success = authService.login ( request );
        log.info ( "Response from Login Request {}" , success );
        return ResponseEntity.status ( HttpStatus.OK ).body ( success );
    }

    @PostMapping(RESEND_VERIFICATION_ENDPOINT)
    public ResponseEntity<?> resendVerificationEmail(@RequestBody Map<String, String> body) {
        log.info ( "Inside AuthController: resendVerificationEmail() {}" , body );
        //Step 1: Get email from request body
        String email = body.get ( "email" );
        //Step 2: Validate email presence
        if (Objects.isNull ( email )) {
            return ResponseEntity.status ( HttpStatus.BAD_REQUEST ).body ( Map.of ( "message" , "Verification email address is missing" ) );
        }
        //Step 3: Call AuthService to resend verification email
        authService.resendVerificationEmail ( email );
        //Step 4: Return success response
        return ResponseEntity.status ( HttpStatus.OK ).body ( Map.of ( "message" , "Verification email sent successfully" ) );
    }

    @GetMapping(GET_CURRENT_LOGGED_IN_USER_PROFILE)
    public ResponseEntity<?> getProfile(Authentication authentication) {
        //Step 1: Get the principal object
        Object principalObject = (User) authentication.getPrincipal ( );
        log.info ( "Inside AuthController: getProfile() {}" , authentication );
        //Step 2: Call AuthService to get user profile
        AuthResponse currentProfile = authService.getProfile ( principalObject );
        //Step 3: Return success response
        return ResponseEntity.status ( HttpStatus.OK ).body ( currentProfile );
    }
}