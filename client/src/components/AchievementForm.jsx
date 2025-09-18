import React, { useState } from "react";
import { FiX, FiUpload, FiFileText, FiCalendar, FiTag } from "react-icons/fi";

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
  const [message, setMessage] = useState(null); // for toast replacement

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

  function onFile(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!form.title) {
      setMessage({ text: "Title required", type: "warning" });
      return;
    }
    const newAch = {
      id: Date.now().toString(),
      ...form,
      status: "Pending",
      certificate: file
        ? { name: file.name, url: URL.createObjectURL(file) }
        : null,
    };
    onAdd(newAch);
    setForm({ title: "", category: "Academics", description: "", level: "", organization: "", sub: "", date: "", skills: [] });
    setFile(null);
    onClose();
    setMessage({ text: "Achievement submitted for review", type: "success" });
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        {/* Modal content */}
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Achievement</h2>
                <p className="text-gray-600">Submit your achievement for verification</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., First Place in National Coding Championship"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="Grade, rank, team members, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Skills
                </label>
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  onKeyPress={handleSkillAdd}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {form.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="text-blue-500 hover:text-blue-700"
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
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported: PDF, JPG, PNG (Max 10MB each)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={onFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {file && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FiFileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)}MB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Simple toast replacement */}
      {message && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white transition ${
            message.type === "success"
              ? "bg-green-600"
              : "bg-yellow-500 text-black"
          }`}
        >
          {message.text}
        </div>
      )}
    </>
  );
}
