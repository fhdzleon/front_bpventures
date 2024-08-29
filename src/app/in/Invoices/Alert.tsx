import React from 'react';

const Alert: React.FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => {
  const alertStyles = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`p-4 mb-4 text-white ${alertStyles} rounded`}>
      {message}
    </div>
  );
};
