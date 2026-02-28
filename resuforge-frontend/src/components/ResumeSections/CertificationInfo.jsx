import React from "react";

const CertificationInfo = ({title, issuer, year, bgColor}) => {
    return (
        <div className="group">
            <h3 className="text-[15px] font-semibold text-black transition-colors duration-200">
                {title}
            </h3>

            <div className="flex items-center gap-2 mt-1">
                {year && (
                    <div
                        className="text-[11px] font-bold px-3 py-0.5 rounded-lg shadow-sm"
                        style={{backgroundColor: bgColor}}
                    >
                        {year}
                    </div>
                )}

                <p className="text-[12px] text-slate-950 font-medium">
                    {issuer}
                </p>
            </div>
        </div>
    );
};

export default CertificationInfo;