import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";
import {UserContext} from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import {UserPlus, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Send, Eye, EyeOff} from "lucide-react";
import toast from "react-hot-toast";

const SignUp = ({setCurrentPage}) => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);
    const [info, setInfo] = useState("");
    const [verificationSent, setVerificationSent] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter full name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        setInfo("");
        setIsSubmitting(true);

        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
            }, {timeout: 30000});

            setVerificationSent(true);
            setRegisteredEmail(email);
            setInfo("We've sent a verification link to your email. Please verify to log in.");
            toast.success("Registered successfully! Please check your email for verification.");
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
            toast.error("Registration failed. Please check your details and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendVerification = async () => {
        setError("");
        setInfo("");
        try {
            await axiosInstance.post(API_PATHS.AUTH.RESEND_VERIFICATION, {email: registeredEmail || email});
            setInfo("Verification email resent. Please check your inbox.");
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to resend verification email. Please try again.");
            }
        }
    };

    return (
        <div
            className="w-[90vw] md:w-[450px] p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700/50 shadow-2xl">
            {!verificationSent ? (
                <>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                            <UserPlus className="w-7 h-7 text-white"/>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Create an Account</h3>
                        <p className="text-sm text-slate-400">Join us today by entering your details below</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-5">
                        {/* Profile Photo Selector */}
                        <div className="flex justify-center">
                            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                        </div>

                        {/* Full Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-slate-500"/>
                                </div>
                                <input
                                    value={fullName}
                                    onChange={({target}) => setFullName(target.value)}
                                    placeholder="John Doe"
                                    type="text"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-slate-500"/>
                                </div>
                                <input
                                    value={email}
                                    onChange={({target}) => setEmail(target.value)}
                                    placeholder="john@example.com"
                                    type="text"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-slate-500"/>
                                </div>
                                <input
                                    value={password}
                                    onChange={({target}) => setPassword(target.value)}
                                    placeholder="Min 8 characters"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword
                                        ? <EyeOff className="w-5 h-5"/>
                                        : <Eye className="w-5 h-5"/>
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div
                                className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"/>
                                <p className="text-sm text-red-300">{error}</p>
                            </div>
                        )}

                        {/* Info Message */}
                        {info && (
                            <div
                                className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"/>
                                <p className="text-sm text-green-300">{info}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <div
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                    <span>PLEASE WAIT...</span>
                                </>
                            ) : (
                                <>
                                    <span>SIGN UP</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t border-slate-800">
                            <p className="text-sm text-slate-400">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="font-semibold cursor-pointer text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all"
                                    onClick={() => setCurrentPage("login")}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    {/* Verification Sent View */}
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
                            <Send className="w-7 h-7 text-white"/>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Check Your Email</h3>
                        <p className="text-sm text-slate-400">We've sent a verification link to</p>
                        <p className="text-sm font-medium text-purple-400 mt-1">{registeredEmail}</p>
                    </div>

                    <div className="space-y-4">
                        {(info || true) && (
                            <div
                                className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"/>
                                <p className="text-sm text-purple-300">
                                    {info || "We've sent a verification link to your email. Please verify to log in."}
                                </p>
                            </div>
                        )}

                        {error && (
                            <div
                                className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"/>
                                <p className="text-sm text-red-300">{error}</p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleResendVerification}
                            className="w-full cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Mail className="w-5 h-5"/>
                            <span>Resend Verification Email</span>
                        </button>

                        <div className="text-center pt-4 border-t border-slate-800">
                            <p className="text-sm text-slate-400">
                                Back to{" "}
                                <button
                                    type="button"
                                    className="font-semibold cursor-pointer text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all"
                                    onClick={() => setCurrentPage("login")}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignUp;