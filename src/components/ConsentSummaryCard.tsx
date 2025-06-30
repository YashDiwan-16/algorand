import React from 'react';

interface ConsentSummaryCardProps {
  total: number;
  granted: number;
  pending: number;
  revoked: number;
}

const ConsentSummaryCard: React.FC<ConsentSummaryCardProps> = ({ total, granted, pending, revoked }) => (
  <div className="bg-white rounded shadow p-6 flex flex-col gap-2 w-full max-w-xs" data-testid="consent-summary-card">
    <h3 className="text-lg font-bold mb-2">Consent Summary</h3>
    <div className="flex justify-between text-sm">
      <span>Total</span>
      <span className="font-semibold">{total}</span>
    </div>
    <div className="flex justify-between text-sm text-green-700">
      <span>Granted</span>
      <span className="font-semibold">{granted}</span>
    </div>
    <div className="flex justify-between text-sm text-yellow-700">
      <span>Pending</span>
      <span className="font-semibold">{pending}</span>
    </div>
    <div className="flex justify-between text-sm text-red-700">
      <span>Revoked</span>
      <span className="font-semibold">{revoked}</span>
    </div>
  </div>
);

export default ConsentSummaryCard; 