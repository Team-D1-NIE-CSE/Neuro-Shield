import React, { useState, useRef } from "react";
import { FiX, FiUpload, FiFileText, FiCalendar, FiTag, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function AchievementForm({ isOpen, onClose, onAdd, type = 'general' }) {
  const [form, setForm] = useState({
    title: "",
    category: "Academics",
    description: "",
    level: "",
    organization: "",
    sub: "",
    date: "",
    skills: []
  });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const categories = {
    general: ['Academics', 'Competitions', 'Certifications', 'Leadership & Volunteering'],
    academic: ['Course Completion', 'Research', 'Publication', 'Thesis', 'Academic Award'],
    competition: ['Hackathon', 'Programming Contest', 'Science Fair', 'Innovation Challenge', 'Case Competition'],
    certification: ['Professional Certification', 'Technical Certification', 'Language Certification', 'Industry Certification'],
    volunteering: ['Community Service', 'Teaching', 'Environmental', 'Social Work', 'Mentoring']
  };

  const levels = ['Local', 'Regional', 'National', 'International'];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const skill = e.target.value.trim();
      if (!form.skills.includes(skill)) {
        setForm(prev => ({
          ...prev,
          skills: [...prev.skills, skill]
        }));
      }
      e.target.value = '';
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDropZoneClick = (e) => {
    if (e.target === dropZoneRef.current && !file) {
      fileInputRef.current?.click();
    }
  };

  function onFile(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
    }
    e.target.value = '';
  }

  // Auto-hide toast after 5 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.title || !form.category || !form.date) {
      setMessage({
        text: "Please fill in all required fields (Title, Category, Date)",
        type: "error"
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Prepare form data including file
    const formData = new FormData();
    formData.append('data', JSON.stringify(form));
    if (file) {
      formData.append('certificate', file);
    }

    try {
      const response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        // Success - verified or pending
        setMessage({
          text: result.message || "Achievement submitted successfully!",
          type: result.verified ? "success" : "pending"
        });

        // Call parent onAdd callback
        if (onAdd && result.data) {
          onAdd(result.data);
        }

        // Close form after successful submission
        setTimeout(() => {
          onClose();
          setIsSubmitted(true);
        }, 1500);

      } else {
        // Server error
        setMessage({
          text: result.message || "Submission failed. Please try again.",
          type: "error"
        });
      }

    } catch (error) {
      console.error('Submission error:', error.message);
      setMessage({
        text: "Network error. Please check your connection and try again.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setForm({
        title: "",
        category: "Academics",
        description: "",
        level: "",
        organization: "",
        sub: "",
        date: "",
        skills: []
      });
      setFile(null);
      setMessage(null);
      setIsLoading(false);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 m-0"
        onClick={handleBackdropClick}
      >
        {/* Modal content */}
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col m-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6 pb-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isSubmitted ? "Success!" : "Add New Achievement"}
                </h2>
                <p className="text-gray-600">
                  {isSubmitted
                    ? "Your achievement has been submitted for review"
                    : "Submit your achievement for verification"
                  }
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Success/Loading State */}
            {isSubmitted && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submission Successful!</h3>
                <p className="text-gray-600">Your achievement will be reviewed shortly.</p>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Verifying your achievement...</p>
                  <p className="text-sm text-gray-500 mt-1">Please wait</p>
                </div>
              </div>
            )}

            {/* Form - only show when not submitted */}
            {!isSubmitted && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achievement Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., First Place in National Coding Championship"
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Provide details about your achievement, challenges overcome, and impact..."
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                      required
                    >
                      <option value="">Select a category</option>
                      {(categories[type] || categories.general).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level
                    </label>
                    <select
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                      <option value="">Select level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization/Institution
                    </label>
                    <input
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="e.g., IEEE, Google, Microsoft"
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <input
                    name="sub"
                    value={form.sub}
                    onChange={handleChange}
                    placeholder="e.g., Grade: A+, Rank: 1st, Team: 4 members"
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Related Skills
                  </label>
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter (e.g., Python, Leadership)"
                    onKeyPress={handleSkillAdd}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 mb-2 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75"
                  />
                  <div className="flex flex-wrap gap-2">
                    {form.skills.length === 0 && !isLoading && (
                      <p className="text-sm text-gray-500 italic">No skills added yet</p>
                    )}
                    {form.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2 border border-blue-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillRemove(skill)}
                          disabled={isLoading}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-0.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove skill"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                  </label>
                  <div
                    ref={dropZoneRef}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${dragActive && !isLoading
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleDropZoneClick}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={onFile}
                      disabled={isLoading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <div className="relative pointer-events-none">
                      <FiUpload className={`w-12 h-12 mx-auto mb-4 transition-colors ${dragActive && !isLoading ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                      <p className={`text-lg font-medium mb-2 transition-colors ${dragActive && !isLoading ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                        {dragActive && !isLoading ? 'Drop your file here' : 'Drag and drop files here, or click to browse'}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        Supported: PDF, JPG, PNG
                      </p>
                      <p className="text-xs text-gray-400">
                        Maximum file size: 10MB
                      </p>
                    </div>
                  </div>

                  {file && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FiFileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          disabled={isLoading}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove file"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 p-3 border-t bg-white sticky bottom-0">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !form.title || !form.category || !form.date}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading
                      ? 'bg-blue-400 cursor-not-allowed text-white opacity-75'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <FiLoader className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Submit for Review'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Toast notification */}
      {message && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 z-[60] max-w-sm flex items-center gap-3 ${message.type === "success"
            ? "bg-green-600"
            : message.type === "pending"
              ? "bg-yellow-500 text-black"
              : "bg-red-600"
            }`}
          style={{
            animation: 'slideInRight 0.3s ease-out forwards',
          }}
        >
          {message.type === "success" && <FiCheckCircle className="w-5 h-5" />}
          {message.type === "pending" && <FiTag className="w-5 h-5" />}
          {message.type === "error" && <FiAlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-2 text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Ensure proper contrast for form elements */
        input:focus,
        textarea:focus,
        select:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Custom scrollbar for webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
}