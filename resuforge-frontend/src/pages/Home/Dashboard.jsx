import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {CirclePlus, FileText, Sparkles, Calendar, Eye} from 'lucide-react';
import moment from 'moment';
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {
    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [allResumes, setAllResumes] = useState(null);

    const fetchAllResumes = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
            setAllResumes(response.data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    const handleResumeCreated = () => {
        fetchAllResumes();
    };

    const handleCloseModal = () => {
        setOpenCreateModal(false);
    };

    useEffect(() => {
        fetchAllResumes();
    }, []);

    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="px-4 md:px-8 py-8 border-b border-slate-800/50">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                                <FileText className="w-6 h-6 text-white"/>
                            </div>
                            Your Resumes
                        </h1>
                        <p className="text-slate-400">
                            {allResumes?.length > 0
                                ? `${allResumes.length} resume${allResumes.length !== 1 ? 's' : ''} created`
                                : 'Create your first resume to get started'
                            }
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenCreateModal(true)}
                        className="hidden md:flex cursor-pointer items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 group"
                    >
                        <CirclePlus className="w-5 h-5"/>
                        <span>New Resume</span>
                    </button>
                </div>
            </div>

            {/* Resumes Grid */}
            <div className="px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Create New Resume Card */}
                    <div
                        className="group relative h-[320px] flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-700 hover:border-purple-500/50 cursor-pointer transition-all duration-300 overflow-hidden"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div
                                className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                                <CirclePlus className="w-8 h-8 text-white"/>
                            </div>

                            <div className="text-center">
                                <h3 className="font-semibold text-lg text-white mb-1">Create New Resume</h3>
                                <p className="text-sm text-slate-400">Start building your perfect resume</p>
                            </div>

                            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                                <Sparkles className="w-4 h-4"/>
                                <span>AI-Powered</span>
                            </div>
                        </div>
                    </div>

                    {/* Existing Resumes */}
                    {allResumes?.map((resume, index) => (
                        <div
                            key={resume?._id || `resume-${index}`}
                            onClick={() => navigate(`/resume/${resume?._id}`)}
                            className="group relative h-[320px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/50 cursor-pointer transition-all duration-300 overflow-hidden"
                        >
                            {/* Gradient Background Effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Thumbnail Section */}
                            <div
                                className="relative h-48 bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-b border-slate-700/50 overflow-hidden">
                                {resume?.thumbnailLink ? (
                                    <>
                                        <img
                                            src={resume.thumbnailLink}
                                            alt={resume.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Overlay on hover */}
                                        <div
                                            className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="flex items-center gap-2 text-white font-medium">
                                                <Eye className="w-5 h-5"/>
                                                <span>View Resume</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-2"/>
                                            <p className="text-xs text-slate-500">No preview available</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="relative p-5">
                                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                    {resume.title || 'Untitled Resume'}
                                </h3>

                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Calendar className="w-4 h-4"/>
                                    <span>
                    {resume?.updatedDate
                        ? `Last updated on ${moment(resume.updatedDate).format("Do MMM YYYY")}`
                        : "No date"
                    }
                  </span>
                                </div>

                                {/* Hover Effect Arrow */}
                                <div
                                    className="absolute bottom-5 right-5 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {allResumes?.length === 0 && (
                    <div className="mt-12 text-center">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full mb-6 border border-slate-700">
                            <FileText className="w-10 h-10 text-slate-500"/>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No resumes yet</h3>
                        <p className="text-slate-400 mb-6 max-w-md mx-auto">
                            Get started by creating your first professional resume. It only takes a few minutes!
                        </p>
                        <button
                            onClick={() => setOpenCreateModal(true)}
                            className="inline-flex cursor-pointer items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            <CirclePlus className="w-5 h-5"/>
                            <span>Create Your First Resume</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile FAB */}
            <button
                onClick={() => setOpenCreateModal(true)}
                className="md:hidden cursor-pointer fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center z-40"
            >
                <CirclePlus className="w-6 h-6"/>
            </button>

            <Modal
                isOpen={openCreateModal}
                onClose={handleCloseModal}
                hideHeader
            >
                <div>
                    <CreateResumeForm
                        onResumeCreated={handleResumeCreated}
                        onClose={handleCloseModal}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default Dashboard;