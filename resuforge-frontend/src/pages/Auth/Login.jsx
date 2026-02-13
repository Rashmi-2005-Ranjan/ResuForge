import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LogIn, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setNeedsVerification(false);
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
      if (msg.toLowerCase().includes("verify your email")) {
        setNeedsVerification(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESEND_VERIFICATION, { email });
      setError(null);
      alert("Verification email resent. Please check your inbox.");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to resend verification email. Please try again.";
      setError(msg);
    }
  };

  return (
      <div className="w-[90vw] md:w-[450px] p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
          <p className="text-sm text-slate-400">
            Please enter your details to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  placeholder="john@example.com"
                  type="text"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-500" />
              </div>
              <input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  placeholder="Min 8 characters"
                  type="password"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
          )}

          {/* Resend Verification */}
          {needsVerification && (
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-blue-300 mb-1">Email verification required</p>
                  <button
                      type="button"
                      className="text-sm text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
                      onClick={handleResendVerification}
                  >
                    Resend verification email
                  </button>
                </div>
              </div>
          )}

          {/* Submit Button */}
          <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>PLEASE WAIT...</span>
                </>
            ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                  type="button"
                  className="font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all"
                  onClick={() => setCurrentPage("signup")}
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
  );
};

export default Login;