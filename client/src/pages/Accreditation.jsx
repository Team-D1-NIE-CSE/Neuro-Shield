import React, { useState } from "react";
import { FiDownload, FiFileText, FiCheck, FiClock, FiBarChart, FiUsers, FiTrendingUp, FiCalendar } from "react-icons/fi";

export default function Accreditation() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("2023-24");

  const accreditationData = {
    overview: {
      naacScore: 3.4,
      nirfRanking: 78,
      aicteStatus: "Approved",
      nbaPrograms: 6,
      lastUpdate: "2024-01-15"
    },
    reports: [
      {
        id: 1,
        type: "NAAC",
        title: "Self Study Report 2023-24",
        status: "completed",
        dueDate: "2024-03-31",
        generatedDate: "2024-01-15",
        criteria: ["Curricular Aspects", "Teaching-Learning", "Research", "Infrastructure", "Student Support", "Governance", "Innovations"],
        progress: 100
      },
      {
        id: 2,
        type: "NIRF",
        title: "NIRF Data Submission 2024",
        status: "in_progress",
        dueDate: "2024-04-30",
        generatedDate: null,
        criteria: ["Teaching", "Research", "Graduation Outcomes", "Outreach", "Perception"],
        progress: 75
      },
      {
        id: 3,
        type: "AICTE",
        title: "AICTE Annual Report 2023-24",
        status: "pending",
        dueDate: "2024-05-15",
        generatedDate: null,
        criteria: ["Infrastructure", "Faculty", "Financial", "Academics", "Research"],
        progress: 30
      },
      {
        id: 4,
        type: "NBA",
        title: "Program Accreditation Report",
        status: "completed",
        dueDate: "2024-02-28",
        generatedDate: "2024-02-20",
        criteria: ["Program Outcomes", "Curriculum", "Faculty", "Infrastructure", "Assessment"],
        progress: 100
      }
    ],
    metrics: {
      totalStudents: 1250,
      facultyStrength: 85,
      researchPapers: 156,
      placementRate: 87,
      averageGPA: 7.8,
      industryCollaborations: 23,
      patents: 12,
      consultancyProjects: 18
    },
    compliance: [
      { parameter: "Student-Faculty Ratio", target: "15:1", current: "14.7:1", status: "compliant" },
      { parameter: "PhD Faculty Percentage", target: ">75%", current: "82%", status: "compliant" },
      { parameter: "Research Publications", target: ">100", current: "156", status: "exceeding" },
      { parameter: "Industry Partnerships", target: ">20", current: "23", status: "compliant" },
      { parameter: "Placement Rate", target: ">80%", current: "87%", status: "exceeding" },
      { parameter: "Infrastructure Score", target: ">3.0", current: "3.4", status: "exceeding" }
    ]
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "reports", label: "Reports & Submissions" },
    { id: "metrics", label: "Key Metrics" },
    { id: "compliance", label: "Compliance Status" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "in_progress": return "text-blue-600 bg-blue-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "compliant": return "text-green-600 bg-green-100";
      case "exceeding": return "text-blue-600 bg-blue-100";
      case "non_compliant": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return FiCheck;
      case "in_progress": return FiClock;
      case "pending": return FiClock;
      case "compliant": return FiCheck;
      case "exceeding": return FiTrendingUp;
      default: return FiClock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accreditation Dashboard</h1>
          <p className="text-gray-600">Monitor compliance and generate reports for NAAC, NIRF, AICTE, and NBA</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="2023-24">Academic Year 2023-24</option>
            <option value="2022-23">Academic Year 2022-23</option>
            <option value="2021-22">Academic Year 2021-22</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiDownload className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{accreditationData.overview.naacScore}</div>
              <div className="text-sm text-gray-600">NAAC Grade</div>
            </div>
            <FiFileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">#{accreditationData.overview.nirfRanking}</div>
              <div className="text-sm text-gray-600">NIRF Ranking</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{accreditationData.overview.nbaPrograms}</div>
              <div className="text-sm text-gray-600">NBA Accredited Programs</div>
            </div>
            <FiCheck className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-orange-600">{accreditationData.overview.aicteStatus}</div>
              <div className="text-sm text-gray-600">AICTE Status</div>
            </div>
            <FiFileText className="w-8 h-8 text-orange-500" />
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
              {/* Accreditation Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Accreditation Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">NAAC Grade:</span>
                      <span className="font-semibold text-blue-600">A+ ({accreditationData.overview.naacScore})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">NIRF Ranking:</span>
                      <span className="font-semibold text-green-600">#{accreditationData.overview.nirfRanking}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">AICTE Status:</span>
                      <span className="font-semibold text-purple-600">{accreditationData.overview.aicteStatus}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">NBA Programs:</span>
                      <span className="font-semibold text-orange-600">{accreditationData.overview.nbaPrograms}/8</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {accreditationData.reports.filter(r => r.status !== 'completed').slice(0, 3).map(report => (
                      <div key={report.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{report.type}:</span>
                        <span className="text-sm text-gray-600">{new Date(report.dueDate).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Accreditation Reports</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <FiFileText className="w-4 h-4" />
                  Generate New Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {accreditationData.reports.map((report) => {
                  const StatusIcon = getStatusIcon(report.status);
                  return (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${
                            report.type === 'NAAC' ? 'bg-blue-100' :
                            report.type === 'NIRF' ? 'bg-green-100' :
                            report.type === 'AICTE' ? 'bg-purple-100' :
                            'bg-orange-100'
                          }`}>
                            <FiFileText className={`w-6 h-6 ${
                              report.type === 'NAAC' ? 'text-blue-600' :
                              report.type === 'NIRF' ? 'text-green-600' :
                              report.type === 'AICTE' ? 'text-purple-600' :
                              'text-orange-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <FiCalendar className="w-4 h-4" />
                                Due: {new Date(report.dueDate).toLocaleDateString()}
                              </span>
                              {report.generatedDate && (
                                <span>Generated: {new Date(report.generatedDate).toLocaleDateString()}</span>
                              )}
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Progress</span>
                                <span className="text-sm font-medium text-gray-700">{report.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${report.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Criteria */}
                            <div>
                              <span className="text-sm font-medium text-gray-700 mb-2 block">Criteria Covered:</span>
                              <div className="flex flex-wrap gap-2">
                                {report.criteria.map((criterion, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    {criterion}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {report.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <div className="flex gap-2">
                            {report.status === 'completed' && (
                              <button className="text-blue-600 hover:text-blue-700 text-sm">
                                <FiDownload className="w-4 h-4" />
                              </button>
                            )}
                            <button className="text-gray-400 hover:text-gray-600 text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Metrics Tab */}
          {activeTab === "metrics" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(accreditationData.metrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{value}</div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === "compliance" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Parameters</h3>
              <div className="space-y-4">
                {accreditationData.compliance.map((item, index) => {
                  const StatusIcon = getStatusIcon(item.status);
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${getStatusColor(item.status).split(' ')[1]}`}>
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(item.status).split(' ')[0]}`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.parameter}</div>
                          <div className="text-sm text-gray-600">Target: {item.target}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{item.current}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
