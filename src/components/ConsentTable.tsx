import React, { useState } from 'react';
import { ConsentEventType } from './ConsentTimeline';
import ConsentStatusPill from './ConsentStatusPill';

export interface ConsentTableRow {
  id: string;
  document: string;
  user: string;
  status: ConsentEventType;
  requestedAt: string;
}

interface ConsentTableProps {
  rows: ConsentTableRow[];
}

const columns = [
  { key: 'document', label: 'Document' },
  { key: 'user', label: 'User' },
  { key: 'status', label: 'Status' },
  { key: 'requestedAt', label: 'Requested At' },
];

const ConsentTable: React.FC<ConsentTableProps> = ({ rows }) => {
  const [sortKey, setSortKey] = useState('requestedAt');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedRows = [...rows].sort((a, b) => {
    if (a[sortKey as keyof ConsentTableRow] < b[sortKey as keyof ConsentTableRow]) return sortAsc ? -1 : 1;
    if (a[sortKey as keyof ConsentTableRow] > b[sortKey as keyof ConsentTableRow]) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <table className="min-w-full bg-white border rounded">
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              className="px-4 py-2 text-left cursor-pointer select-none"
              onClick={() => {
                if (sortKey === col.key) setSortAsc(a => !a);
                else { setSortKey(col.key); setSortAsc(true); }
              }}
            >
              {col.label} {sortKey === col.key ? (sortAsc ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map(row => (
          <tr key={row.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2 font-medium">{row.document}</td>
            <td className="px-4 py-2">{row.user}</td>
            <td className="px-4 py-2"><ConsentStatusPill status={row.status} /></td>
            <td className="px-4 py-2 text-xs text-gray-500">{new Date(row.requestedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConsentTable; 