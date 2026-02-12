import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Crown, User } from "lucide-react";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    return (
        user && (
            <div className="flex items-center gap-3 group">
                {/* Profile Image */}
                <div className="relative">
                    <img
                        src={user.profileImageUrl}
                        alt={user.name || "User"}
                        className="w-11 h-11 rounded-full border-2 border-slate-700 group-hover:border-purple-500 transition-all duration-300 object-cover bg-slate-800"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><rect width="44" height="44" fill="%23475569"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20" font-family="system-ui">${user.name?.[0]?.toUpperCase() || 'U'}</text></svg>`;
                        }}
                    />
                    {user.subscriptionPlan === 'premium' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-slate-950">
                            <Crown className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="hidden md:block">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-semibold text-white leading-none">
                            {user.name || "User"}
                        </div>
                        {user.subscriptionPlan === 'premium' ? (
                            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                <span>Premium</span>
                            </div>
                        ) : (
                            <div className="bg-slate-700/50 border border-slate-600 text-slate-300 px-2 py-0.5 rounded-full text-xs font-medium">
                                Free
                            </div>
                        )}
                    </div>
                    <button
                        className="text-purple-400 hover:text-purple-300 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 group/logout"
                        onClick={handelLogout}
                    >
                        <LogOut className="w-3 h-3 group-hover/logout:translate-x-0.5 transition-transform" />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Mobile Logout Button */}
                <button
                    className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={handelLogout}
                    title="Logout"
                >
                    <LogOut className="w-5 h-5 text-slate-400 hover:text-purple-400 transition-colors" />
                </button>
            </div>
        )
    );
};

export default ProfileInfoCard;