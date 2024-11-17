import React, { useEffect } from 'react';

const Notification = ({ message, isVisible, onClose, type }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [!isVisible, onClose]);

    if (!isVisible) return null;

    const notificationStyles = type === 'success'
        ? 'bg-green-600 border-2 rounded-full border-teal-600 text-sm text-white p-4 dark:bg-teal-700 dark:border-teal-500 dark:text-teal-100 z-[1000]'
        : 'bg-red-600 border-2 border-red-700 text-sm text-white p-4 dark:bg-red-600 dark:border-red-500 dark:text-red-100 z-[1000]'

    return (
        <div
            className={`fixed bottom-4 right-4 w-96 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${notificationStyles} transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="alert"
            aria-labelledby="notification-label"
        >
            <div className="shrink-0">
                {type === 'success' ? (
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
                        <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                        </svg>
                    </span>
                ) : (
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                        <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </span>
                )}
            </div>
            <div>
                <h3 id="notification-label" className="text-gray-100 font-semibold dark:text-white">
                    {type === 'success' ? '' : 'Error!'}
                </h3>
                <p className="text-sm text-gray-100 dark:text-neutral-100">{message}</p>
            </div>
        </div>
    );
};

export default Notification;