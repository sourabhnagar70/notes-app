/*import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 ${className}`}>
      <AlertCircle size={16} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};*/

// Remove unused React import and add proper types

// Remove unused React import and add proper types
// interface ErrorMessageProps {
//   message: string;
//   className?: string;
// }

// export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
//   return (
//     <div className={`bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 ${className}`} role="alert">
//       <span className="text-red-500">⚠️</span>
//       <span className="text-red-700 text-sm">{message}</span>
//     </div>
//   );
// };

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 ${className}`}>
      <AlertCircle size={20} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
// Alternatively, using implicit return

// export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => (
//   <div className={`flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 ${className}`}>
//     <AlertCircle size={20} />
//     <span className="text-sm font-medium">{message}</span>
//   </div>