package in.resuforge.api.Service;

import in.resuforge.api.DTO.AuthResponse;
import in.resuforge.api.DTO.LoginRequest;
import in.resuforge.api.DTO.RegisterRequest;
import in.resuforge.api.Document.User;
import in.resuforge.api.Exception.ResourceExistsException;
import in.resuforge.api.Repository.UserRepository;
import in.resuforge.api.Utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    @Value("${app.base.url:http://localhost:8080}")
    private String appURL;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;

    public AuthResponse registerUser(RegisterRequest registerRequest) {
        log.info ( "Inside AuthService: register() {}" , registerRequest );
        if (userRepository.existsByEmail ( registerRequest.getEmail ( ) )) {
            throw new ResourceExistsException ( "User Already Exists With This Email" );
        }
        User newUser = toDocument ( registerRequest );
        userRepository.save ( newUser );
        sendVerificationEmail ( newUser );
        return toResponse ( newUser );
    }

    private void sendVerificationEmail(User newUser) {
        log.info ( "Inside AuthService: sendVerificationEmail() {}" , newUser );
        try {
            String link = appURL + "/api/auth/verify-email?token=" + newUser.getVerificationToken ( );
            emailService.sendVerificationEmail ( newUser.getEmail ( ) , newUser.getName ( ) , link );
        } catch (Exception e) {
            log.error ( "Exception occurred at sendVerificationEmail(): {}" , e.getMessage ( ) );
            throw new RuntimeException ( "Failed to send verification email --> " + e.getMessage ( ) );
        }
    }

    private AuthResponse toResponse(User newUser) {
        return AuthResponse.builder ( )
                .id ( newUser.getId ( ) )
                .name ( newUser.getName ( ) )
                .email ( newUser.getEmail ( ) )
                .profileImageUrl ( newUser.getProfileImageUrl ( ) )
                .subscriptionPlan ( newUser.getSubscriptionPlan ( ) )
                .emailVerified ( newUser.getEmailVerified ( ) )
                .createdAt ( newUser.getCreatedAt ( ) )
                .updatedAt ( newUser.getUpdatedAt ( ) )
                .build ( );
    }

    private User toDocument(RegisterRequest registerRequest) {
        return User.builder ( )
                .name ( registerRequest.getName ( ) )
                .email ( registerRequest.getEmail ( ) )
                .password ( passwordEncoder.encode ( registerRequest.getPassword ( ) ) )
                .profileImageUrl ( registerRequest.getProfileImageUrl ( ) )
                .subscriptionPlan ( "basic" )
                .emailVerified ( false )
                .verificationToken ( UUID.randomUUID ( ).toString ( ) )
                .verificationExpires ( LocalDateTime.now ( ).plusHours ( 24 ) )
                .build ( );
    }

    public void verifyEmail(String token) {
        log.info ( "Inside AuthService: verifyEmail() {}" , token );
        User user = userRepository.findByVerificationToken ( token )
                .orElseThrow ( () -> new RuntimeException ( "Invalid verification token" ) );
        if (user.getVerificationExpires ( ) != null && user.getVerificationExpires ( ).isBefore ( LocalDateTime.now ( ) )) {
            throw new RuntimeException ( "Verification token expired please request for new one" );
        }
        user.setEmailVerified ( true );
        user.setVerificationToken ( null );
        user.setVerificationExpires ( null );
        userRepository.save ( user );
    }

    public AuthResponse login(LoginRequest request) {
        log.info ( "Inside AuthService: login() {}" , request );
        String email = request.getEmail ( );
        String password = request.getPassword ( );
        User existingUser = userRepository.findByEmail ( email )
                .orElseThrow ( () -> new RuntimeException ( "Invalid email or password" ) );
        log.info ( "User Found: {}" , existingUser );
        if (!passwordEncoder.matches ( password , existingUser.getPassword ( ) )) {
            throw new UsernameNotFoundException ( "Invalid password" );
        }
        if (!existingUser.getEmailVerified ( )) {
            throw new RuntimeException ( "Email not verified. Please verify your email before logging in." );
        }
        String token = jwtUtils.generateToken ( existingUser.getId ( ) );
        AuthResponse response = toResponse ( existingUser );
        response.setToken ( token );
        return response;
    }

    public void resendVerificationEmail(String email) {
        log.info ( "Inside AuthService: resendVerificationEmail() {}" , email );
        //Step 1: Find user by email
        User existingUser = userRepository.findByEmail ( email )
                .orElseThrow ( () -> new RuntimeException ( "User not found with this email" ) );
        //Step 2: Check if email is already verified
        if (existingUser.getEmailVerified ( )) {
            throw new RuntimeException ( "Email is already verified" );
        }
        //Step 3: Generate new verification token and expiry
        existingUser.setVerificationToken ( UUID.randomUUID ( ).toString ( ) );
        existingUser.setVerificationExpires ( LocalDateTime.now ( ).plusHours ( 24 ) );
        userRepository.save ( existingUser );
        //Step 4: Resend verification email
        sendVerificationEmail ( existingUser );
    }

    public AuthResponse getProfile(Object principalObject) {
        User existingUser = (User) principalObject;
        return toResponse ( existingUser );
    }
}