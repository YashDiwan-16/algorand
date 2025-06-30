import React from 'react';

interface ConsentStepperProps {
  steps: string[];
  current: number;
}

const ConsentStepper: React.FC<ConsentStepperProps> = ({ steps, current }) => (
  <div className="flex items-center gap-4">
    {steps.map((step, idx) => (
      <React.Fragment key={step}>
        <div className="flex flex-col items-center">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${idx <= current ? 'bg-blue-600' : 'bg-gray-300'}`}>{idx + 1}</div>
          <span className={`text-xs mt-1 ${idx === current ? 'font-semibold text-blue-700' : 'text-gray-500'}`}>{step}</span>
        </div>
        {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300" />}
      </React.Fragment>
    ))}
  </div>
);

export default ConsentStepper; 