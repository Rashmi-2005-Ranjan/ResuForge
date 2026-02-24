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

const DEFAULT_THEME = ["#1E293B", "#1E293B", "#1E293B", "#1E293B", "#1E293B"];

const Title = ({ text, color }) => {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <h2 className="text-[10.5px] font-bold uppercase tracking-[0.18em] whitespace-nowrap" style={{ color: "#1E293B" }}>
                {text}
            </h2>
            <div className="flex-1 h-px opacity-20" style={{ backgroundColor: color }} />
        </div>
    );
};

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
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
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
                backgroundColor: "#ffffff",
            }}
        >
            {/* Header */}
            <div
                className="px-8 py-6 flex items-center gap-6"
                style={{
                    background: `#ffffff`,
                    borderBottom: `1px solid ${themeColors[1]}22`
                }}
            >
                {/* Avatar */}
                <div
                    className="w-[100px] h-[100px] shrink-0 rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{
                        background: "#E5E7EB",
                        border: `2px solid ${themeColors[3]}33`,
                    }}
                >
                    {resumeData.profileInfo.profilePreviewUrl ? (
                        <img
                            src={resumeData.profileInfo.profilePreviewUrl}
                            className="w-full h-full object-cover object-top"
                            alt="Profile"
                        />
                    ) : (
                        <User className="w-12 h-12" style={{ color: "#1E293B" }} />
                    )}
                </div>

                {/* Name + contacts */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-[22px] font-extrabold tracking-tight leading-tight" style={{ color: "#1E293B" }}>
                        {resumeData.profileInfo.fullName}
                    </h2>
                    <p className="text-[13px] font-semibold mt-0.5 mb-3" style={{ color: "#1E293B" }}>
                        {resumeData.profileInfo.designation}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                        {resumeData.contactInfo.email && (
                            <ContactInfo icon={<Mail className="w-4 h-4 text-[#1E293B]" />} iconBG="#E5E7EB" value={resumeData.contactInfo.email} textColor="#1E293B"/>
                        )}
                        {resumeData.contactInfo.phone && (
                            <ContactInfo icon={<Phone className="w-4 h-4 text-[#1E293B]" />} iconBG="#E5E7EB" value={resumeData.contactInfo.phone} textColor="#1E293B"/>
                        )}
                        {resumeData.contactInfo.location && (
                            <ContactInfo icon={<MapPin className="w-4 h-4 text-[#1E293B]" />} iconBG="#E5E7EB" value={resumeData.contactInfo.location} textColor="#1E293B"/>
                        )}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-12">

                {/* Left Sidebar */}
                <div className="col-span-4 px-6 py-6 space-y-5" style={{ backgroundColor: "#F9FAFB" }}>
                    {/* Social links */}
                    <div className="flex flex-col gap-3">
                        {resumeData.contactInfo.linkedIn && (
                            <ContactInfo icon={<Linkedin className="w-4 h-4 text-[#1E293B]" />} iconBG="#E5E7EB" value={resumeData.contactInfo.linkedIn} textColor="#1E293B"/>
                        )}
                        {resumeData.contactInfo.github && (
                            <ContactInfo icon={<Github className="w-4 h-4 text-[#1E293B]" />} iconBG="#E5E7EB" value={resumeData.contactInfo.github} textColor="#1E293B"/>
                        )}
                        {resumeData.contactInfo.website && (
                            <ContactInfo icon={<Rss className="w-4 h-4 text-[#1E293B]" />} iconBG="#E5E7EB" value={resumeData.contactInfo.website} textColor="#1E293B"/>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full opacity-20 bg-[#1E293B]" />

                    {/* Education */}
                    {resumeData.educations?.length > 0 && (
                        <div>
                            <Title text="Education" color="#1E293B"/>
                            {resumeData.educations.map((data, index) => (
                                <EducationInfo
                                    key={`education_${index}`}
                                    degree={data.degree}
                                    institution={data.institution}
                                    duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                                    textColor="#1E293B"
                                />
                            ))}
                        </div>
                    )}

                    {/* Languages */}
                    {resumeData.languages?.length > 0 && (
                        <div>
                            <Title text="Languages" color="#1E293B"/>
                            <LanguageSection languages={resumeData.languages} accentColor="#1E293B" bgColor="#E5E7EB" textColor="#1E293B"/>
                        </div>
                    )}
                </div>

                {/* Right Main */}
                <div className="col-span-8 px-7 py-6 space-y-5">
                    {/* Summary */}
                    {resumeData.profileInfo.summary && (
                        <div>
                            <Title text="Professional Summary" color="#1E293B"/>
                            <p className="text-[11.5px] leading-relaxed font-medium" style={{ color: "#1E293B" }}>
                                {resumeData.profileInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* Work Experience */}
                    {resumeData.workExperience?.length > 0 && (
                        <div>
                            <Title text="Work Experience" color="#1E293B"/>
                            {resumeData.workExperience?.map((data, index) => (
                                <WorkExperience
                                    key={`work_${index}`}
                                    company={data.company}
                                    role={data.role}
                                    duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
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
                            <Title text="Projects" color="#1E293B"/>
                            {resumeData.projects.map((project, index) => (
                                <ProjectInfo
                                    key={`project_${index}`}
                                    title={project.title}
                                    description={project.description}
                                    githubLink={project.githubLink}
                                    liveDemoUrl={project.liveDemo}
                                    bgColor="#E5E7EB"
                                    textColor="#1E293B"
                                />
                            ))}
                        </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills?.length > 0 && (
                        <div>
                            <Title text="Skills" color="#1E293B"/>
                            <SkillSection skills={resumeData.skills} accentColor="#1E293B" bgColor="#E5E7EB" textColor="#1E293B"/>
                        </div>
                    )}

                    {/* Certifications */}
                    {resumeData.certifications?.length > 0 && (
                        <div>
                            <Title text="Certifications" color="#1E293B"/>
                            <div className="grid grid-cols-2 gap-2">
                                {resumeData.certifications.map((data, index) => (
                                    <CertificationInfo
                                        key={`cert_${index}`}
                                        title={data.title}
                                        issuer={data.issuer}
                                        year={data.year}
                                        bgColor="#E5E7EB"
                                        textColor="#1E293B"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests */}
                    {resumeData.interests?.length > 0 && resumeData.interests[0] !== "" && (
                        <div>
                            <Title text="Interests" color="#1E293B"/>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {resumeData.interests.map((interest, index) => (
                                    <span key={`interest_${index}`} className="text-[10px] font-semibold py-1 px-3 rounded-full" style={{
                                        color: "#1E293B",
                                        backgroundColor: "#E5E7EB",
                                        border: `1px solid #1E293B33`
                                    }}>
                    {interest}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateThree;