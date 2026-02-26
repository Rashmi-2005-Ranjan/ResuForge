import React from "react";

const EducationInfo = ({degree, institution, duration}) => {
    return (
        <div className="mb-5 group">
            <h3 className="text-[15px] font-semibold text-black transition-colors duration-200">
                {degree}
            </h3>
            <p className="text-sm text-slate-950 font-medium mt-0.5">
                {institution}
            </p>
            <p className="text-xs text-slate-950 font-medium italic mt-1">
                {duration}
            </p>
        </div>
    );
};

export default EducationInfo;