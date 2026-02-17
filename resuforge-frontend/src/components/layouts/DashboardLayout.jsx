import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ activeMenu, children }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="relative z-10 container mx-auto pt-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;