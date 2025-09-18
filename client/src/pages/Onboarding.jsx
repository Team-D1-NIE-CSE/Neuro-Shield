import React, { useState } from "react";
import { FiCheck, FiChevronRight, FiChevronLeft, FiUser, FiBook, FiAward, FiUpload } from "react-icons/fi";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    // Step 2: Academic Info
    department: "",
    year: "",
    enrollmentDate: "",
    // Step 3: Achievements
    achievements: [],
    // Step 4: Preferences
    notifications: {
      email: true,
      achievements: true,
      reminders: true
    },
    privacy: "university"
  });

  const steps = [
    {
      id: 0,
      title: "Personal Information",
      description: "Let's start with your basic information",
      icon: FiUser
    },
    {
      id: 1,
      title: "Academic Details",
      description: "Tell us about your academic background",
      icon: FiBook
    },
    {
      id: 2,
      title: "Initial Achievements",
      description: "Add your existing achievements (optional)",
      icon: FiAward
    },
    {
      id: 3,
      title: "Preferences & Privacy",
      description: "Customize your experience",
      icon: FiUpload
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Handle onboarding completion
    console.log("Onboarding completed:", formData);
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.email && formData.studentId;
      case 1:
        return formData.department && formData.year;
      case 2:
        return true; // Optional step
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to StudentHub</h1>
            <p className="text-gray-600">Let's set up your verified academic profile in just a few steps</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    index <= currentStep 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {index < currentStep ? (
                      <FiCheck className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-4 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div key={step.id} className="text-center" style={{ width: index === 0 || index === steps.length - 1 ? "auto" : "20%" }}>
                  <div className="font-medium text-gray-900 text-sm">{step.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FiUser className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900">{steps[0].title}</h2>
                  <p className="text-gray-600 mt-2">{steps[0].description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your student ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your university email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FiBook className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900">{steps[1].title}</h2>
                  <p className="text-gray-600 mt-2">{steps[1].description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select your department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="Liberal Arts">Liberal Arts</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Law">Law</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Year *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select your current year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Graduate">Graduate Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Date</label>
                    <input
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Initial Achievements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FiAward className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900">{steps[2].title}</h2>
                  <p className="text-gray-600 mt-2">You can add these later, but starting with some achievements helps build your profile</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add Your First Achievement</h3>
                  <p className="text-gray-600 mb-4">Upload certificates, competition results, or academic honors</p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Files
                  </button>
                  <p className="text-sm text-gray-500 mt-2">Or you can skip this step and add achievements later</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-3">Quick Add Common Achievements:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Dean's List", "Academic Scholarship", "Honor Society", "Research Project", "Internship", "Volunteer Work"].map((achievement) => (
                      <button
                        key={achievement}
                        className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-sm">{achievement}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FiUpload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900">{steps[3].title}</h2>
                  <p className="text-gray-600 mt-2">{steps[3].description}</p>
                </div>

                <div className="space-y-6">
                  {/* Privacy Settings */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="privacy"
                          value="public"
                          checked={formData.privacy === "public"}
                          onChange={(e) => handleInputChange('privacy', e.target.value)}
                          className="mr-4"
                        />
                        <div>
                          <div className="font-medium">Public</div>
                          <div className="text-sm text-gray-600">Anyone can view your achievements and portfolio</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="privacy"
                          value="university"
                          checked={formData.privacy === "university"}
                          onChange={(e) => handleInputChange('privacy', e.target.value)}
                          className="mr-4"
                        />
                        <div>
                          <div className="font-medium">University Only (Recommended)</div>
                          <div className="text-sm text-gray-600">Only university members and verified organizations can view</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="privacy"
                          value="private"
                          checked={formData.privacy === "private"}
                          onChange={(e) => handleInputChange('privacy', e.target.value)}
                          className="mr-4"
                        />
                        <div>
                          <div className="font-medium">Private</div>
                          <div className="text-sm text-gray-600">Only you can view your profile</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-600">Receive updates via email</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.notifications.email}
                          onChange={(e) => handleInputChange('notifications', { ...formData.notifications, email: e.target.checked })}
                          className="w-5 h-5 text-blue-600"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium">Achievement Verification</div>
                          <div className="text-sm text-gray-600">Get notified when achievements are verified</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.notifications.achievements}
                          onChange={(e) => handleInputChange('notifications', { ...formData.notifications, achievements: e.target.checked })}
                          className="w-5 h-5 text-blue-600"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium">Submission Reminders</div>
                          <div className="text-sm text-gray-600">Reminders for pending submissions</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.notifications.reminders}
                          onChange={(e) => handleInputChange('notifications', { ...formData.notifications, reminders: e.target.checked })}
                          className="w-5 h-5 text-blue-600"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FiChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FiCheck className="w-4 h-4" />
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
