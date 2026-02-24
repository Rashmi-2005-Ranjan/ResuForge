import React, {useContext, useState, useEffect} from "react";
import HERO_IMG from "../assets/hero-img.png";
import {useNavigate, useLocation} from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import {UserContext} from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import {
    Edit3,
    Download,
    Eye,
    Star,
    Check,
    ArrowRight,
    Users,
    TrendingUp,
    Award,
    Zap,
    Shield,
    Smartphone,
    FileText,
    Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

const LandingPage = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const verified = params.get("emailVerified");
        if (!verified) return;

        const handledKey = "emailVerifiedToastHandled";
        if (sessionStorage.getItem(handledKey) === "true") {
            if (location.search) navigate(location.pathname, {replace: true});
            return;
        }

        const reason = params.get("reason");
        if (verified === "success") {
            toast.success("Email verified successfully. You can now log in.");
        } else if (verified === "failed") {
            toast.error(reason ? decodeURIComponent(reason) : "Email verification failed. Please request a new link.");
        }

        sessionStorage.setItem(handledKey, "true");
        navigate(location.pathname, {replace: true});
    }, [location.search, navigate]);

    const handleCTA = () => {
        if (!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard");
        }
    };

    const features = [
        {
            icon: <Edit3 className="w-7 h-7"/>,
            title: "Smart Editor",
            description: "Intuitive drag-and-drop interface with real-time preview and AI-powered suggestions.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Eye className="w-7 h-7"/>,
            title: "Live Preview",
            description: "See your changes instantly with our advanced live preview technology.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <Download className="w-7 h-7"/>,
            title: "Export Options",
            description: "Download in multiple formats: PDF, Word, or share with a custom link.",
            gradient: "from-emerald-500 to-teal-500"
        },
        {
            icon: <Zap className="w-7 h-7"/>,
            title: "Lightning Fast",
            description: "Build professional resumes in under 5 minutes with our optimized workflow.",
            gradient: "from-amber-500 to-orange-500"
        },
        {
            icon: <Shield className="w-7 h-7"/>,
            title: "Secure & Private",
            description: "Your data is encrypted and secure. We never share your information.",
            gradient: "from-rose-500 to-red-500"
        },
        {
            icon: <Smartphone className="w-7 h-7"/>,
            title: "Mobile Friendly",
            description: "Edit and preview your resume on any device, anywhere, anytime.",
            gradient: "from-indigo-500 to-purple-500"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Software Engineer",
            company: "Google",
            content: "This resume builder helped me land my dream job! The templates are modern and the interface is incredibly user-friendly.",
            rating: 5,
            avatar: "SJ"
        },
        {
            name: "Michael Chen",
            role: "Marketing Manager",
            company: "Microsoft",
            content: "I've tried many resume builders, but this one stands out. The live preview feature is a game-changer.",
            rating: 5,
            avatar: "MC"
        },
        {
            name: "Emily Davis",
            role: "UX Designer",
            company: "Apple",
            content: "Beautiful templates and seamless editing experience. Highly recommend to anyone looking for a professional resume.",
            rating: 5,
            avatar: "ED"
        }
    ];

    const stats = [
        {number: "50K+", label: "Resumes Created", icon: <FileText className="w-5 h-5"/>},
        {number: "95%", label: "Success Rate", icon: <TrendingUp className="w-5 h-5"/>},
        {number: "4.9/5", label: "User Rating", icon: <Star className="w-5 h-5"/>},
        {number: "24/7", label: "Support", icon: <Shield className="w-5 h-5"/>}
    ];

    return (
        <div className="w-full min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                <FileText className="w-5 h-5 text-white"/>
                            </div>
                            <span
                                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ResuForge
              </span>
                        </div>
                        {user ? (
                            <ProfileInfoCard/>
                        ) : (
                            <button
                                className="cursor-pointer relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                                onClick={() => setOpenAuthModal(true)}
                            >
                                <span className="relative z-10">Get Started Free</span>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]"></div>

                <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <div
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4"/>
                                Trusted by 50,000+ professionals
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                <span className="text-white">Build Your</span>
                                <span
                                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                  Dream Resume
                </span>
                                <span className="text-white">in Minutes</span>
                            </h1>

                            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                                Create stunning, professional resumes with our AI-powered builder.
                                Stand out from the crowd and land your dream job faster.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                                <button
                                    className="cursor-pointer relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 justify-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50"
                                    onClick={handleCTA}
                                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                  </span>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>

                                <button
                                    className="cursor-pointer border-2 border-slate-700 text-slate-200 px-8 py-4 rounded-full hover:border-slate-600 hover:bg-slate-800/50 transition-all font-semibold text-lg backdrop-blur-sm">
                                    View Templates
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="group">
                                        <div
                                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-purple-500/50 transition-all duration-300">
                                            <div className="flex items-center gap-2 mb-1 text-purple-400">
                                                {stat.icon}
                                                <div className="text-2xl font-bold text-white">{stat.number}</div>
                                            </div>
                                            <div className="text-sm text-slate-400">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative z-10 group">
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <img
                                    src={HERO_IMG}
                                    alt="Resume Builder Preview"
                                    className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-slate-700/50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                            Everything You Need to
                            <span
                                className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
                Succeed
              </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Our powerful features help you create professional resumes that get noticed by employers and
                            ATS systems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div
                                        className={`mb-6 p-3 bg-gradient-to-br ${feature.gradient} rounded-xl w-fit text-white group-hover:scale-110 transition-transform`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-slate-300">Choose the plan that works best for you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Free Plan */}
                        <div className="relative group">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div
                                className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/50 transition-all duration-300">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                                    <div className="flex items-baseline justify-center gap-2 mb-2">
                                        <span className="text-5xl font-bold text-white">₹0</span>
                                    </div>
                                    <p className="text-slate-400">Perfect for getting started</p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "1 Professional Template",
                                        "Basic Editing Tools",
                                        "PDF Download",
                                        "Email Support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div
                                                className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white"/>
                                            </div>
                                            <span className="text-slate-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="cursor-pointer w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-semibold transition-all duration-300"
                                    onClick={handleCTA}
                                >
                                    Get Started Free
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="relative group">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div
                                className="relative bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-300">
                                <div
                                    className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">
                                    POPULAR
                                </div>

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Premium</h3>
                                    <div className="flex items-baseline justify-center gap-2 mb-2">
                                        <span
                                            className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">₹999</span>
                                    </div>
                                    <p className="text-slate-300">Unlock all features</p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "All Premium Templates",
                                        "Advanced Editing Tools",
                                        "Multiple Export Formats",
                                        "Priority Support",
                                        "Custom Branding"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div
                                                className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white"/>
                                            </div>
                                            <span className="text-white">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                                    onClick={handleCTA}
                                >
                                    Upgrade to Premium
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Loved by Professionals</h2>
                        <p className="text-xl text-slate-300">See what our users have to say</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400"/>
                                        ))}
                                    </div>

                                    <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">{testimonial.name}</div>
                                            <div
                                                className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Ready to Build Your Future?</h2>
                    <p className="text-xl mb-8 text-slate-300">Join thousands of professionals who've landed their dream
                        jobs</p>
                    <button
                        className="cursor-pointer relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50"
                        onClick={handleCTA}
                    >
            <span className="relative z-10 flex items-center gap-2">
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </span>
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-800/50 py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                    <FileText className="w-5 h-5 text-white"/>
                                </div>
                                <span
                                    className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ResuForge
                </span>
                            </div>
                            <p className="text-slate-400 mb-6 text-sm">
                                Build professional resumes that get you hired. Trusted by professionals worldwide.
                            </p>
                            <div className="flex space-x-3">
                                {[Users, TrendingUp, Award].map((Icon, i) => (
                                    <div key={i}
                                         className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center hover:bg-slate-700/50 hover:border-purple-500/50 cursor-pointer transition-all duration-300 group">
                                        <Icon
                                            className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4 text-white">Product</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                {["Templates", "Features", "Pricing", "Examples"].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4 text-white">Support</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                {["Help Center", "Contact Us", "FAQ", "Tutorials"].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4 text-white">Company</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                {["About", "Blog", "Careers", "Privacy"].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800/50 pt-8 text-center text-slate-400 text-sm">
                        <p>&copy; 2024 ResuForge. Made with ❤️ for professionals worldwide.</p>
                    </div>
                </div>
            </footer>

            {/* Auth Modal */}
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div>
                    {currentPage === "login" && <Login setCurrentPage={setCurrentPage}/>}
                    {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage}/>}
                </div>
            </Modal>
        </div>
    );
};

export default LandingPage;