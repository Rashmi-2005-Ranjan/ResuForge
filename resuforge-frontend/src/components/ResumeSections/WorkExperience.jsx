const WorkExperience = ({
                            company,
                            role,
                            duration,
                            durationColor,
                            description,
                        }) => {
    return (
        <div className="mb-5 group">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-black transition-colors duration-200">
                        {company}
                    </h3>
                    <p className="text-[12px] text-slate-950 font-medium mt-0.5">
                        {role}
                    </p>
                </div>

                <p
                    className="text-xs font-bold italic flex-shrink-0"
                    style={{color: durationColor}}
                >
                    {duration}
                </p>
            </div>

            <p className="text-[11px] text-slate-950 font-medium italic mt-2 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default WorkExperience;