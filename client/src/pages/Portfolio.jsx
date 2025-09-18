import React, { useState } from "react";
import { FiShare2, FiDownload, FiEye, FiEdit3, FiPlus, FiExternalLink, FiCopy, FiCheckCircle } from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const portfolioData = {
    name: "Alex Johnson",
    title: "Computer Science Student",
    university: "University of Technology",
    year: "3rd Year",
    gpa: 8.6,
    achievements: 24,
    projects: 12,
    certifications: 8,
    portfolioUrl: "https://portfolio.studentplatform.edu/alex-johnson",
    sections: {
      academic: {
        gpa: 8.6,
        courses: ["Data Structures", "Machine Learning", "Web Development", "Database Systems"],
        honors: ["Dean's List Fall 2023", "Academic Excellence Award"],
      },
      projects: [
        {
          id: 1,
          title: "AI-Powered Study Assistant",
          description: "Machine learning application that helps students optimize study schedules",
          technologies: ["Python", "TensorFlow", "React", "Node.js"],
          status: "Completed",
          link: "https://github.com/alexj/study-assistant",
        },
        {
          id: 2,
          title: "Campus Event Management System",
          description: "Full-stack web application for managing university events",
          technologies: ["React", "Express.js", "MongoDB", "Socket.io"],
          status: "In Progress",
          link: "https://github.com/alexj/campus-events",
        },
      ],
      competitions: [
        {
          id: 1,
          name: "National Coding Championship",
          position: "2nd Place",
          year: "2023",
          level: "National",
        },
        {
          id: 2,
          name: "University Hackathon",
          position: "Winner",
          year: "2023",
          level: "University",
        },
      ],
      volunteering: [
        {
          id: 1,
          organization: "Code for Good",
          role: "Volunteer Developer",
          duration: "6 months",
          impact: "Built website for local non-profit, serving 200+ users daily",
        },
      ],
    },
  };

  const handleShare = (platform) => {
    const url = portfolioData.portfolioUrl;
    const text = `Check out ${portfolioData.name}'s academic portfolio`;
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "academic", label: "Academic" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "experience", label: "Experience" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Portfolio</h1>
          <p className="text-gray-600">Create and manage your shareable academic portfolio</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FiShare2 className="w-4 h-4" />
            Share Portfolio
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiDownload className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FiEye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{portfolioData.gpa}</div>
            <div className="text-sm text-gray-600">Current GPA</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{portfolioData.achievements}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{portfolioData.projects}</div>
            <div className="text-sm text-gray-600">Projects</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{portfolioData.certifications}</div>
            <div className="text-sm text-gray-600">Certifications</div>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                      {portfolioData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{portfolioData.name}</h2>
                    <p className="text-gray-600">{portfolioData.title}</p>
                    <p className="text-sm text-gray-500">{portfolioData.university} • {portfolioData.year}</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h3>
                  <p className="text-gray-700 mb-4">
                    Passionate computer science student with a strong academic record and practical experience 
                    in software development. Demonstrated leadership in hackathons and commitment to community 
                    service through technology.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "Machine Learning", "React", "Node.js"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Tab */}
          {activeTab === "academic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{portfolioData.sections.academic.gpa}</div>
                      <div className="text-sm text-gray-600">Cumulative GPA</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Honors & Recognition</h4>
                    <ul className="space-y-2">
                      {portfolioData.sections.academic.honors.map((honor, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FiCheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Courses</h3>
                  <div className="space-y-3">
                    {portfolioData.sections.academic.courses.map((course, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="font-medium text-gray-900">{course}</div>
                        <div className="text-sm text-gray-600">Grade: A</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Featured Projects</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FiPlus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioData.sections.projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-900">{project.title}</h4>
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <a href={project.link} className="text-gray-400 hover:text-gray-600">
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Portfolio</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 flex-1">{portfolioData.portfolioUrl}</span>
                <button
                  onClick={() => handleShare('copy')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {copySuccess ? <FiCheckCircle className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                >
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                >
                  <FaTwitter className="w-4 h-4" />
                  Twitter
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
