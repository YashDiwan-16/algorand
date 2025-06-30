import React, { useRef } from 'react';

interface ConsentAttachmentUploadProps {
  onUpload: (files: FileList) => void;
}

const ConsentAttachmentUpload: React.FC<ConsentAttachmentUploadProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        Upload Attachment
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple
        onChange={e => e.target.files && onUpload(e.target.files)}
      />
    </div>
  );
};

export default ConsentAttachmentUpload; 