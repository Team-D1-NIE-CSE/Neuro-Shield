import React, { useState } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiCheck, FiClock, FiAward, FiCalendar, FiExternalLink } from "react-icons/fi";

export default function Certifications() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const certificationsData = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024-02-15",
      expiryDate: "2027-02-15",
      credentialId: "AWS-CSA-123456",
      verified: true,
      skills: ["AWS", "Cloud Architecture", "Infrastructure"],
      category: "Cloud Computing",
      status: "active",
      certificateUrl: "https://example.com/aws-cert.pdf"
    },
    {
      id: 2,
      title: "Google Data Analytics Certificate",
      issuer: "Google",
      date: "2023-12-10",
      expiryDate: null,
      credentialId: "GDA-789012",
      verified: true,
      skills: ["Data Analysis", "SQL", "Tableau", "R"],
      category: "Data Science",
      status: "active",
      certificateUrl: "https://example.com/google-cert.pdf"
    },
    {
      id: 3,
      title: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      date: "2023-11-05",
      expiryDate: "2025-11-05",
      credentialId: "CSM-345678",
      verified: false,
      skills: ["Agile", "Scrum", "Project Management"],
      category: "Project Management",
      status: "pending_verification",
      certificateUrl: "https://example.com/scrum-cert.pdf"
    }
  ];

  const stats = {
    total: certificationsData.length,
    active: certificationsData.filter(c => c.status === 'active').length,
    verified: certificationsData.filter(c => c.verified).length,
    expiring: certificationsData.filter(c => {
      if (!c.expiryDate) return false;
      const expiryDate = new Date(c.expiryDate);
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      return expiryDate <= sixMonthsFromNow;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
          <p className="text-gray-600">Manage your professional certifications and credentials</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Certifications</div>
            </div>
            <FiAward className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <FiCheck className="w-8 h-8 text-green-500" />
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
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.expiring}</div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
            </div>
            <FiClock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certificationsData.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiAward className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-gray-600 mb-2">{cert.issuer}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span>ID: {cert.credentialId}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  cert.status === 'active' ? 'bg-green-100 text-green-700' :
                  cert.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {cert.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {cert.category}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {cert.verified ? (
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
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <FiEdit3 className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                  <FiExternalLink className="w-4 h-4" />
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
