import React from "react";
import {Plus, Trash2, GraduationCap, BookOpen, Calendar} from "lucide-react";

const EducationDetailsForm = ({
                                  educationInfo,
                                  updateArrayItem,
                                  addArrayItem,
                                  removeArrayItem,
                              }) => {
    const inputClass = "w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500";
    const dateInputClass = "w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all [color-scheme:dark]";

    return (
        <div className="px-5 pt-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-white"/>
                </div>
                <h2 className="text-lg font-semibold text-white">Education</h2>
            </div>

            <div className="flex flex-col gap-4 mb-4">
                {educationInfo.map((education, index) => (
                    <div
                        key={index}
                        className="group relative bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300"
                    >
                        {/* Card Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-7 h-7 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-slate-600 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-purple-400">{index + 1}</span>
                                </div>
                                <span className="text-sm font-medium text-slate-300">
                  {education.degree || education.institution
                      ? `${education.degree || 'Degree'}${education.institution ? ` at ${education.institution}` : ''}`
                      : `Education ${index + 1}`}
                </span>
                            </div>

                            {educationInfo.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem(index)}
                                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-200"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Degree */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Degree</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <GraduationCap className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="B.Tech in Computer Science"
                                        value={education.degree || ""}
                                        onChange={({target}) => updateArrayItem(index, "degree", target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Institution */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Institution</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BookOpen className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="XYZ University"
                                        value={education.institution || ""}
                                        onChange={({target}) => updateArrayItem(index, "institution", target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="month"
                                        value={education.startDate || ""}
                                        onChange={({target}) => updateArrayItem(index, "startDate", target.value)}
                                        className={dateInputClass}
                                    />
                                </div>
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="month"
                                        value={education.endDate || ""}
                                        onChange={({target}) => updateArrayItem(index, "endDate", target.value)}
                                        className={dateInputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Button */}
            <button
                type="button"
                onClick={() =>
                    addArrayItem({
                        degree: "",
                        institution: "",
                        startDate: "",
                        endDate: "",
                    })
                }
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 rounded-xl text-sm font-medium transition-all duration-200"
            >
                <Plus className="w-4 h-4"/>
                Add Education
            </button>
        </div>
    );
};

export default EducationDetailsForm;