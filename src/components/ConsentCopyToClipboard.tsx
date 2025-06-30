import React, { useState } from "react";

interface ConsentCopyToClipboardProps {
  value: string;
  label?: string;
}

const ConsentCopyToClipboard: React.FC<ConsentCopyToClipboardProps> = ({ value, label = "Copy" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
      type="button"
    >
      {copied ? "Copied!" : label}
    </button>
  );
};

export default ConsentCopyToClipboard; 