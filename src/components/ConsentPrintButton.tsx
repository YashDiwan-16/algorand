import React from 'react';

interface ConsentPrintButtonProps {
  onPrint: () => void;
}

const ConsentPrintButton: React.FC<ConsentPrintButtonProps> = ({ onPrint }) => (
  <button
    className="px-3 py-1 bg-gray-200 rounded text-sm"
    onClick={onPrint}
    type="button"
  >
    Print
  </button>
);

export default ConsentPrintButton; 