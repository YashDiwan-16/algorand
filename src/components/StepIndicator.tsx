import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, current }) => (
  <div className="flex items-center space-x-4">
    {steps.map((step, idx) => (
      <div key={step} className="flex items-center">
        <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${idx <= current ? 'bg-blue-600' : 'bg-gray-300'}`}>{idx + 1}</div>
        <span className="ml-2 text-sm font-medium">{step}</span>
        {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-2 rounded" />}
      </div>
    ))}
  </div>
);

export default StepIndicator; 