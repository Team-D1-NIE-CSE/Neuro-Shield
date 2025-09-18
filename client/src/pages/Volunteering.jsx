import React, { useState } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiCheck, FiClock, FiHeart, FiCalendar, FiMapPin, FiUsers, FiClock as FiTime } from "react-icons/fi";

export default function Volunteering() {
  const [showAddForm, setShowAddForm] = useState(false);

  const volunteeringData = [
    {
      id: 1,
      organization: "Code for Good",
      role: "Volunteer Developer",
      cause: "Education Technology",
      startDate: "2023-09-01",
      endDate: "2024-03-01",
      hoursContributed: 120,
      description: "Developed a learning management system for underprivileged students, enabling access to quality educational resources.",
      skills: ["React", "Node.js", "MongoDB", "UI/UX"],
      impact: "Served 200+ students, improved learning outcomes by 40%",
      verified: true,
      status: "completed",
      location: "Remote"
    },
    {
      id: 2,
      organization: "Local Animal Shelter",
      role: "Web Development Volunteer",
      cause: "Animal Welfare",
      startDate: "2023-06-15",
      endDate: "2023-08-30",
      hoursContributed: 80,
      description: "Created a modern website and adoption portal to help animals find loving homes faster.",
      skills: ["WordPress", "CSS", "JavaScript", "Photography"],
      impact: "Increased adoption rate by 25%, improved online presence",
      verified: true,
      status: "completed",
      location: "New York, NY"
    },
    {
      id: 3,
      organization: "Tech for Seniors",
      role: "Digital Literacy Instructor",
      cause: "Senior Care",
      startDate: "2024-01-01",
      endDate: null,
      hoursContributed: 60,
      description: "Teaching elderly community members how to use smartphones, tablets, and essential digital services.",
      skills: ["Teaching", "Communication", "Patience", "Technology"],
      impact: "Taught 30+ seniors, improved their digital independence",
      verified: false,
      status: "ongoing",
      location: "Community Center, NY"
    }
  ];

  const stats = {
    totalHours: volunteeringData.reduce((sum, vol) => sum + vol.hoursContributed, 0),
    organizations: volunteeringData.length,
    ongoing: volunteeringData.filter(v => v.status === 'ongoing').length,
    verified: volunteeringData.filter(v => v.verified).length
  };

  const causes = ["Education", "Environment", "Healthcare", "Technology", "Animal Welfare", "Senior Care", "Community Development"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Experience</h1>
          <p className="text-gray-600">Track your community service and social impact activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          Add Volunteer Experience
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.totalHours}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
            <FiTime className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.organizations}</div>
              <div className="text-sm text-gray-600">Organizations</div>
            </div>
            <FiUsers className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.ongoing}</div>
              <div className="text-sm text-gray-600">Ongoing Projects</div>
            </div>
            <FiHeart className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <FiCheck className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Community Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">200+</div>
            <div className="text-sm text-gray-600">People Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">3</div>
            <div className="text-sm text-gray-600">Different Causes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">65%</div>
            <div className="text-sm text-gray-600">Average Improvement</div>
          </div>
        </div>
      </div>

      {/* Volunteer Experiences List */}
      <div className="space-y-6">
        {volunteeringData.map((volunteer) => (
          <div key={volunteer.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FiHeart className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{volunteer.role}</h3>
                  <p className="text-purple-600 font-medium mb-2">{volunteer.organization}</p>
                  <p className="text-gray-600 text-sm mb-4">{volunteer.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>
                        {new Date(volunteer.startDate).toLocaleDateString()} - 
                        {volunteer.endDate ? new Date(volunteer.endDate).toLocaleDateString() : 'Present'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{volunteer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiTime className="w-4 h-4" />
                      <span>{volunteer.hoursContributed} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Cause: {volunteer.cause}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {volunteer.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Impact */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="font-medium text-green-900 mb-1">Impact Achieved:</h4>
                    <p className="text-green-700 text-sm">{volunteer.impact}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  volunteer.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                  volunteer.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {volunteer.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {volunteer.verified ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <FiCheck className="w-4 h-4" />
                    Verified by Organization
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-600 text-sm">
                    <FiClock className="w-4 h-4" />
                    Pending Verification
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <FiEdit3 className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Volunteer Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Volunteer Experience</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Red Cross, Local Food Bank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Volunteer Coordinator, Tutor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cause/Area</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option value="">Select Cause</option>
                    {causes.map(cause => (
                      <option key={cause} value={cause}>{cause}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., New York, NY or Remote"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty if ongoing</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Describe your volunteer work and responsibilities..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours Contributed</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills Used</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Teaching, Leadership, Programming"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact & Achievements</label>
                <textarea
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Describe the impact of your volunteer work..."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
