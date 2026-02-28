import React from "react";

const ContactInfo = ({icon, iconBG, value}) => {
    return (
        <div className="flex items-center gap-3 group">
            <div
                className="w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 shadow-sm"
                style={{backgroundColor: iconBG}}
            >
                {icon}
            </div>

            <p className="flex-1 text-[12px] font-medium break-all text-slate-800  transition-colors duration-200">
                {value}
            </p>
        </div>
    );
};

export default ContactInfo;