package in.resuforge.api.Util;

public class AppConstants {
    public static final String AUTH_CONTROLLER = "/api/auth";
    public static final String REGISTER_ENDPOINT = "/register";
    public static final String LOGIN_ENDPOINT = "/login";
    public static final String VERIFY_EMAIL_ENDPOINT = "/verify-email";
    public static final String UPLOAD_IMAGE_ENDPOINT = "/upload-image";
    public static final String RESEND_VERIFICATION_ENDPOINT = "/resend-verification";
    public static final String GET_CURRENT_LOGGED_IN_USER_PROFILE = "/profile";
    public static final String RESUME_CONTROLLER = "/api/resumes";
    public static final String CREATE_RESUME = "/create";
    public static final String GET_CURRENT_LOGGED_IN_USER_RESUMES = "/get-user-resumes";
    public static final String GET_RESUME_BY_RESUME_ID = "/{resumeId}";
    public static final String UPDATE_RESUME = "/update-resume/{resumeId}";
    public static final String UPLOAD_RESUME_IMAGES = "/upload-resume-images/{resumeId}";
    public static final String DELETE_RESUME = "/delete-resume/{resumeId}";
    public static final String TEMPLATES_CONTROLLER = "/api/templates";
    public static final String GET_TEMPLATES = "/get-templates";
    public static final String PREMIUM = "premium";
    public static final String PAYMENT_CONTROLLER = "/api/payments";
    public static final String CREATE_RAZORPAY_ORDER = "/create-order";
    public static final String VERIFY_RAZORPAY_PAYMENT = "/verify";
    public static final String GET_RAZORPAY_PAYMENT_HISTORY = "/history";
    public static final String GET_RAZORPAY_ORDER_DETAILS = "/order/{orderId}";
    public static final String EMAIL_CONTROLLER = "/api/email";
    public static final String SEND_RESUME_WITH_EMAIL = "/send-resume";
}