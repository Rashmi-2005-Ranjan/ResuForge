import React from "react";
import {X} from "lucide-react";

const Modal = ({
                   children,
                   isOpen,
                   onClose,
                   title,
                   hideHeader,
                   showActionBtn,
                   actionBtnIcon = null,
                   actionBtnText,
                   onActionClick,
                   showSecondaryActionBtn,
                   secondaryActionBtnIcon = null,
                   secondaryActionBtnText,
                   onSecondaryActionClick,
                   priority = "normal", // Add priority prop: "normal" or "high"
               }) => {
    if (!isOpen) return null;

    const zIndexMap = {
        normal: 99999,
        high: 999999,
    };

    const modalZIndex = zIndexMap[priority] || zIndexMap.normal;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center w-full h-full bg-slate-950/90 backdrop-blur-sm"
            style={{zIndex: modalZIndex}}
        >
            {/* Modal Content */}
            <div
                className="relative flex flex-col bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden max-h-[95vh] max-w-[95vw]">

                {/* Close Button - Now absolute, positioned inside modal */}
                <button
                    type="button"
                    className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/95 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-all duration-200 shadow-lg backdrop-blur-sm hover:scale-105 cursor-pointer"
                    onClick={onClose}
                >
                    <X className="w-5 h-5"/>
                </button>

                {/* Modal Header */}
                {!hideHeader && (
                    <div
                        className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 flex-shrink-0">
                        <h3 className="md:text-lg font-semibold text-white pr-12">{title}</h3>

                        <div className="flex items-center gap-3 pr-12">
                            {showSecondaryActionBtn && (
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
                                    onClick={() => onSecondaryActionClick()}
                                >
                                    {secondaryActionBtnIcon}
                                    {secondaryActionBtnText}
                                </button>
                            )}

                            {showActionBtn && (
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                                    onClick={() => onActionClick()}
                                >
                                    {actionBtnIcon}
                                    {actionBtnText}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;