import React, { useState } from "react";
import { FiEdit3, FiCheck, FiX, FiUpload, FiStar, FiMapPin, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Sharath Chandra N",
    email: "sharathchandran.nie.ac.in",
    phone: "+91 ",
    studentId: "ST123456",
    department: "Computer Science",
    year: "3rd Year",
    overallScore: 8.6,
    location: "Mysuru, Karnataka",
    bio: "Passionate computer science student with interests in AI and machine learning. Active in coding competitions and community service.",
    skills: ["Python", "JavaScript", "Machine Learning", "Data Analysis", "React"],
    verified: true,
    completionScore: 85
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-600">Manage your verified academic profile</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiEdit3 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FiCheck className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </div>
                {profileData.verified && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700">
                    <FiUpload className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <input
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-xl font-bold text-center w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
              )}

              <p className="text-gray-600 mt-1">{profileData.department}</p>
              <p className="text-sm text-gray-500">{profileData.year} • Student ID: {profileData.studentId}</p>

              {/* Profile Completion */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-bold text-blue-600">{profileData.completionScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${profileData.completionScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <FiStar className="w-5 h-5 text-yellow-500" />
                  <span className="text-lg font-bold text-blue-600">{profileData.overallScore}</span>
                  <span className="text-sm text-gray-600">Overall Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-gray-500" />
                  {isEditing ? (
                    <input
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-gray-500" />
                  {isEditing ? (
                    <input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-5 h-5 text-gray-500" />
                  {isEditing ? (
                    <input
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.location}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Biography</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 outline-none resize-none"
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {isEditing && (
                  <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-blue-500 hover:text-blue-500">
                    + Add Skill
                  </button>
                )}
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">Student Identity Verified</span>
                  </div>
                  <span className="text-sm text-green-600">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">Academic Records Verified</span>
                  </div>
                  <span className="text-sm text-green-600">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-700">Professional References</span>
                  </div>
                  <span className="text-sm text-yellow-600">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
