# 📝 ResuForge – Smart Resume Builder Platform

ResuForge is a full-stack, production-ready **resume builder web application** designed to help users create **ATS-friendly, professional resumes** with ease.  
It supports modern resume templates, PDF generation, cloud-based image storage, secure authentication, and direct resume sharing with recruiters via email.

The platform is built using a **React + Tailwind frontend** and a **Spring Boot + MongoDB backend**, ensuring scalability, security, and performance.

---

## ✨ Key Highlights

- Modern UI with responsive design
- ATS-optimized resume templates
- PDF generation with pixel-perfect layouts
- Secure authentication & authorization
- One-time premium subscription model
- Cloud-based image management
- Direct recruiter email integration

---

## 🚀 Features

### Resume Management
- Create resumes with structured sections
- Update existing resumes in real time
- Delete resumes securely
- Store multiple resumes per user

### Templates & Customization
- Multiple professionally designed templates
- Separate **Basic** and **Premium** templates
- Tailwind-powered styling for consistency
- Optimized layouts for ATS parsing

### PDF & Printing
- Download resumes as high-quality PDFs
- Browser-based PDF rendering
- Print-ready resume formats

### Image Upload
- Upload profile images
- Cloud-based storage using Cloudinary
- Optimized image delivery

### Email Integration
- Send resumes directly to recruiters from the app
- Java Mail Sender integration
- PDF attached automatically

### Subscription & Payments
- One-time premium subscription (₹999)
- Razorpay payment gateway integration
- Access control based on subscription status

### Security
- JWT-based authentication
- Role-based access control
- Secure REST APIs with Spring Security

---

## 🛠️ Technology Stack

### Frontend (Client-Side)

The frontend is built with **React 19**, ensuring high performance and a modern component-based architecture.

**Core Technologies**
- React 19
- React DOM
- React Router DOM (v7)
- Vite (for fast builds)
- Tailwind CSS (utility-first styling)

**UI & UX**
- Lucide React Icons
- React Icons
- React Hot Toast for notifications

**PDF & Resume Rendering**
- jsPDF – PDF generation
- html2canvas – DOM to canvas conversion
- html-to-image – high-quality image rendering
- react-to-print – print support

**Utilities**
- Axios – API communication
- Moment.js – date handling

---

### Backend (Server-Side)

The backend is a **Spring Boot 4** application built with enterprise-level architecture and best practices.

**Core Technologies**
- Java 17
- Spring Boot
- Spring MVC (REST APIs)
- Spring Validation

**Database**
- MongoDB (NoSQL, document-based)
- Spring Data MongoDB for persistence

**Security**
- Spring Security
- JWT (JSON Web Token) authentication
- Secure API access control

**Email**
- Spring Boot Mail
- Java Mail Sender for recruiter emails

**Template Engine**
- Thymeleaf (for server-rendered views & emails)

**Cloud & External Services**
- Cloudinary – image storage & CDN
- Razorpay – payment processing

**Monitoring**
- Spring Boot Actuator for health checks and metrics

---

## 🗂️ System Architecture


Frontend (React + Tailwind)
|
| REST APIs (Axios)
|
Backend (Spring Boot)
|
| JWT Security
|
MongoDB (Persistent Storage)
|
Cloudinary (Images) & Razorpay (Payments)


---

## 💳 Subscription Model

| Plan    | Price             | Access |
|--------|-------------------|--------|
| Basic  | Free              | Limited resume templates |
| Premium| ₹999 (One-Time)   | All templates, email sharing, premium layouts |

---

## 📤 Resume Sharing Flow

1. User creates a resume
2. Resume is rendered using HTML + Tailwind
3. Converted to PDF using jsPDF & html2canvas
4. PDF is either:
   - Downloaded locally  
   - OR emailed directly to recruiters

---

## 🔐 Authentication Flow

- User logs in
- JWT token generated on backend
- Token stored on client
- Secured APIs accessed using Authorization headers
- Role & subscription checks enforced

---

## ⚙️ Installation & Setup

### Project Setup
```bash
git clone https://github.com/Rashmi-2005-Ranjan/ResuForge
cd ResuForge-backend
mvn clean install
mvn spring-boot:run

--- Frontend Setup ---
git clone https://github.com/Rashmi-2005-Ranjan/ResuForge
cd ResuForge-frontend
npm install
npm run dev
```
Happy Coding 🚀
