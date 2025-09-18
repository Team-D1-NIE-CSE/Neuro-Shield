import React, { useState } from "react";
import { FiUser, FiBell, FiShield, FiEye, FiDatabase, FiHelpCircle, FiCheck, FiX } from "react-icons/fi";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    achievements: true,
    reminders: false,
    updates: true,
    marketing: false
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showGPA: true,
    showAchievements: true,
    allowSearch: true,
    showContact: false
  });

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: FiUser },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "privacy", label: "Privacy & Sharing", icon: FiShield },
    { id: "appearance", label: "Appearance", icon: FiEye },
    { id: "data", label: "Data & Export", icon: FiDatabase },
    { id: "help", label: "Help & Support", icon: FiHelpCircle }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Alex Johnson"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="alex.johnson@university.edu"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                      <option>Computer Science</option>
                      <option>Engineering</option>
                      <option>Business</option>
                      <option>Liberal Arts</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Passionate computer science student with interests in AI and machine learning. Active in coding competitions and community service."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          notifications.email ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Achievement Updates</h3>
                      <p className="text-sm text-gray-600">Get notified when achievements are verified</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('achievements')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.achievements ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          notifications.achievements ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Submission Reminders</h3>
                      <p className="text-sm text-gray-600">Reminders for pending submissions</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('reminders')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.reminders ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          notifications.reminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Platform Updates</h3>
                      <p className="text-sm text-gray-600">News about new features and improvements</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('updates')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.updates ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          notifications.updates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketing Communications</h3>
                      <p className="text-sm text-gray-600">Promotional emails and surveys</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('marketing')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.marketing ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Sharing */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Privacy & Sharing Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Profile Visibility</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="profileVisibility"
                          checked={privacy.profileVisibility === 'public'}
                          onChange={() => handlePrivacyChange('profileVisibility', 'public')}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Public</div>
                          <div className="text-sm text-gray-600">Anyone can view your profile</div>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="profileVisibility"
                          checked={privacy.profileVisibility === 'university'}
                          onChange={() => handlePrivacyChange('profileVisibility', 'university')}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">University Only</div>
                          <div className="text-sm text-gray-600">Only university members can view</div>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="profileVisibility"
                          checked={privacy.profileVisibility === 'private'}
                          onChange={() => handlePrivacyChange('profileVisibility', 'private')}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Private</div>
                          <div className="text-sm text-gray-600">Only you can view your profile</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Information Sharing</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Show GPA</div>
                          <div className="text-sm text-gray-600">Display GPA on public profile</div>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('showGPA', !privacy.showGPA)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy.showGPA ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              privacy.showGPA ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Show Achievements</div>
                          <div className="text-sm text-gray-600">Display achievements on public profile</div>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('showAchievements', !privacy.showAchievements)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy.showAchievements ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              privacy.showAchievements ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Allow Search</div>
                          <div className="text-sm text-gray-600">Let others find you in search results</div>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('allowSearch', !privacy.allowSearch)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy.allowSearch ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              privacy.allowSearch ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500">
                        <div className="w-full h-20 bg-white border rounded mb-2"></div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      <div className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500">
                        <div className="w-full h-20 bg-gray-800 rounded mb-2"></div>
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                      <div className="border border-blue-500 bg-blue-50 rounded-lg p-4 text-center cursor-pointer">
                        <div className="w-full h-20 bg-gradient-to-br from-white to-gray-100 border rounded mb-2"></div>
                        <span className="text-sm font-medium text-blue-600">Auto</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Language</h3>
                    <select className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Export */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-2">Export Your Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of all your data including achievements, academic records, and portfolio information.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Export Data
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-2">Data Backup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Your data is automatically backed up daily. Last backup: Today at 3:00 AM
                    </p>
                    <div className="flex items-center text-green-600">
                      <FiCheck className="w-4 h-4 mr-2" />
                      <span className="text-sm">All data backed up successfully</span>
                    </div>
                  </div>

                  <div className="border border-red-200 bg-red-50 rounded-lg p-6">
                    <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support */}
            {activeTab === "help" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <FiHelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">FAQ</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Find answers to commonly asked questions
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View FAQ
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <FiBell className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">Contact Support</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get help from our support team
                      </p>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        Contact Us
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">System Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Version:</span>
                        <span className="ml-2 font-medium">2.1.0</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="ml-2 font-medium">March 15, 2024</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Browser:</span>
                        <span className="ml-2 font-medium">Chrome 122.0.0</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Platform:</span>
                        <span className="ml-2 font-medium">Windows 11</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
