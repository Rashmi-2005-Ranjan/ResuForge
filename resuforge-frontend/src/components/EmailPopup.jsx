import {useState} from "react";
import {Mail, Send, X, AtSign, MessageSquare, FileText} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import {API_PATHS} from "../utils/apiPaths";
import {generatePDFBlob} from "../utils/pdfGenerator";

const EmailPopup = ({isOpen, onClose, resumeId, resumeTitle, resumePreviewRef}) => {
    const [emailData, setEmailData] = useState({
        recipientEmail: "",
        subject: `Resume - ${resumeTitle}`,
        message: "Please find my resume attached.\n\nBest regards"
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setEmailData(prev => ({...prev, [field]: value}));
    };

    const handleSendEmail = async () => {
        if (!emailData.recipientEmail.trim()) {
            toast.error("Please enter recipient email address");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(emailData.recipientEmail)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!resumePreviewRef?.current) {
            toast.error("Resume preview not found. Please try again.");
            return;
        }

        try {
            setIsLoading(true);
            toast.loading("Generating PDF and sending email...", {id: "email-send"});

            const pdfBlob = await generatePDFBlob(resumePreviewRef.current, {quality: 0.8, scale: 1.6});

            const sizeMB = (pdfBlob.size / (1024 * 1024)).toFixed(2);
            if (pdfBlob.size > 18 * 1024 * 1024) {
                toast.error(`Generated PDF is too large (${sizeMB} MB). Try reducing content or switching template/colors.`, {id: "email-send"});
                setIsLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('recipientEmail', emailData.recipientEmail);
            formData.append('subject', emailData.subject);
            formData.append('message', emailData.message.replace(/\n/g, '<br>'));
            formData.append('pdfFile', pdfBlob, `${resumeTitle || 'resume'}.pdf`);

            const response = await axiosInstance.post(API_PATHS.EMAIL.SEND_RESUME, formData,{
                timeout: 60000, // 30 seconds timeout for PDF generation and email sending
            });


            if (response.data.success) {
                toast.success("Resume sent successfully!", {id: "email-send"});
                onClose();
                setEmailData({
                    recipientEmail: "",
                    subject: `Resume - ${resumeTitle}`,
                    message: "Please find my resume attached.\n\nBest regards"
                });
            } else {
                console.error('Email send failed:', response.data);
                toast.error(response.data.message || "Failed to send email", {id: "email-send"});
            }
        } catch (error) {
            console.error("Email send error:", error);
            if (error.message.includes('PDF')) {
                toast.error("Failed to generate PDF. Please try again.", {id: "email-send"});
            } else {
                toast.error(
                    error.response?.data?.message || "Failed to send email. Please try again.",
                    {id: "email-send"}
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
            style={{background: "rgba(2, 6, 23, 0.75)"}}
            onClick={onClose}
        >
            {/* Backdrop blur layer */}
            <div className="absolute inset-0 backdrop-blur-sm"/>

            {/* Modal */}
            <div
                className="relative w-full max-w-md rounded-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(23,16,50,0.97) 100%)",
                    boxShadow: "0 0 0 1px rgba(139,92,246,0.15), 0 25px 60px rgba(0,0,0,0.6), 0 0 80px rgba(99,51,220,0.1)",
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Top gradient bar */}
                <div className="h-[2px] w-full"
                     style={{background: "linear-gradient(90deg, #7c3aed, #4f46e5, #06b6d4)"}}/>

                {/* Decorative orb */}
                <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                    style={{background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)"}}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{background: "linear-gradient(135deg, #7c3aed, #4f46e5)"}}
                        >
                            <Mail className="w-4 h-4 text-white"/>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-white tracking-tight">Send Resume</h3>
                            <p className="text-xs text-slate-400 mt-0.5">via Email as PDF</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    >
                        <X className="w-4 h-4"/>
                    </button>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px"
                     style={{background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)"}}/>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    {/* Recipient Email */}
                    <div className="space-y-1.5">
                        <label
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <AtSign className="w-3 h-3"/>
                            Recipient Email <span className="text-violet-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={emailData.recipientEmail}
                                onChange={e => handleInputChange("recipientEmail", e.target.value)}
                                placeholder="recipient@example.com"
                                disabled={isLoading}
                                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                        <label
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <FileText className="w-3 h-3"/>
                            Subject
                        </label>
                        <input
                            type="text"
                            value={emailData.subject}
                            onChange={e => handleInputChange("subject", e.target.value)}
                            placeholder="Email subject"
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 disabled:opacity-50"
                        />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                        <label
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <MessageSquare className="w-3 h-3"/>
                            Message
                        </label>
                        <textarea
                            value={emailData.message}
                            onChange={e => handleInputChange("message", e.target.value)}
                            placeholder="Enter your message..."
                            rows={4}
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 resize-none disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSendEmail}
                        disabled={isLoading}
                        className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                        style={{background: "linear-gradient(135deg, #7c3aed, #4f46e5)"}}
                    >
                        {/* Hover shine */}
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{background: "linear-gradient(135deg, #6d28d9, #4338ca)"}}/>
                        <Send className="w-4 h-4 relative z-10"/>
                        <span className="relative z-10">{isLoading ? "Sending..." : "Send Email"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailPopup;