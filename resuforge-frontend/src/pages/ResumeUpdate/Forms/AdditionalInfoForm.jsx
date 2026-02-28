import React from "react";
import {Plus, Trash2, Globe2, Heart, Star} from "lucide-react";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const AdditionalInfoForm = ({
                                languages,
                                interests,
                                updateArrayItem,
                                addArrayItem,
                                removeArrayItem,
                            }) => {
    const getProficiencyLabel = (progress) => {
        const level = progress / 20;
        if (level <= 1) return {label: "Beginner", color: "text-red-400"};
        if (level <= 2) return {label: "Elementary", color: "text-orange-400"};
        if (level <= 3) return {label: "Intermediate", color: "text-yellow-400"};
        if (level <= 4) return {label: "Advanced", color: "text-blue-400"};
        return {label: "Fluent", color: "text-emerald-400"};
    };

    return (
        <div className="px-5 pt-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Globe2 className="w-4 h-4 text-white"/>
                </div>
                <h2 className="text-lg font-semibold text-white">Additional Info</h2>
            </div>

            {/* Languages Section */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Globe2 className="w-4 h-4 text-purple-400"/>
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Languages</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {languages?.map((lang, index) => {
                        const proficiency = getProficiencyLabel(lang.progress || 0);
                        return (
                            <div
                                key={index}
                                className="group relative bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-7 h-7 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-slate-600 rounded-lg flex items-center justify-center">
                                            <span className="text-xs font-bold text-purple-400">{index + 1}</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-300">
                      {lang.name || `Language ${index + 1}`}
                    </span>
                                    </div>

                                    {languages.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem("languages", index)}
                                            className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-200"
                                        >
                                            <Trash2 className="w-4 h-4"/>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                    {/* Language Name */}
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                                        <div className="relative">
                                            <div
                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Globe2 className="w-4 h-4 text-slate-500"/>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="e.g. English"
                                                value={lang.name || ""}
                                                onChange={({target}) =>
                                                    updateArrayItem("languages", index, "name", target.value)
                                                }
                                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Proficiency */}
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-slate-300 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-slate-400"/>
                        Proficiency
                      </span>
                                            <span className={`text-xs font-semibold ${proficiency.color}`}>
                        {proficiency.label}
                      </span>
                                        </label>
                                        <div
                                            className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 flex items-center justify-center">
                                            <RatingInput
                                                value={lang.progress || 0}
                                                onChange={(value) =>
                                                    updateArrayItem("languages", index, "progress", value)
                                                }
                                                total={5}
                                                activeColor="#0ea5e9"
                                                inactiveColor="#e0f2fe"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => addArrayItem("languages", {name: "", progress: 0})}
                        className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 rounded-xl text-sm font-medium transition-all duration-200"
                    >
                        <Plus className="w-4 h-4"/>
                        Add Language
                    </button>
                </div>
            </div>

            {/* Interests Section */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-4 h-4 text-pink-400"/>
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Interests</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {interests?.map((interest, index) => (
                        <div
                            key={index}
                            className="group relative bg-slate-800/30 border border-slate-700/50 hover:border-pink-500/30 rounded-xl p-3 transition-all duration-300 flex items-center gap-3"
                        >
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Heart className="w-4 h-4 text-slate-500"/>
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. Reading, Travel, Photography..."
                                value={interest || ""}
                                onChange={({target}) =>
                                    updateArrayItem("interests", index, null, target.value)
                                }
                                className="w-full bg-transparent text-white pl-7 pr-10 py-1 text-sm focus:outline-none placeholder:text-slate-500"
                            />
                            {interests.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem("interests", index)}
                                    className="cursor-pointer flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-200"
                                >
                                    <Trash2 className="w-3 h-3"/>
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addArrayItem("interests", "")}
                        className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-500/30 hover:border-pink-500/50 text-pink-400 hover:text-pink-300 rounded-xl text-sm font-medium transition-all duration-200"
                    >
                        <Plus className="w-4 h-4"/>
                        Add Interest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfoForm;