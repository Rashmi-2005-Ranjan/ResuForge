import {useState} from "react";
import {Check, Pencil} from "lucide-react";

const TitleInput = ({title, setTitle}) => {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className="flex items-center gap-3">
            {showInput ? (
                <>
                    <input
                        type="text"
                        placeholder="Resume title"
                        className="text-sm md:text-lg bg-transparent outline-none text-white font-semibold border-b-2 border-purple-500 pb-1 placeholder:text-slate-500"
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    />

                    <button
                        className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 cursor-pointer rounded-lg transition-all duration-200"
                        onClick={() => setShowInput((prevState) => !prevState)}
                    >
                        <Check className="w-4 h-4 text-white"/>
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-sm md:text-lg font-semibold text-white truncate max-w-md">
                        {title || "Untitled Resume"}
                    </h2>
                    <button
                        className="p-1.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-purple-500/50 rounded-lg transition-all duration-200 cursor-pointer"
                        onClick={() => setShowInput((prevState) => !prevState)}
                    >
                        <Pencil className="w-4 h-4 text-slate-400 hover:text-purple-400"/>
                    </button>
                </>
            )}
        </div>
    );
};

export default TitleInput;