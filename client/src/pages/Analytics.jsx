import React, { useState } from "react";
import { FiTrendingUp, FiUsers, FiAward, FiBook, FiBarChart, FiPieChart, FiDownload, FiFilter, FiCalendar } from "react-icons/fi";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("student");
  const [dateRange, setDateRange] = useState("semester");
  const [viewType, setViewType] = useState("individual");

  const analyticsData = {
    individual: {
      overallScoreProgress: [
        { semester: "Fall 2022", overallScore: 7.8 },
        { semester: "Spring 2023", overallScore: 8.2 },
        { semester: "Fall 2023", overallScore: 8.8 },
        { semester: "Spring 2024", overallScore: 8.4 },
      ],
      achievements: {
        total: 24,
        academic: 8,
        competitions: 6,
        certifications: 5,
        volunteering: 5,
      },
      skillsProgress: [
        { skill: "Programming", level: 85, change: +5 },
        { skill: "Leadership", level: 78, change: +12 },
        { skill: "Communication", level: 82, change: +3 },
        { skill: "Problem Solving", level: 90, change: +8 },
      ],
      engagementScore: 87,
      portfolioViews: 156,
      recommendationRequests: 8,
    },
    institutional: {
      totalStudents: 1250,
      averageOverallScore: 7.8,
      verificationRate: 94,
      portfolioCompletionRate: 78,
      departments: [
        { name: "Computer Science", students: 320, avgOverallScore: 8.2, completionRate: 85 },
        { name: "Engineering", students: 450, avgOverallScore: 7.9, completionRate: 82 },
        { name: "Business", students: 280, avgOverallScore: 7.6, completionRate: 75 },
        { name: "Liberal Arts", students: 200, avgOverallScore: 7.4, completionRate: 68 },
      ],
      achievementTrends: [
        { month: "Jan", count: 45 },
        { month: "Feb", count: 52 },
        { month: "Mar", count: 48 },
        { month: "Apr", count: 67 },
        { month: "May", count: 73 },
        { month: "Jun", count: 41 },
      ],
      topPerformers: [
        { name: "Sarah Chen", department: "CS", overallScore: 9.2, achievements: 32 },
        { name: "Dr. Sharath Chandra N", department: "CS", overallScore: 8.6, achievements: 24 },
        { name: "Mike Rodriguez", department: "ENG", overallScore: 8.8, achievements: 21 },
      ],
    }
  };

  const tabs = [
    { id: "student", label: "Student Analytics" },
    { id: "faculty", label: "Faculty Insights" },
    { id: "department", label: "Department Overview" },
    { id: "reports", label: "Custom Reports" },
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
          {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </div>
        <div className="flex flex-col items-center">
          <Icon className={`w-8 h-8 text-${color}-500 mb-2`} />
          {trend && (
            <div className={`text-xs flex items-center ${
              trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              <FiTrendingUp className="w-3 h-3 mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">
            {viewType === "individual" 
              ? "Track your academic progress and achievements"
              : "Institutional insights and performance metrics"
            }
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="individual">Individual View</option>
            <option value="faculty">Faculty View</option>
            <option value="admin">Admin View</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="semester">This Semester</option>
            <option value="year">Academic Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiDownload className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {viewType === "individual" ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Current Overall Score"
            value="8.6"
            subtitle="▲ 0.2 from last semester"
            icon={FiTrendingUp}
            trend={2.4}
            color="blue"
          />
          <StatCard
            title="Total Achievements"
            value={analyticsData.individual.achievements.total}
            subtitle="4 added this month"
            icon={FiAward}
            trend={18}
            color="green"
          />
          <StatCard
            title="Portfolio Views"
            value={analyticsData.individual.portfolioViews}
            subtitle="Last 30 days"
            icon={FiUsers}
            trend={23}
            color="purple"
          />
          <StatCard
            title="Engagement Score"
            value={`${analyticsData.individual.engagementScore}%`}
            subtitle="Above average"
            icon={FiBarChart}
            trend={5}
            color="orange"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={analyticsData.institutional.totalStudents.toLocaleString()}
            subtitle="Active profiles"
            icon={FiUsers}
            trend={8}
            color="blue"
          />
          <StatCard
            title="Average Overall Score"
            value={analyticsData.institutional.averageOverallScore}
            subtitle="Institution wide"
            icon={FiTrendingUp}
            trend={3.2}
            color="green"
          />
          <StatCard
            title="Verification Rate"
            value={`${analyticsData.institutional.verificationRate}%`}
            subtitle="Records verified"
            icon={FiAward}
            trend={2}
            color="purple"
          />
          <StatCard
            title="Portfolio Completion"
            value={`${analyticsData.institutional.portfolioCompletionRate}%`}
            subtitle="Average completion"
            icon={FiPieChart}
            trend={12}
            color="orange"
          />
        </div>
      )}

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
          {/* Student Analytics Tab */}
          {activeTab === "student" && (
            <div className="space-y-8">
              {/* Overall Score Progress Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Progress</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-end h-40">
                    {analyticsData.individual.overallScoreProgress.map((semester, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-blue-500 rounded-t-lg w-16 mb-2 transition-all duration-300"
                          style={{ height: `${(semester.overallScore / 10) * 100}%`, minHeight: '20px' }}
                        ></div>
                        <div className="text-sm font-medium text-gray-900">{semester.overallScore}</div>
                        <div className="text-xs text-gray-500 mt-1">{semester.semester}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Development */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Development</h3>
                <div className="space-y-4">
                  {analyticsData.individual.skillsProgress.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="font-medium text-gray-900 w-32">{skill.skill}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[200px]">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium text-gray-700 w-12">{skill.level}%</div>
                      </div>
                      <div className={`text-sm flex items-center ${
                        skill.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <FiTrendingUp className="w-3 h-3 mr-1" />
                        {skill.change > 0 ? '+' : ''}{skill.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(analyticsData.individual.achievements).map(([category, count]) => {
                    if (category === 'total') return null;
                    return (
                      <div key={category} className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{count}</div>
                        <div className="text-sm text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Faculty Insights Tab */}
          {activeTab === "faculty" && viewType !== "individual" && (
            <div className="space-y-8">
              {/* Department Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {analyticsData.institutional.departments.map((dept, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">{dept.name}</h4>
                        <div className="text-sm text-gray-600">{dept.students} students</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{dept.avgOverallScore}</div>
                          <div className="text-xs text-gray-600">Average Overall Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{dept.completionRate}%</div>
                          <div className="text-xs text-gray-600">Portfolio Completion</div>
                        </div>
                        <div className="text-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${dept.completionRate}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Progress</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Students</h3>
                <div className="space-y-3">
                  {analyticsData.institutional.topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.department}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{student.overallScore}</div>
                          <div className="text-gray-600">Overall Score</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-600">{student.achievements}</div>
                          <div className="text-gray-600">Achievements</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Custom Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Report Builder</h3>
                <p className="text-gray-600 mb-6">
                  Create custom reports for accreditation, performance analysis, and institutional research.
                </p>
                <div className="flex justify-center gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FiPieChart className="w-4 h-4" />
                    Build Report
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FiFilter className="w-4 h-4" />
                    Saved Reports
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
