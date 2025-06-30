import React from "react";

interface ConsentExportPDFButtonProps {
  onExport: () => void;
}

const ConsentExportPDFButton: React.FC<ConsentExportPDFButtonProps> = ({ onExport }) => (
  <button
    onClick={onExport}
    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
  >
    Export as PDF
  </button>
);

export default ConsentExportPDFButton; 