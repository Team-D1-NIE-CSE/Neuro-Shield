import React, { useState } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiCheck, FiClock, FiStar, FiTrendingUp, FiCalendar } from "react-icons/fi";

export default function Academics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);

  const academicData = {
    currentOverallScore: 8.6,
    creditHours: 120,
    expectedGraduation: "May 2025",
    classRank: "15/200",
    semesters: [
      {
        id: 1,
        name: "Fall 2023",
        gpa: 8.8,
        status: "completed",
        courses: [
          { name: "Data Structures & Algorithms", code: "CS301", grade: "A", credits: 4, verified: true },
          { name: "Database Management Systems", code: "CS302", grade: "A-", credits: 3, verified: true },
          { name: "Computer Networks", code: "CS303", grade: "B+", credits: 3, verified: true },
          { name: "Software Engineering", code: "CS304", grade: "A", credits: 4, verified: true },
        ]
      },
      {
        id: 2,
        name: "Spring 2024",
        gpa: 8.4,
        status: "completed",
        courses: [
          { name: "Machine Learning", code: "CS401", grade: "A", credits: 4, verified: true },
          { name: "Web Development", code: "CS402", grade: "A-", credits: 3, verified: true },
          { name: "Operating Systems", code: "CS403", grade: "B+", credits: 4, verified: true },
          { name: "Ethics in Computing", code: "CS404", grade: "A", credits: 2, verified: true },
        ]
      },
      {
        id: 3,
        name: "Fall 2024",
        gpa: null,
        status: "current",
        courses: [
          { name: "Artificial Intelligence", code: "CS501", grade: null, credits: 4, verified: false },
          { name: "Distributed Systems", code: "CS502", grade: null, credits: 3, verified: false },
          { name: "Cybersecurity", code: "CS503", grade: null, credits: 3, verified: false },
          { name: "Research Methods", code: "CS504", grade: null, credits: 2, verified: false },
        ]
      }
    ],
    achievements: [
      { id: 1, title: "Dean's List", semester: "Fall 2023", verified: true, type: "honor" },
      { id: 2, title: "Academic Excellence Award", semester: "Spring 2024", verified: true, type: "award" },
      { id: 3, title: "Outstanding CS Student", semester: "Spring 2024", verified: false, type: "nomination" },
    ]
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses & Grades" },
    { id: "achievements", label: "Academic Achievements" },
    { id: "transcripts", label: "Transcripts & Verification" },
  ];

  const getGradeColor = (grade) => {
    if (!grade) return "text-gray-400";
    if (grade === "A" || grade === "A+") return "text-green-600";
    if (grade === "A-" || grade === "B+") return "text-blue-600";
    if (grade === "B" || grade === "B-") return "text-yellow-600";
    return "text-red-600";
  };

  const calculateCumulativeGPA = () => {
    const completedSemesters = academicData.semesters.filter(s => s.status === 'completed');
    const totalGPA = completedSemesters.reduce((sum, sem) => sum + sem.gpa, 0);
    return (totalGPA / completedSemesters.length).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Records</h1>
          <p className="text-gray-600">Track your academic achievements and course progress</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="w-4 h-4" />
            Add Course
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FiCalendar className="w-4 h-4" />
            Academic Calendar
          </button>
        </div>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{academicData.currentOverallScore}</div>
              <div className="text-sm text-gray-600">Current Overall Score</div>
            </div>
            <FiStar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{academicData.creditHours}</div>
              <div className="text-sm text-gray-600">Credit Hours</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{academicData.classRank}</div>
              <div className="text-sm text-gray-600">Class Rank</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-orange-600">{academicData.expectedGraduation}</div>
              <div className="text-sm text-gray-600">Expected Graduation</div>
            </div>
            <FiCalendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* GPA Trend */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Score Trend</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {academicData.semesters.map((semester) => (
                    <div key={semester.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{semester.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          semester.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : semester.status === 'current'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {semester.status === 'completed' ? 'Completed' : semester.status === 'current' ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${semester.gpa ? 'text-blue-600' : 'text-gray-400'}`}>
                          {semester.gpa || 'TBD'}
                        </div>
                        <div className="text-sm text-gray-600">Semester Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Academic Achievements</h3>
                <div className="space-y-3">
                  {academicData.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          achievement.type === 'honor' ? 'bg-yellow-100' :
                          achievement.type === 'award' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          <FiStar className={`w-4 h-4 ${
                            achievement.type === 'honor' ? 'text-yellow-600' :
                            achievement.type === 'award' ? 'text-green-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{achievement.title}</div>
                          <div className="text-sm text-gray-600">{achievement.semester}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {achievement.verified ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <FiCheck className="w-4 h-4" />
                            Verified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600 text-sm">
                            <FiClock className="w-4 h-4" />
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses & Grades Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {academicData.semesters.map((semester) => (
                <div key={semester.id} className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-6 py-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{semester.name}</h3>
                      <div className="flex items-center gap-4">
                        {semester.gpa && (
                          <span className="text-sm text-gray-600">
                            Semester Score: <span className="font-semibold text-blue-600">{semester.gpa}</span>
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          semester.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : semester.status === 'current'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {semester.status === 'completed' ? 'Completed' : semester.status === 'current' ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {semester.courses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{course.name}</div>
                              <div className="text-sm text-gray-600">{course.code} • {course.credits} credits</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getGradeColor(course.grade)}`}>
                                {course.grade || 'In Progress'}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {course.verified ? (
                                <span className="flex items-center gap-1 text-green-600 text-sm">
                                  <FiCheck className="w-4 h-4" />
                                  Verified
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-yellow-600 text-sm">
                                  <FiClock className="w-4 h-4" />
                                  Pending
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button className="text-gray-400 hover:text-gray-600">
                              <FiEdit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Academic Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Academic Honors & Awards</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FiPlus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {academicData.achievements.map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-full ${
                        achievement.type === 'honor' ? 'bg-yellow-100' :
                        achievement.type === 'award' ? 'bg-green-100' :
                        'bg-blue-100'
                      }`}>
                        <FiStar className={`w-6 h-6 ${
                          achievement.type === 'honor' ? 'text-yellow-600' :
                          achievement.type === 'award' ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
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
                    <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{achievement.semester}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        achievement.type === 'honor' ? 'bg-yellow-100 text-yellow-700' :
                        achievement.type === 'award' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {achievement.type}
                      </span>
                      {achievement.verified ? (
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transcripts & Verification Tab */}
          {activeTab === "transcripts" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Official Transcripts</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Official Transcript - Fall 2023</h4>
                        <p className="text-sm text-gray-600">Generated on December 15, 2023</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <FiCheck className="w-4 h-4" />
                          Verified
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Official Transcript - Spring 2024</h4>
                        <p className="text-sm text-gray-600">Generated on May 20, 2024</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <FiCheck className="w-4 h-4" />
                          Verified
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FiCheck className="w-6 h-6 text-green-600" />
                    <h4 className="font-medium text-green-900">Academic Records Verified</h4>
                  </div>
                  <p className="text-green-700 text-sm mb-4">
                    Your academic records have been verified by the university registrar's office. 
                    All grades and achievements shown are officially validated.
                  </p>
                  <div className="text-xs text-green-600">
                    Last verified: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
