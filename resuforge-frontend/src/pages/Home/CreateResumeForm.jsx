import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { FileText, Plus, AlertCircle, ArrowRight } from 'lucide-react';

const CreateResumeForm = ({ onResumeCreated, onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter resume title");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        onClose && onClose();
        onResumeCreated && onResumeCreated();
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-[90vw] md:w-[500px] p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Create New Resume</h3>
          <p className="text-sm text-slate-400">
            Give your resume a title to get started. You can edit all details later.
          </p>
        </div>

        <form onSubmit={handleCreateResume} className="space-y-5">
          {/* Resume Title Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resume Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileText className="w-5 h-5 text-slate-500" />
              </div>
              <input
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  placeholder="e.g., Software Engineer Resume"
                  type="text"
                  disabled={isLoading}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
          )}

          {/* Submit Button */}
          <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
            ) : (
                <>
                  <span>Create Resume</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
            )}
          </button>

          {/* Cancel Button */}
          <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </form>
      </div>
  );
};

export default CreateResumeForm;