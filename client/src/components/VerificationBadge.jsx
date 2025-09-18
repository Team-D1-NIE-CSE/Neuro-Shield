import React from 'react';
import { FiCheck, FiClock, FiX, FiShield } from 'react-icons/fi';

const VerificationBadge = ({ status, size = 'sm', showText = true }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: FiCheck,
          text: 'Verified',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600'
        };
      case 'pending':
        return {
          icon: FiClock,
          text: 'Pending',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          iconColor: 'text-yellow-600'
        };
      case 'rejected':
        return {
          icon: FiX,
          text: 'Rejected',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          iconColor: 'text-red-600'
        };
      case 'faculty_verified':
        return {
          icon: FiShield,
          text: 'Faculty Verified',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-600'
        };
      default:
        return {
          icon: FiClock,
          text: 'Unverified',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`
      inline-flex items-center gap-1 rounded-full font-medium
      ${config.bgColor} ${config.textColor} ${sizeClasses[size]}
    `}>
      <Icon className={`${config.iconColor} ${iconSizeClasses[size]}`} />
      {showText && config.text}
    </span>
  );
};

export default VerificationBadge;
