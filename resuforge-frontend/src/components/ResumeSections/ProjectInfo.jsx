import React from "react";
import {Github, ExternalLink} from "lucide-react";
import ActionLink from "./ActionLink";

const ProjectInfo = ({
                         title,
                         description,
                         githubLink,
                         liveDemoUrl,
                         bgColor,
                         isPreview
                     }) => {
    return (
        <div className="mb-5 group">
            <h3
                className={`${
                    isPreview ? "text-xs" : "text-base"
                } font-semibold text-black transition-colors duration-200`}
            >
                {title}
            </h3>
            <p className="text-sm text-slate-950 font-medium mt-1 leading-relaxed">
                {description}
            </p>

            <div className="flex items-center gap-4 mt-3">
                {githubLink && (
                    <ActionLink
                        icon={<Github className="w-3 h-3 text-gray-950"/>}
                        link={githubLink}
                        bgColor={bgColor}
                    />
                )}

                {liveDemoUrl && (
                    <ActionLink
                        icon={<ExternalLink className="w-3 h-3 text-black"/>}
                        link={liveDemoUrl}
                        bgColor={bgColor}
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectInfo;