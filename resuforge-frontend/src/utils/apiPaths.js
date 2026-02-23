export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    PROFILE: "/api/auth/profile",
    UPLOAD_IMAGE: "/api/auth/upload-image",
    TEMPLATES: "/api/templates/get-templates",
    RESEND_VERIFICATION: "/api/auth/resend-verification",
    VERIFY_EMAIL: "/api/auth/verify-email",
  },
  RESUME: {
    CREATE: "/api/resumes/create",
    GET_ALL: "/api/resumes/get-user-resumes",
    GET_BY_ID: (id) => `/api/resumes/${id}`,
    UPDATE: (id) => `/api/resumes/update-resume/${id}`,
    DELETE: (id) => `/api/resumes/delete-resume/${id}`,
    UPLOAD_IMAGES: (resumeId) => `/api/resumes/upload-resume-images/${resumeId}`,
  },
  PAYMENT: {
    CREATE_ORDER: "/api/payments/create-order",
    VERIFY: "/api/payments/verify",
    HISTORY: "/api/payments/history",
    ORDER_DETAILS: (orderId) => `/api/payments/order/${orderId}`,
  },
  EMAIL: {
    SEND_RESUME: "/api/email/send-resume",
  },
};
