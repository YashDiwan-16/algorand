import React from "react";

interface ConsentDocumentListProps {
  documents: { name: string; url: string }[];
}

function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  if (["pdf"].includes(ext || "")) return "📄";
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg"].includes(ext || "")) return "🖼️";
  if (["doc", "docx"].includes(ext || "")) return "📝";
  if (["xls", "xlsx"].includes(ext || "")) return "📊";
  if (["zip", "rar", "tar", "gz"].includes(ext || "")) return "🗜️";
  return "📁";
}

const ConsentDocumentList: React.FC<ConsentDocumentListProps> = ({ documents }) => (
  <ul className="space-y-2">
    {documents.map((doc, idx) => (
      <li
        key={idx}
        className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 transition-shadow hover:shadow-md hover:bg-gray-100"
      >
        <span className="flex items-center truncate mr-2">
          <span className="mr-2 text-lg">{getFileIcon(doc.name)}</span>
          {doc.name}
        </span>
        <a
          href={doc.url}
          download
          className="text-blue-600 hover:bg-blue-100 focus:bg-blue-200 rounded px-2 py-1 text-sm font-medium outline-none transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </li>
    ))}
  </ul>
);

export default ConsentDocumentList; 