import React from 'react';

interface ConsentExportButtonProps {
  consents: object[];
}

function toCSV(data: object[]): string {
  if (!data.length) return '';
  const keys = Object.keys(data[0]);
  const csvRows = [keys.join(',')];
  for (const row of data) {
    csvRows.push(keys.map(k => JSON.stringify((row as any)[k] ?? '')).join(','));
  }
  return csvRows.join('\n');
}

const ConsentExportButton: React.FC<ConsentExportButtonProps> = ({ consents }) => {
  const handleExport = (type: 'csv' | 'json') => {
    let content = '';
    let mime = '';
    if (type === 'csv') {
      content = toCSV(consents);
      mime = 'text/csv';
    } else {
      content = JSON.stringify(consents, null, 2);
      mime = 'application/json';
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consents.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => handleExport('csv')} title="Export as CSV">Export CSV</button>
      <button className="px-3 py-1 bg-gray-700 text-white rounded" onClick={() => handleExport('json')} title="Export as JSON">Export JSON</button>
    </div>
  );
};

export default ConsentExportButton; 