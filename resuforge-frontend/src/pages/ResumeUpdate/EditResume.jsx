import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    ArrowLeft,
    CircleAlert,
    Download,
    Palette,
    Save,
    Trash2,
    Mail,
    ArrowRight,
    FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectsDetailForm from "./Forms/ProjectsDetailForm.jsx";
import CertificationInfoForm from "./Forms/CertificationInfoForm.jsx";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm.jsx";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import {captureElementAsImage, dataURLtoFile} from "../../utils/helper";
import ThemeSelector from "./ThemeSelector";
import Modal from "../../components/Modal";
import EmailPopup from "../../components/EmailPopup";
import {downloadPDF} from "../../utils/pdfGenerator";

const EditResume = () => {
    const {resumeId} = useParams();
    const navigate = useNavigate();

    const resumeRef = useRef(null);
    const resumeDownloadRef = useRef(null);

    const [baseWidth, setBaseWidth] = useState(800);
    const [openThemeSelector, setOpenThemeSelector] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openEmailPopup, setOpenEmailPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState("profile-info");
    const [progress, setProgress] = useState(0);
    const [resumeData, setResumeData] = useState({
        title: "",
        thumbnailLink: "",
        profileInfo: {
            profileImg: null,
            profilePreviewUrl: "",
            fullName: "",
            designation: "",
            summary: "",
        },
        template: {
            theme: "",
            colorPalette: "",
        },
        contactInfo: {
            email: "",
            phone: "",
            location: "",
            linkedIn: "",
            github: "",
            website: "",
        },
        workExperience: [{company: "", role: "", startDate: "", endDate: "", description: ""}],
        educations: [{degree: "", institution: "", startDate: "", endDate: ""}],
        skills: [{name: "", progress: 0}],
        projects: [{title: "", description: "", githubLink: "", liveDemo: ""}],
        certifications: [{title: "", issuer: "", year: ""}],
        languages: [{name: "", progress: 0}],
        interests: [""],
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateAndNext = (e) => {
        const errors = [];

        switch (currentPage) {
            case "profile-info": {
                const {fullName, designation, summary} = resumeData.profileInfo;
                if (!fullName.trim()) errors.push("Full Name is required");
                if (!designation.trim()) errors.push("Designation is required");
                if (!summary.trim()) errors.push("Summary is required");
                break;
            }
            case "contact-info": {
                const {email, phone, location} = resumeData.contactInfo;
                if (!location || !location.trim()) errors.push("Address is required");
                if (!email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email is required.");
                if (!phone || !phone.trim()) errors.push("Valid phone number is required");
                break;
            }
            case "work-experience":
                resumeData.workExperience?.forEach(({company, role, startDate, endDate}, index) => {
                    if (!company.trim()) errors.push(`Company is required in experience ${index + 1}`);
                    if (!role.trim()) errors.push(`Role is required in experience ${index + 1}`);
                    if (!startDate || !endDate) errors.push(`Start and End dates are required in experience ${index + 1}`);
                });
                break;
            case "education-info":
                resumeData.educations.forEach(({degree, institution, startDate, endDate}, index) => {
                    if (!degree.trim()) errors.push(`Degree is required in education ${index + 1}`);
                    if (!institution.trim()) errors.push(`Institution is required in education ${index + 1}`);
                    if (!startDate || !endDate) errors.push(`Start and End dates are required in education ${index + 1}`);
                });
                break;
            case "skills":
                resumeData.skills.forEach(({name, progress}, index) => {
                    if (!name.trim()) errors.push(`Skill name is required in skill ${index + 1}`);
                    if (progress < 1 || progress > 100) errors.push(`Skill progress must be between 1 and 100 in skill ${index + 1}`);
                });
                break;
            case "projects":
                resumeData.projects.forEach(({title, description}, index) => {
                    if (!title.trim()) errors.push(`Project title is required in project ${index + 1}`);
                    if (!description.trim()) errors.push(`Project description is required in project ${index + 1}`);
                });
                break;
            case "certifications":
                resumeData.certifications.forEach(({title, issuer}, index) => {
                    if (!title.trim()) errors.push(`Certification title is required in certification ${index + 1}`);
                    if (!issuer.trim()) errors.push(`Issuer is required in certification ${index + 1}`);
                });
                break;
            case "additionalInfo":
                if (resumeData.languages.length === 0 || !resumeData.languages[0].name?.trim()) {
                    errors.push("At least one language is required");
                }
                if (resumeData.interests.length === 0 || !resumeData.interests[0]?.trim()) {
                    errors.push("At least one interest is required");
                }
                break;
            default:
                break;
        }

        if (errors.length > 0) {
            setErrorMsg(errors.join(", "));
            return;
        }

        setErrorMsg("");
        goToNextStep();
    };

    const goToNextStep = () => {
        const pages = ["profile-info", "contact-info", "work-experience", "education-info", "skills", "projects", "certifications", "additionalInfo"];
        if (currentPage === "additionalInfo") setOpenPreviewModal(true);
        const currentIndex = pages.indexOf(currentPage);
        if (currentIndex !== -1 && currentIndex < pages.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentPage(pages[nextIndex]);
            const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
            setProgress(percent);
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    };

    const goBack = () => {
        const pages = ["profile-info", "contact-info", "work-experience", "education-info", "skills", "projects", "certifications", "additionalInfo"];
        if (currentPage === "profile-info") navigate("/dashboard");
        const currentIndex = pages.indexOf(currentPage);
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentPage(pages[prevIndex]);
            const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
            setProgress(percent);
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    };

    const renderForm = () => {
        switch (currentPage) {
            case "profile-info":
                return <ProfileInfoForm profileData={resumeData?.profileInfo}
                                        updateSection={(key, value) => updateSection("profileInfo", key, value)}
                                        onNext={validateAndNext}/>;
            case "contact-info":
                return <ContactInfoForm contactInfo={resumeData?.contactInfo}
                                        updateSection={(key, value) => updateSection("contactInfo", key, value)}/>;
            case "work-experience":
                return <WorkExperienceForm workExperience={resumeData?.workExperience}
                                           updateArrayItem={(index, key, value) => updateArrayItem("workExperience", index, key, value)}
                                           addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
                                           removeArrayItem={(index) => removeArrayItem("workExperience", index)}/>;
            case "education-info":
                return <EducationDetailsForm educationInfo={resumeData?.educations}
                                             updateArrayItem={(index, key, value) => updateArrayItem("educations", index, key, value)}
                                             addArrayItem={(newItem) => addArrayItem("educations", newItem)}
                                             removeArrayItem={(index) => removeArrayItem("educations", index)}/>;
            case "skills":
                return <SkillsInfoForm skillsInfo={resumeData?.skills}
                                       updateArrayItem={(index, key, value) => updateArrayItem("skills", index, key, value)}
                                       addArrayItem={(newItem) => addArrayItem("skills", newItem)}
                                       removeArrayItem={(index) => removeArrayItem("skills", index)}/>;
            case "projects":
                return <ProjectsDetailForm projectInfo={resumeData?.projects}
                                           updateArrayItem={(index, key, value) => updateArrayItem("projects", index, key, value)}
                                           addArrayItem={(newItem) => addArrayItem("projects", newItem)}
                                           removeArrayItem={(index) => removeArrayItem("projects", index)}/>;
            case "certifications":
                return <CertificationInfoForm certifications={resumeData?.certifications}
                                              updateArrayItem={(index, key, value) => updateArrayItem("certifications", index, key, value)}
                                              addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
                                              removeArrayItem={(index) => removeArrayItem("certifications", index)}/>;
            case "additionalInfo":
                return <AdditionalInfoForm languages={resumeData.languages} interests={resumeData.interests}
                                           updateArrayItem={(section, index, key, value) => updateArrayItem(section, index, key, value)}
                                           addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
                                           removeArrayItem={(section, index) => removeArrayItem(section, index)}/>;
            default:
                return null;
        }
    };

    const updateSection = (section, key, value) => {
        setResumeData((prev) => ({...prev, [section]: {...prev[section], [key]: value}}));
    };

    const updateArrayItem = (section, index, key, value) => {
        setResumeData((prev) => {
            const current = prev[section];

            if (!Array.isArray(current)) return prev;

            const updatedArray = [...current];

            // ✅ for string arrays like interests
            if (typeof updatedArray[index] === "string") {
                updatedArray[index] = value;
            } else {
                updatedArray[index] = {
                    ...updatedArray[index],
                    [key]: value,
                };
            }

            return { ...prev, [section]: updatedArray };
        });
    };
    const addArrayItem = (section, newItem) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: Array.isArray(prev[section])
                ? [...prev[section], newItem]
                : [newItem],
        }));
    };
    const removeArrayItem = (section, index) => {
        setResumeData((prev) => {
            if (!Array.isArray(prev[section])) return prev;

            const updatedArray = [...prev[section]];
            updatedArray.splice(index, 1);
            return { ...prev, [section]: updatedArray };
        });
    };
    const fetchResumeDetailsById = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
            if (response.data && response.data._id) {
                const resumeInfo = response.data;
                setResumeData((prevState) => ({
                    ...prevState,
                    title: resumeInfo?.title || "Untitled",
                    thumbnailLink: resumeInfo?.thumbnailLink || "",
                    template: resumeInfo?.template || prevState?.template,
                    profileInfo: {...prevState.profileInfo, ...resumeInfo?.profileInfo},
                    contactInfo: {...prevState.contactInfo, ...resumeInfo?.contactInfo},
                    workExperience: resumeInfo?.workExperiences?.length > 0 ? resumeInfo.workExperiences : prevState?.workExperiences,
                    educations: resumeInfo?.educations?.length > 0 ? resumeInfo.educations : prevState?.educations,
                    skills: resumeInfo?.skills?.length > 0 ? resumeInfo.skills : prevState?.skills,
                    projects: resumeInfo?.projects?.length > 0 ? resumeInfo.projects : prevState?.projects,
                    certifications: resumeInfo?.certifications?.length > 0 ? resumeInfo.certifications : prevState?.certifications,
                    languages: resumeInfo?.languages?.length > 0 ? resumeInfo.languages : prevState?.languages,
                    interests: resumeInfo?.interests?.length > 0 ? resumeInfo.interests : prevState?.interests,
                }));
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
        }
    };

    const uploadResumeImages = async () => {
        try {
            setIsLoading(true);

            const imageDataUrl = await captureElementAsImage(resumeRef.current);
            const thumbnailFile = dataURLtoFile(
                imageDataUrl,
                `resume-${resumeId}.jpg`
            );

            const profileImageFile =
                resumeData?.profileInfo?.profileImg || null;

            const formData = new FormData();
            if (profileImageFile) formData.append("profileImage", profileImageFile);
            if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

            const uploadResponse = await axiosInstance.put(
                API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
                formData,
                {headers: {"Content-Type": "multipart/form-data"}}
            );

            const {thumbnailLink, profilePreviewUrl} = uploadResponse.data;
            await updateResumeDetails(thumbnailLink, profilePreviewUrl);

            toast.success("Resume Updated Successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("Failed to upload images");
        } finally {
            setIsLoading(false);
        }
    };
    const normalizeArray = (value) => {
        if (!Array.isArray(value)) return [];

        return value.filter((item) => {
            if (typeof item === "string") {
                return item.trim() !== "";
            }
            if (typeof item === "object") {
                return Object.values(item).some(
                    (v) => v !== "" && v !== null && v !== undefined
                );
            }
            return false;
        });
    };

    const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
        try {
            setIsLoading(true);

            const payload = {
                title: resumeData.title || "",
                thumbnailLink: thumbnailLink || "",

                template: {
                    theme: resumeData.template?.theme || "",
                    colorPalette: resumeData.template?.colorPalette || [],
                },

                profileInfo: {
                    fullName: resumeData.profileInfo?.fullName || "",
                    designation: resumeData.profileInfo?.designation || "",
                    summary: resumeData.profileInfo?.summary || "",
                    profilePreviewUrl: profilePreviewUrl || "",
                },

                contactInfo: {
                    email: resumeData.contactInfo?.email || "",
                    phone: resumeData.contactInfo?.phone || "",
                    location: resumeData.contactInfo?.location || "",
                    linkedIn: resumeData.contactInfo?.linkedIn || "",
                    github: resumeData.contactInfo?.github || "",
                    website: resumeData.contactInfo?.website || "",
                },

                // MATCH BACKEND FIELD NAMES
                workExperiences: normalizeArray(resumeData.workExperience),
                educations: normalizeArray(resumeData.educations),
                skills: normalizeArray(resumeData.skills),
                projects: normalizeArray(resumeData.projects),
                certifications: normalizeArray(resumeData.certifications),
                languages: normalizeArray(resumeData.languages),
                interests: normalizeArray(resumeData.interests),
            };

            await axiosInstance.put(
                API_PATHS.RESUME.UPDATE(resumeId),
                payload
            );
        } catch (err) {
            console.error("Error updating resume:", err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleDeleteResume = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
            toast.success("Resume Deleted Successfully");
            navigate("/dashboard");
        } catch (err) {
            console.error("Error deleting resume:", err);
            toast.error("Failed to delete resume... Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const PDF_EXPORT_WIDTH = 800; // or compute dynamically if you prefer

    const downloadResume = () => {
        downloadPDF(resumeDownloadRef.current, resumeData.title, { exportWidth: PDF_EXPORT_WIDTH });
    };

    const updateBaseWidth = () => {
        if (resumeRef.current) setBaseWidth(resumeRef.current.offsetWidth);
    };

    useEffect(() => {
        updateBaseWidth();
        window.addEventListener("resize", updateBaseWidth);
        if (resumeId) fetchResumeDetailsById();
        return () => window.removeEventListener("resize", updateBaseWidth);
    }, []);

    return (
        <DashboardLayout>
            <div className="container mx-auto px-2">
                {/* Top Action Bar */}
                <div
                    className="flex items-center justify-between gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl py-3 px-5 mb-5">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                            <FileText className="w-4 h-4 text-white"/>
                        </div>
                        <TitleInput
                            title={resumeData.title}
                            setTitle={(value) =>
                                setResumeData((prevState) => ({...prevState, title: value}))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={() => setOpenThemeSelector(true)}
                            className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-purple-500/50 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-200"
                        >
                            <Palette className="w-4 h-4"/>
                            <span className="hidden md:block">Theme</span>
                        </button>

                        <button
                            onClick={handleDeleteResume}
                            className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 rounded-xl text-sm font-medium transition-all duration-200"
                        >
                            <Trash2 className="w-4 h-4"/>
                            <span className="hidden md:block">Delete</span>
                        </button>

                        <button
                            onClick={() => setOpenPreviewModal(true)}
                            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                        >
                            <Download className="w-4 h-4"/>
                            <span className="hidden md:block">Preview & Download</span>
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Left Panel - Form */}
                    <div
                        className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                        <StepProgress progress={progress}/>

                        <div className="overflow-y-auto">
                            {renderForm()}
                        </div>

                        <div className="px-5 pb-5">
                            {/* Error Message */}
                            {errorMsg && (
                                <div
                                    className="flex items-start gap-2 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 px-4 py-3 my-3 rounded-xl">
                                    <CircleAlert className="w-4 h-4 flex-shrink-0 mt-0.5"/>
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-end gap-3 mt-4">
                                <button
                                    onClick={goBack}
                                    disabled={isLoading}
                                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50"
                                >
                                    <ArrowLeft className="w-4 h-4"/>
                                    Back
                                </button>

                                <button
                                    onClick={uploadResumeImages}
                                    disabled={isLoading}
                                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4"/>
                                    {isLoading ? "Saving..." : "Save & Exit"}
                                </button>

                                <button
                                    onClick={validateAndNext}
                                    disabled={isLoading}
                                    className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 group"
                                >
                                    {currentPage === "additionalInfo" ? (
                                        <>
                                            <Download className="w-4 h-4"/>
                                            Preview & Download
                                        </>
                                    ) : (
                                        <>
                                            Next
                                            <ArrowRight
                                                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Resume Preview */}
                    <div
                        ref={resumeRef}
                        className="h-[100vh] rounded-2xl overflow-hidden border border-slate-700/50"
                    >
                        <RenderResume
                            templateId={resumeData?.template?.theme || ""}
                            resumeData={resumeData}
                            colorPalette={resumeData?.template?.colorPalette || []}
                            containerWidth={baseWidth}
                        />
                    </div>
                </div>
            </div>

            {/* Theme Selector Modal */}
            <Modal
                isOpen={openThemeSelector}
                onClose={() => setOpenThemeSelector(false)}
                title="Change Theme"
            >
                <div className="w-[90vw] h-[80vh]">
                    <ThemeSelector
                        selectedTheme={resumeData?.template}
                        setSelectedTheme={(value) => {
                            setResumeData((prevState) => ({
                                ...prevState,
                                template: value || prevState.template,
                            }));
                        }}
                        resumeData={null}
                        onClose={() => setOpenThemeSelector(false)}
                    />
                </div>
            </Modal>

            {/* Preview & Download Modal */}
            {/* Preview & Download Modal - HIGH PRIORITY */}
            <Modal
                isOpen={openPreviewModal}
                onClose={() => setOpenPreviewModal(false)}
                title={resumeData.title}
                priority="high"  // ADD THIS LINE
                showActionBtn
                actionBtnText="Download"
                actionBtnIcon={<Download className="w-4 h-4"/>}
                onActionClick={downloadResume}
                showSecondaryActionBtn
                secondaryActionBtnText="Send Email"
                secondaryActionBtnIcon={<Mail className="w-4 h-4"/>}
                onSecondaryActionClick={() => setOpenEmailPopup(true)}
            >
                <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
                    <RenderResume
                        templateId={resumeData?.template?.theme || ""}
                        resumeData={resumeData}
                        colorPalette={resumeData?.template?.colorPalette || []}
                    />
                </div>
            </Modal>

            {/* Theme Selector Modal - NORMAL PRIORITY */}
            <Modal
                isOpen={openThemeSelector}
                onClose={() => setOpenThemeSelector(false)}
                title="Change Theme"
                priority="normal"  // ADD THIS LINE
            >
                <div className="w-[90vw] h-[80vh]">
                    <ThemeSelector
                        selectedTheme={resumeData?.template}
                        setSelectedTheme={(value) => {
                            setResumeData((prevState) => ({
                                ...prevState,
                                template: value || prevState.template,
                            }));
                        }}
                        resumeData={null}
                        onClose={() => setOpenThemeSelector(false)}
                    />
                </div>
            </Modal>

            {/* Email Popup */}
            <EmailPopup
                isOpen={openEmailPopup}
                onClose={() => setOpenEmailPopup(false)}
                resumeId={resumeId}
                resumeTitle={resumeData.title}
                resumePreviewRef={resumeDownloadRef}
            />
        </DashboardLayout>
    );
};

export default EditResume;