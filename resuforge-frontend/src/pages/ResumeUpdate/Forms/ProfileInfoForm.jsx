import React from 'react';
import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector";
import { User, Briefcase, FileText } from 'lucide-react';

const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
      <div className="px-5 pt-5">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">Personal Information</h2>
        </div>

        <div className="space-y-5">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <ProfilePhotoSelector
                image={profileData?.profileImg || profileData?.profilePreviewUrl}
                setImage={(value) => updateSection("profileImg", value)}
                preview={profileData?.profilePreviewUrl}
                setPreview={(value) => updateSection("profilePreviewUrl", value)}
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <input
                    value={profileData.fullName || ""}
                    onChange={({ target }) => updateSection("fullName", target.value)}
                    placeholder="John Doe"
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Designation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                </div>
                <input
                    value={profileData.designation || ""}
                    onChange={({ target }) => updateSection("designation", target.value)}
                    placeholder="UI Designer"
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Summary
              </label>
              <textarea
                  placeholder="Write a short professional introduction about yourself..."
                  rows={4}
                  value={profileData.summary || ""}
                  onChange={({ target }) => updateSection("summary", target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileInfoForm;