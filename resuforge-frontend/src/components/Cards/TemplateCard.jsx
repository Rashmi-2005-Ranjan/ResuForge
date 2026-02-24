import React from "react";
import { Lock, Crown } from "lucide-react";

const TemplateCard = ({
                        thumbnailImg,
                        isSelected,
                        onSelect,
                        isLocked = false,
                        onLockedClick
                      }) => {
  const handleClick = () => {
    if (isLocked) {
      onLockedClick && onLockedClick();
    } else {
      onSelect();
    }
  };

  return (
      <div
          className={`group relative h-auto md:h-[300px] flex flex-col items-center justify-between rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
              isSelected
                  ? "border-2 border-purple-500 shadow-lg shadow-purple-500/30 scale-105"
                  : "border-2 border-slate-700/50 hover:border-purple-500/50 hover:scale-102"
          }`}
          onClick={handleClick}
      >
        {/* Template Image */}
        {thumbnailImg ? (
            <div className="relative w-full h-full bg-slate-900">
              <img
                  src={thumbnailImg}
                  alt="Resume Template"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                      isLocked ? "blur-sm opacity-40" : "group-hover:scale-105"
                  }`}
              />

              {/* Selected Indicator */}
              {isSelected && !isLocked && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
              )}
            </div>
        ) : (
            <div className="w-full h-full bg-slate-800"></div>
        )}

        {/* Lock Overlay */}
        {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-4 shadow-xl mb-3">
                <Crown className="text-white w-6 h-6" />
              </div>
              <div className="text-white text-sm font-bold bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                Premium Only
              </div>
            </div>
        )}

        {/* Hover Effect */}
        {!isLocked && (
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
  );
};

export default TemplateCard;