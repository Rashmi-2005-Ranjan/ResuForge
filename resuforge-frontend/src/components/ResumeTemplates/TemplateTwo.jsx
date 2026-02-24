import React, { useEffect, useRef, useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Rss,
    Github,
    User,
    Linkedin,
} from "lucide-react";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

// All dark, ATS-friendly colors
const DEFAULT_THEME = ["#F3F6F9", "#E1EEF4", "#D1E7EB", "#0C4A6E", "#1E293B"];

const Title = ({ text, color }) => {
    return (
        <div className="flex items-center gap-3 mb-3">
            <h2
                className="text-[12px] font-bold uppercase tracking-wide whitespace-nowrap"
                style={{ color: "#1E293B" }} // dark text
            >
                {text}
            </h2>
            <div
                className="flex-1 h-[1.5px] rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / baseWidth);
    }, [containerWidth]);

    return (
        <div
            ref={resumeRef}
            className="bg-white"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            {/* Header strip */}
            <div
                className="px-10 pt-8 pb-6"
                style={{ backgroundColor: themeColors[0] }}
            >
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div
                        className="w-[110px] h-[110px] shrink-0 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-white shadow-sm"
                        style={{ backgroundColor: themeColors[1] }}
                    >
                        {resumeData.profileInfo.profilePreviewUrl ? (
                            <img
                                src={resumeData.profileInfo.profilePreviewUrl}
                                className="w-full h-full object-cover object-top"
                                alt="Profile"
                            />
                        ) : (
                            <User className="w-12 h-12" style={{ color: themeColors[4] }} />
                        )}
                    </div>

                    {/* Name & contacts */}
                    <div className="flex-1 min-w-0">
                        <h2
                            className="text-[22px] font-extrabold leading-tight tracking-tight"
                            style={{ color: "#1E293B" }}
                        >
                            {resumeData.profileInfo.fullName}
                        </h2>
                        <p
                            className="text-[13px] font-semibold mt-0.5 mb-3"
                            style={{ color: "#1E293B" }}
                        >
                            {resumeData.profileInfo.designation}
                        </p>

                        {/* Contact row */}
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {resumeData.contactInfo.email && (
                                <ContactInfo
                                    icon={<Mail />}
                                    iconBG={themeColors[2]}
                                    value={resumeData.contactInfo.email}
                                    textColor="#1E293B"
                                />
                            )}
                            {resumeData.contactInfo.phone && (
                                <ContactInfo
                                    icon={<Phone />}
                                    iconBG={themeColors[2]}
                                    value={resumeData.contactInfo.phone}
                                    textColor="#1E293B"
                                />
                            )}
                            {resumeData.contactInfo.location && (
                                <ContactInfo
                                    icon={<MapPin />}
                                    iconBG={themeColors[2]}
                                    value={resumeData.contactInfo.location}
                                    textColor="#1E293B"
                                />
                            )}
                            {resumeData.contactInfo.linkedIn && (
                                <ContactInfo
                                    icon={<Linkedin />}
                                    iconBG={themeColors[2]}
                                    value={resumeData.contactInfo.linkedIn}
                                    textColor="#1E293B"
                                />
                            )}
                            {resumeData.contactInfo.github && (
                                <ContactInfo
                                    icon={<Github />}
                                    iconBG={themeColors[2]}
                                    value={resumeData.contactInfo.github}
                                    textColor="#1E293B"
                                />
                            )}
                            {resumeData.contactInfo.website && (
                                <ContactInfo
                                    icon={<Rss />}
                                    iconBG={themeColors[2]}
                                    value={resumeData.contactInfo.website}
                                    textColor="#1E293B"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="px-10 py-6 space-y-5" style={{ color: "#1E293B" }}>
                {/* Summary */}
                {resumeData.profileInfo.summary && (
                    <div>
                        <Title text="Professional Summary" color={themeColors[3]} />
                        <p className="text-[12px] leading-relaxed font-medium">
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>
                )}

                {/* Work Experience */}
                {resumeData.workExperience?.length > 0 && (
                    <div>
                        <Title text="Work Experience" color={themeColors[3]} />
                        {resumeData.workExperience?.map((data, index) => (
                            <WorkExperience
                                key={`work_${index}`}
                                company={data.company}
                                role={data.role}
                                duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                                    data.endDate
                                )}`}
                                durationColor="#1E293B"
                                description={data.description}
                                textColor="#1E293B"
                            />
                        ))}
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects?.length > 0 && (
                    <div>
                        <Title text="Projects" color={themeColors[3]} />
                        {resumeData.projects.map((project, index) => (
                            <ProjectInfo
                                key={`project_${index}`}
                                title={project.title}
                                description={project.description}
                                githubLink={project.githubLink}
                                liveDemoUrl={project.liveDemo}
                                bgColor={themeColors[2]}
                                textColor="#1E293B"
                            />
                        ))}
                    </div>
                )}

                {/* Education */}
                {resumeData.educations?.length > 0 && (
                    <div>
                        <Title text="Education" color={themeColors[3]} />
                        <div className="grid grid-cols-2 gap-3">
                            {resumeData.educations.map((data, index) => (
                                <EducationInfo
                                    key={`education_${index}`}
                                    degree={data.degree}
                                    institution={data.institution}
                                    duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                                        data.endDate
                                    )}`}
                                    textColor="#1E293B"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeData.certifications?.length > 0 && (
                    <div>
                        <Title text="Certifications" color={themeColors[3]} />
                        <div className="grid grid-cols-2 gap-4">
                            {resumeData.certifications.map((data, index) => (
                                <CertificationInfo
                                    key={`cert_${index}`}
                                    title={data.title}
                                    issuer={data.issuer}
                                    year={data.year}
                                    bgColor={themeColors[2]}
                                    textColor="#1E293B"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills?.length > 0 && (
                    <div>
                        <Title text="Skills" color={themeColors[3]} />
                        <SkillSection
                            skills={resumeData.skills}
                            accentColor={themeColors[3]}
                            bgColor={themeColors[2]}
                            textColor="#1E293B"
                        />
                    </div>
                )}

                {/* Languages & Interests */}
                <div className="grid grid-cols-2 gap-8">
                    {resumeData.languages?.length > 0 && (
                        <div>
                            <Title text="Languages" color={themeColors[3]} />
                            <LanguageSection
                                languages={resumeData.languages}
                                accentColor={themeColors[3]}
                                bgColor={themeColors[2]}
                                textColor="#1E293B"
                            />
                        </div>
                    )}

                    {resumeData.interests?.length > 0 && resumeData.interests[0] !== "" && (
                        <div>
                            <Title text="Interests" color={themeColors[3]} />
                            <div className="flex flex-wrap gap-2 mt-1">
                                {resumeData.interests.map((interest, index) => {
                                    if (!interest) return null;
                                    return (
                                        <span
                                            key={`interest_${index}`}
                                            className="text-[11px] font-semibold py-1 px-3 rounded-full"
                                            style={{
                                                backgroundColor: themeColors[2],
                                                color: "#1E293B",
                                            }}
                                        >
                      {interest}
                    </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateTwo;