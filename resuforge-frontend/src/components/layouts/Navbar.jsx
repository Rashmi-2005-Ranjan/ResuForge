import ProfileInfoCard from "../Cards/ProfileInfoCard";
import {Link} from "react-router-dom";
import {FileText} from "lucide-react";

const Navbar = () => {
    return (
        <div
            className="h-16 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50 py-2.5 px-4 md:px-0 top-0 z-40">
            <div className="container mx-auto flex items-center justify-between gap-5">
                <Link to='/dashboard'>
                    <h2 className="text-lg md:text-xl font-semibold leading-5 flex items-center gap-2 group">
                        <div
                            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-4 h-4 text-white"/>
                        </div>
                        <span
                            className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ResuForge
            </span>
                    </h2>
                </Link>

                <ProfileInfoCard/>
            </div>
        </div>
    );
};

export default Navbar;