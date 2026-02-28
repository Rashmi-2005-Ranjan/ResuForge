import React from "react";
import Progress from "../Progress";

const LanguageInfo = ({language, progress, accentColor, bgColor}) => {
    return (
        <div className="flex items-center justify-between group">
            <p className="text-[12px] font-semibold text-slate-950 transition-colors duration-200">
                {language}
            </p>
            {progress > 0 && (
                <Progress
                    progress={(progress / 100) * 5}
                    color={accentColor}
                    bgColor={bgColor}
                />
            )}
        </div>
    );
};

const LanguageSection = ({languages, accentColor, bgColor}) => {
    return (
        <div className="flex flex-col gap-2">
            {languages?.map((language, index) => (
                <LanguageInfo
                    key={`slanguage_${index}`}
                    language={language.name}
                    progress={language.progress}
                    accentColor={accentColor}
                    bgColor={bgColor}
                />
            ))}
        </div>
    );
};

export default LanguageSection;