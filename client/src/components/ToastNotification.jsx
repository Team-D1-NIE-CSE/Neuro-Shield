import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastNotification = ({ message, type = 'info', isVisible, onClose, autoClose = true, duration = 4000 }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, autoClose, duration]);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      setTimeout(() => onClose(), 300); // Wait for animation to complete
    }
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-center gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 max-w-md";
    const typeStyles = {
      success: "bg-green-50 border-green-200 text-green-800",
      error: "bg-red-50 border-red-200 text-red-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      info: "bg-blue-50 border-blue-200 text-blue-800"
    };

    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (type) {
      case 'success':
        return <FiCheckCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-green-600" />;
      case 'error':
        return <FiXCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-red-600" />;
      case 'warning':
        return <FiAlertCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-yellow-600" />;
      case 'info':
      default:
        return <FiInfo {...iconProps} className="w-5 h-5 flex-shrink-0 text-blue-600" />;
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transform transition-transform duration-300 ${
      show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
    }`}>
      <div className={getToastStyles()}>
        {getIcon()}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Toast Provider Component for managing multiple toasts
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', options = {}) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      type,
      ...options
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (options.autoClose !== false) {
      setTimeout(() => {
        removeToast(id);
      }, options.duration || 4000);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  const contextValue = {
    addToast,
    removeToast,
    removeAllToasts,
    toasts
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className={`transform transition-all duration-300 ${
              index === toasts.length - 1 ? 'translate-y-0' : `translate-y-${(toasts.length - 1 - index) * 16}`
            }`}
            style={{
              transform: `translateY(-${index * 4}px)`,
              zIndex: 1000 - index
            }}
          >
            <ToastNotification
              message={toast.message}
              type={toast.type}
              isVisible={true}
              onClose={() => removeToast(toast.id)}
              autoClose={toast.autoClose}
              duration={toast.duration}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// React Context for toast management
import { createContext, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastNotification;
