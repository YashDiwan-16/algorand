import React from 'react';

interface ConsentDateRangePickerProps {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

const ConsentDateRangePicker: React.FC<ConsentDateRangePickerProps> = ({ start, end, onChange }) => (
  <div className="flex gap-2 items-center">
    <input
      type="date"
      value={start}
      onChange={e => onChange(e.target.value, end)}
      className="border rounded px-2 py-1"
    />
    <span className="text-gray-500">to</span>
    <input
      type="date"
      value={end}
      onChange={e => onChange(start, e.target.value)}
      className="border rounded px-2 py-1"
    />
  </div>
);

export default ConsentDateRangePicker; 