import React, { useState } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiCheck, FiClock, FiCalendar, FiMapPin, FiUsers, FiAward } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

export default function Competitions() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const competitionsData = [
    {
      id: 1,
      title: "National Coding Championship 2024",
      organizer: "Tech Education Board",
      level: "National",
      position: "2nd Place",
      category: "Programming",
      date: "2024-03-15",
      location: "Delhi, India",
      participants: 500,
      prize: "$2,000",
      verified: true,
      skills: ["Python", "Algorithms", "Problem Solving"],
      description: "A prestigious national-level coding competition focusing on algorithmic problem solving and optimization.",
      certificate: "https://example.com/certificate1.pdf",
      status: "completed"
    },
    {
      id: 2,
      title: "University Hackathon 2024",
      organizer: "University Tech Club",
      level: "University",
      position: "Winner",
      category: "Development",
      date: "2024-02-20",
      location: "Campus Auditorium",
      participants: 120,
      prize: "$500",
      verified: true,
      skills: ["React", "Node.js", "MongoDB"],
      description: "48-hour hackathon focused on developing innovative solutions for campus problems.",
      certificate: "https://example.com/certificate2.pdf",
      status: "completed"
    },
    {
      id: 3,
      title: "International AI Challenge",
      organizer: "Global AI Society",
      level: "International",
      position: "Participant",
      category: "AI/ML",
      date: "2024-01-10",
      location: "Online",
      participants: 1000,
      prize: null,
      verified: false,
      skills: ["Machine Learning", "TensorFlow", "Data Analysis"],
      description: "Global competition focusing on machine learning applications in healthcare.",
      certificate: null,
      status: "pending_verification"
    },
    {
      id: 4,
      title: "Regional Web Development Contest",
      organizer: "State Technical Board",
      level: "Regional",
      position: "3rd Place",
      category: "Web Development",
      date: "2023-12-05",
      location: "Mumbai, India",
      participants: 200,
      prize: "$750",
      verified: true,
      skills: ["JavaScript", "CSS", "React"],
      description: "Regional competition focusing on modern web development practices and responsive design.",
      certificate: "https://example.com/certificate3.pdf",
      status: "completed"
    }
  ];

  const levels = ["all", "International", "National", "Regional", "University", "Local"];
  const statuses = ["all", "completed", "pending_verification", "upcoming"];

  const filteredCompetitions = competitionsData.filter(comp => {
    const levelMatch = filterLevel === "all" || comp.level === filterLevel;
    const statusMatch = filterStatus === "all" || comp.status === filterStatus;
    return levelMatch && statusMatch;
  });

  const getPositionColor = (position) => {
    if (position.includes("1st") || position.includes("Winner")) return "text-yellow-600 bg-yellow-100";
    if (position.includes("2nd")) return "text-gray-600 bg-gray-100";
    if (position.includes("3rd")) return "text-orange-600 bg-orange-100";
    return "text-blue-600 bg-blue-100";
  };

  const getPositionIcon = (position) => {
    if (position.includes("1st") || position.includes("Winner")) return FaTrophy;
    if (position.includes("2nd") || position.includes("3rd")) return FiAward;
    return FiAward;
  };

  const stats = {
    total: competitionsData.length,
    won: competitionsData.filter(c => c.position.includes("1st") || c.position.includes("Winner")).length,
    podium: competitionsData.filter(c => c.position.includes("1st") || c.position.includes("2nd") || c.position.includes("3rd") || c.position.includes("Winner")).length,
    verified: competitionsData.filter(c => c.verified).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competition Achievements</h1>
          <p className="text-gray-600">Track your competitive programming and contest achievements</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          Add Competition
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Competitions</div>
            </div>
            <FiAward className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.won}</div>
              <div className="text-sm text-gray-600">First Places</div>
            </div>
            <FaTrophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.podium}</div>
              <div className="text-sm text-gray-600">Podium Finishes</div>
            </div>
            <FiAward className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <FiCheck className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Level</label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === "all" ? "All Levels" : level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-auto">
            <div className="text-sm text-gray-600">
              Showing {filteredCompetitions.length} of {competitionsData.length} competitions
            </div>
          </div>
        </div>
      </div>

      {/* Competitions List */}
      <div className="space-y-6">
        {filteredCompetitions.map((competition) => {
          const PositionIcon = getPositionIcon(competition.position);
          return (
            <div key={competition.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getPositionColor(competition.position).split(' ')[1]}`}>
                    <PositionIcon className={`w-6 h-6 ${getPositionColor(competition.position).split(' ')[0]}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{competition.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{competition.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiUsers className="w-4 h-4" />
                        <span>{competition.organizer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        <span>{new Date(competition.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4" />
                        <span>{competition.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiUsers className="w-4 h-4" />
                        <span>{competition.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {competition.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPositionColor(competition.position)}`}>
                    {competition.position}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    competition.level === 'International' ? 'bg-purple-100 text-purple-700' :
                    competition.level === 'National' ? 'bg-red-100 text-red-700' :
                    competition.level === 'Regional' ? 'bg-blue-100 text-blue-700' :
                    competition.level === 'University' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {competition.level}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  {competition.prize && (
                    <span className="text-sm font-medium text-green-600">
                      Prize: {competition.prize}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    Category: {competition.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {competition.verified ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <FiCheck className="w-4 h-4" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 text-sm">
                      <FiClock className="w-4 h-4" />
                      Pending Verification
                    </span>
                  )}
                  
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                    {competition.certificate && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Competition Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Competition Achievement</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Competition Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., National Coding Championship"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Tech Education Board"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option value="">Select Level</option>
                    <option value="International">International</option>
                    <option value="National">National</option>
                    <option value="Regional">Regional</option>
                    <option value="University">University</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position/Result</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 1st Place, Winner, Participant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Delhi, India or Online"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Brief description of the competition..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Programming, Design, AI/ML"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prize (Optional)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., $1000, Medal, Certificate"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills Demonstrated</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Python, Algorithms, Problem Solving (comma separated)"
                />
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
                  Add Competition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
