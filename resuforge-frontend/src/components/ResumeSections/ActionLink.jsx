import React from 'react';

const ActionLink = ({icon, link, bgColor}) => {
    return (
        <div className="flex items-center gap-3 group">
            <div
                className="w-[25px] h-[25px] flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{backgroundColor: bgColor}}
            >
                {icon}
            </div>

            <p className="text-[13px] font-medium underline cursor-pointer break-all text-gray-950 transition-colors duration-200">
                {link}
            </p>
        </div>
    );
};

export default ActionLink;