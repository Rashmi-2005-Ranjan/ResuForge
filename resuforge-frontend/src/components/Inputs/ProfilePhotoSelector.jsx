import { User, Upload, Trash } from "lucide-react";
import {useRef, useState} from "react";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
      <div className="flex justify-center mb-6">
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ? (
            <div className="relative group">
              <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-full relative cursor-pointer group-hover:border-purple-500 transition-all duration-300">
                <User className="w-10 h-10 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>

              <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110"
                  onClick={onChooseFile}
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
        ) : (
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/30 overflow-hidden">
                <img
                    src={preview || previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
              </div>

              <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg hover:shadow-red-500/50 transition-all duration-300 group-hover:scale-110"
                  onClick={handleRemoveImage}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
        )}
      </div>
  );
};

export default ProfilePhotoSelector;