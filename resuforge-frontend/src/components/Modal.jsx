import React from "react";
import { X } from "lucide-react";

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
               }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-slate-950/80 backdrop-blur-sm">
        {/* Modal Content */}
        <div className="relative flex flex-col bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden">

          {/* Modal Header */}
          {!hideHeader && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
                <h3 className="md:text-lg font-semibold text-white">{title}</h3>

                <div className="flex items-center gap-3 mr-10">
                  {showSecondaryActionBtn && (
                      <button
                          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-all duration-200"
                          onClick={() => onSecondaryActionClick()}
                      >
                        {secondaryActionBtnIcon}
                        {secondaryActionBtnText}
                      </button>
                  )}

                  {showActionBtn && (
                      <button
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30"
                          onClick={() => onActionClick()}
                      >
                        {actionBtnIcon}
                        {actionBtnText}
                      </button>
                  )}
                </div>
              </div>
          )}

          {/* Close Button */}
          <button
              type="button"
              className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 text-slate-400 hover:text-white transition-all duration-200"
              onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
  );
};

export default Modal;