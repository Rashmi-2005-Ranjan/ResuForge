package in.resuforge.api.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendHtmlEmail(String toEmail , String subject , String htmlContent) throws MessagingException {
        log.info ( "Inside EmailService: sendHtmlEmail() to {}" , toEmail );
        MimeMessage message = mailSender.createMimeMessage ( );
        MimeMessageHelper helper = new MimeMessageHelper ( message , true , "UTF-8" );

        helper.setFrom ( fromEmail );
        helper.setTo ( toEmail );
        helper.setSubject ( subject );
        helper.setText ( htmlContent , true );

        mailSender.send ( message );
        log.info ( "HTML Email sent to {}" , toEmail );
    }

    public void sendVerificationEmail(String toEmail , String name , String verificationLink) throws MessagingException {
        log.info ( "Inside Email Service: sendVerificationEmail() {}" , toEmail );
        Context context = new Context ( );
        context.setVariable ( "userName" , name );
        context.setVariable ( "verificationLink" , verificationLink );
        context.setVariable ( "subject" , "Verify Your ResuForge Account" );
        context.setVariable ( "body" , "Thank you for registering with ResuForge. Please verify your email to activate your account." );

        String htmlContent = templateEngine.process ( "sendVerificationEmail" , context );
        sendHtmlEmail ( toEmail , "ResuForge | Email Verification" , htmlContent );

        log.info ( "Verification email sent to {}" , toEmail );
    }


    public void sendEmailWithAttachment(
            String to ,
            String subject ,
            byte[] attachment ,
            String fileName ,
            String replyToEmail
    ) {
        try {
            log.info ( "Inside EmailService: sendEmailWithAttachment() to {}" , to );
            // Thymeleaf context for recruiter email
            Context context = new Context ( );
            context.setVariable ( "subject" , subject );
            context.setVariable (
                    "message" ,
                    "Please find the attached resume for your review."
            );
            context.setVariable ( "fileName" , fileName );

            // Generate HTML from template
            String htmlContent =
                    templateEngine.process ( "recruiterResumeEmail" , context );

            // Create email with attachment
            MimeMessage message = mailSender.createMimeMessage ( );
            MimeMessageHelper helper =
                    new MimeMessageHelper ( message , true , "UTF-8" );

            helper.setFrom ( fromEmail );
            helper.setReplyTo ( replyToEmail );
            helper.setTo ( to );
            helper.setSubject ( subject );
            helper.setText ( htmlContent , true );

            helper.addAttachment ( fileName , new ByteArrayResource ( attachment ) );

            mailSender.send ( message );

            log.info ( "Recruiter email with resume sent to {}" , to );

        } catch (MessagingException e) {
            log.error ( "Failed to send recruiter email to {}" , to , e );
            throw new RuntimeException ( "Failed to send recruiter email" , e );
        }
    }
}