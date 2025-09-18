import React, { useState, useEffect } from 'react';
import { FiCheck, FiPlus, FiEdit, FiUpload, FiEye, FiClock } from 'react-icons/fi';
import VerificationBadge from './VerificationBadge';

const ActivityTracker = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'achievement_verified',
      title: 'AWS Certification Verified',
      description: 'Your AWS Solutions Architect certification has been verified by the faculty.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'verified',
      icon: FiCheck
    },
    {
      id: 2,
      type: 'achievement_added',
      title: 'New Achievement Added',
      description: 'Added "National Coding Championship 2024" to your competitions.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending',
      icon: FiPlus
    },
    {
      id: 3,
      type: 'profile_updated',
      title: 'Profile Updated',
      description: 'Updated your bio and skills section.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: 'completed',
      icon: FiEdit
    },
    {
      id: 4,
      type: 'document_uploaded',
      title: 'Document Uploaded',
      description: 'Uploaded certificate for "Machine Learning Specialization".',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: 'pending',
      icon: FiUpload
    },
    {
      id: 5,
      type: 'portfolio_viewed',
      title: 'Portfolio Viewed',
      description: 'Your portfolio was viewed by 5 new employers this week.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'info',
      icon: FiEye
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getActivityIcon = (activity) => {
    const Icon = activity.icon;
    const iconColorMap = {
      verified: 'text-green-600 bg-green-100',
      pending: 'text-yellow-600 bg-yellow-100',
      completed: 'text-blue-600 bg-blue-100',
      info: 'text-purple-600 bg-purple-100'
    };
    
    return (
      <div className={`p-2 rounded-full ${iconColorMap[activity.status] || 'text-gray-600 bg-gray-100'}`}>
        <Icon className="w-4 h-4" />
      </div>
    );
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600">Track your achievements and profile updates</p>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              {getActivityIcon(activity)}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">{getRelativeTime(activity.timestamp)}</span>
                      <VerificationBadge status={activity.status} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <FiClock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-sm text-gray-500">No activities match the selected filter.</p>
          </div>
        )}

        {/* Load More */}
        {filteredActivities.length > 0 && (
          <div className="mt-6 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Load More Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTracker;
