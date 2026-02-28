import {MapPin, Mail, Phone, Linkedin, Github, Globe} from 'lucide-react';

const ContactInfoForm = ({contactInfo, updateSection}) => {
    const inputClass = "w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-500";

    const fields = [
        {
            label: "Address",
            placeholder: "Short Address",
            type: "text",
            key: "location",
            icon: <MapPin className="w-4 h-4 text-slate-500"/>,
            colSpan: "md:col-span-2",
            onChange: (val) => updateSection("location", val.replace(/[^a-zA-Z0-9\s,.\-#\/]/g, '')),
            maxLength: 100,
        },
        {
            label: "Email",
            placeholder: "john@example.com",
            type: "email",
            key: "email",
            icon: <Mail className="w-4 h-4 text-slate-500"/>,
            onChange: (val) => updateSection("email", val),
        },
        {
            label: "Phone Number",
            placeholder: "9876543210",
            type: "tel",
            key: "phone",
            icon: <Phone className="w-4 h-4 text-slate-500"/>,
            onChange: (val) => updateSection("phone", val.replace(/[^0-9\s\-\(\)\+]/g, '')),
            maxLength: 15,
        },
        {
            label: "LinkedIn",
            placeholder: "https://linkedin.com/in/username",
            type: "text",
            key: "linkedIn",
            icon: <Linkedin className="w-4 h-4 text-slate-500"/>,
            onChange: (val) => updateSection("linkedIn", val),
        },
        {
            label: "GitHub",
            placeholder: "https://github.com/username",
            type: "text",
            key: "github",
            icon: <Github className="w-4 h-4 text-slate-500"/>,
            onChange: (val) => updateSection("github", val),
        },
        {
            label: "Portfolio / Website",
            placeholder: "https://yourwebsite.com",
            type: "text",
            key: "website",
            icon: <Globe className="w-4 h-4 text-slate-500"/>,
            colSpan: "md:col-span-2",
            onChange: (val) => updateSection("website", val),
        },
    ];

    return (
        <div className="px-5 pt-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Phone className="w-4 h-4 text-white"/>
                </div>
                <h2 className="text-lg font-semibold text-white">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div key={field.key} className={field.colSpan || ""}>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            {field.label}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {field.icon}
                            </div>
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                value={contactInfo[field.key] || ""}
                                onChange={({target}) => field.onChange(target.value)}
                                maxLength={field.maxLength}
                                className={inputClass}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactInfoForm;