import React, {useContext, useEffect, useRef, useState} from "react";
import {
    DUMMY_RESUME_DATA,
    resumeTemplates,
    themeColorPalette,
} from "../../utils/data";
import {CircleCheckBig, Crown, Sparkles} from "lucide-react";
import Tabs from "../../components/Tabs";
import TemplateCard from "../../components/Cards/TemplateCard";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import {UserContext} from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";
import toast from "react-hot-toast";
import paymentService from "../../services/paymentService";

const TAB_DATA = [{label: "Templates"}, {label: "Color Palettes"}];

const ThemeSelector = ({
                           selectedTheme,
                           setSelectedTheme,
                           resumeData,
                           onClose,
                       }) => {
    const {user, refreshUser} = useContext(UserContext);
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [templateRestrictions, setTemplateRestrictions] = useState({
        availableTemplates: [],
        allTemplates: [],
        subscriptionPlan: 'basic',
        isPremium: false
    });

    const [tabValue, setTabValue] = useState("Templates");
    const [selectedColorPalette, setSelectedColorPalette] = useState({
        colors: selectedTheme?.colorPalette,
        index: -1,
    });
    const [selectedTemplate, setSelectedTemplate] = useState({
        theme: selectedTheme?.theme || "",
        index: -1,
    });

    useEffect(() => {
        const fetchTemplateRestrictions = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
                setTemplateRestrictions(response.data);
            } catch (error) {
                console.error("Error fetching template restrictions:", error);
                toast.error("Failed to load template restrictions");
            }
        };

        if (user) {
            fetchTemplateRestrictions();
        }
    }, [user]);

    const handleThemeSelection = () => {
        setSelectedTheme({
            colorPalette: selectedColorPalette?.colors,
            theme: selectedTemplate?.theme,
        });
        onClose();
    };

    const handleLockedTemplateClick = () => {
        toast("Upgrade to Premium to access all templates!", {
            icon: "🔒",
            style: {
                borderRadius: "10px",
                background: "#f97316",
                color: "#fff",
            },
        });
    };

    const isTemplateLocked = (templateId) => {
        if (templateId === '01') return false;
        return !templateRestrictions.availableTemplates.includes(templateId);
    };

    const updateBaseWidth = () => {
        if (resumeRef.current) {
            setBaseWidth(resumeRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        updateBaseWidth();
        window.addEventListener("resize", updateBaseWidth);
        return () => window.removeEventListener("resize", updateBaseWidth);
    }, []);

    const handleUpgradeToPremium = async () => {
        try {
            toast.loading("Creating order...", {id: "payment"});
            const orderData = await paymentService.createOrder("premium");
            toast.loading("Opening payment gateway...", {id: "payment"});
            const paymentResult = await paymentService.initiatePayment(orderData, user);
            toast.success("Payment successful! Welcome to Premium!", {id: "payment"});
            await refreshUser();
            const response = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
            setTemplateRestrictions(response.data);
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(error.message || "Payment failed. Please try again.", {id: "payment"});
        }
    };

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue}/>

                    {!templateRestrictions.isPremium ? (
                        <div className="flex items-center gap-2">
                            <div
                                className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium">
                                Free Plan
                            </div>
                            <button
                                className="cursor-pointer group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
                                onClick={handleUpgradeToPremium}
                            >
                                <Crown className="w-3 h-3 group-hover:scale-110 transition-transform"/>
                                Upgrade to Premium ₹999
                            </button>
                        </div>
                    ) : (
                        <div
                            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-bold">
                            <Crown className="w-3 h-3"/>
                            Premium Plan
                        </div>
                    )}
                </div>

                <button
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                    onClick={() => handleThemeSelection()}
                >
                    <CircleCheckBig className="w-4 h-4"/>
                    Done
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Panel - Templates/Colors */}
                <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto custom-scrollbar pr-2">
                        {tabValue === "Templates" &&
                            resumeTemplates.map((template, index) => {
                                const isLocked = isTemplateLocked(template.id);
                                return (
                                    <TemplateCard
                                        key={`templates_${index}`}
                                        thumbnailImg={template.thumbnailImg}
                                        isSelected={selectedTemplate?.index === index && !isLocked}
                                        isLocked={isLocked}
                                        onSelect={() =>
                                            setSelectedTemplate({theme: template.id, index})
                                        }
                                        onLockedClick={handleLockedTemplateClick}
                                    />
                                );
                            })}

                        {tabValue === "Color Palettes" &&
                            themeColorPalette.themeOne.map((colors, index) => (
                                <ColorPalette
                                    key={`palette_${index}`}
                                    colors={colors}
                                    isSelected={selectedColorPalette?.index === index}
                                    onSelect={() => setSelectedColorPalette({colors, index})}
                                />
                            ))}
                    </div>
                </div>

                {/* Right Panel - Preview */}
                <div className="col-span-12 md:col-span-7 rounded-2xl overflow-hidden border border-slate-700/50"
                     ref={resumeRef}>
                    <RenderResume
                        templateId={selectedTemplate?.theme || ""}
                        resumeData={resumeData || DUMMY_RESUME_DATA}
                        containerWidth={baseWidth}
                        colorPalette={selectedColorPalette?.colors || []}
                    />
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;

const ColorPalette = ({colors, isSelected, onSelect}) => {
    return (
        <div
            className={`group h-28 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                isSelected
                    ? "border-purple-500 shadow-lg shadow-purple-500/30 scale-105"
                    : "border-slate-700 hover:border-purple-500/50 hover:scale-102"
            }`}
        >
            <div className="h-full flex">
                {colors.map((color, index) => (
                    <div
                        key={`color_${index}`}
                        className="flex-1 transition-all duration-300 group-hover:scale-105"
                        style={{backgroundColor: colors[index]}}
                        onClick={onSelect}
                    />
                ))}
            </div>
        </div>
    );
};