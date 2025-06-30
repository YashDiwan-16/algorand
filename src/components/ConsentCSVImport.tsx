import React, { useRef } from 'react';

interface ConsentCSVImportProps {
  onImport: (csv: string) => void;
}

const ConsentCSVImport: React.FC<ConsentCSVImportProps> = ({ onImport }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <button
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        Import CSV
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') onImport(reader.result);
            };
            reader.readAsText(file);
          }
        }}
      />
    </div>
  );
};

export default ConsentCSVImport; 