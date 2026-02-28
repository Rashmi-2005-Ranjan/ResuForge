import React from "react";
import {Plus, Trash2, FolderGit2, Github, Globe, FileText} from "lucide-react";

const ProjectsDetailForm = ({
                                projectInfo,
                                updateArrayItem,
                                addArrayItem,
                                removeArrayItem,
                            }) => {
    const inputClass = "w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500";

    return (
        <div className="px-5 pt-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <FolderGit2 className="w-4 h-4 text-white"/>
                </div>
                <h2 className="text-lg font-semibold text-white">Projects</h2>
            </div>

            <div className="flex flex-col gap-4 mb-4">
                {projectInfo.map((project, index) => (
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
                  {project.title || `Project ${index + 1}`}
                </span>
                            </div>

                            {projectInfo.length > 1 && (
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
                            {/* Project Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Project Title
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FolderGit2 className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Portfolio Website"
                                        value={project.title || ""}
                                        onChange={({target}) => updateArrayItem(index, "title", target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label
                                    className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400"/>
                                    Description
                                </label>
                                <textarea
                                    placeholder="Short description about the project..."
                                    rows={3}
                                    value={project.description || ""}
                                    onChange={({target}) => updateArrayItem(index, "description", target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500 resize-none"
                                />
                            </div>

                            {/* GitHub Link */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    GitHub Link
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Github className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/username/project"
                                        value={project.githubLink || ""}
                                        onChange={({target}) => updateArrayItem(index, "githubLink", target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Live Demo URL */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Live Demo URL
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe className="w-4 h-4 text-slate-500"/>
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://yourproject.live"
                                        value={project.liveDemo || ""}
                                        onChange={({target}) => updateArrayItem(index, "liveDemo", target.value)}
                                        className={inputClass}
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
                        title: "",
                        description: "",
                        github: "",
                        liveDemo: "",
                    })
                }
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 rounded-xl text-sm font-medium transition-all duration-200"
            >
                <Plus className="w-4 h-4"/>
                Add Project
            </button>
        </div>
    );
};

export default ProjectsDetailForm;