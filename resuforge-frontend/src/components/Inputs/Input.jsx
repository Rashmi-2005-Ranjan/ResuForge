import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ value, onChange, label, placeholder, type, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
                {label}
            </label>

            <div className="relative flex items-center">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500 pr-12"
                    value={value}
                    onChange={(e) => onChange(e)}
                    {...props}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-4 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                        {showPassword ? (
                            <Eye size={20} />
                        ) : (
                            <EyeOff size={20} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;