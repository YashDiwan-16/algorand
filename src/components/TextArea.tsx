import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, value, maxLength, ...props }) => {
  const showCounter = maxLength && typeof value === 'string';

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {showCounter && (
          <span className="text-sm text-gray-500">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        rows={3}
        {...props}
      />
    </div>
  );
};

export default TextArea; 