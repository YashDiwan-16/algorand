import React from 'react';

interface ConsentPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const ConsentPagination: React.FC<ConsentPaginationProps> = ({ page, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;
  return (
    <div className="flex gap-2 items-center justify-center my-4">
      <button
        className="px-2 py-1 rounded bg-gray-200"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="text-sm">Page {page} of {pageCount}</span>
      <button
        className="px-2 py-1 rounded bg-gray-200"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
      >
        Next
      </button>
    </div>
  );
};

export default ConsentPagination; 