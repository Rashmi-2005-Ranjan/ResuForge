import React from 'react';

const StepProgress = ({progress}) => {
    return (
        <div className="w-full bg-slate-800/50 h-1 overflow-hidden rounded-full">
            <div
                className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full shadow-lg shadow-purple-500/50"
                style={{width: `${progress}%`}}
            ></div>
        </div>
    );
};

export default StepProgress;