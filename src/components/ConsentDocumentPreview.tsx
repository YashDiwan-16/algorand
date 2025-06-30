import React from 'react';

interface ConsentDocumentPreviewProps {
  url: string;
  type?: string;
}

const ConsentDocumentPreview: React.FC<ConsentDocumentPreviewProps> = ({ url, type }) => {
  if (type?.startsWith('image/')) {
    return <img src={url} alt="Document preview" className="max-w-full max-h-64 rounded border" />;
  }
  if (type === 'application/pdf') {
    return <iframe src={url} title="PDF Preview" className="w-full h-64 border rounded" />;
  }
  return (
    <div className="p-4 border rounded bg-gray-50 text-gray-500 text-sm text-center">
      <a href={url} target="_blank" rel="noopener noreferrer" className="underline">Download document</a>
    </div>
  );
};

export default ConsentDocumentPreview; 