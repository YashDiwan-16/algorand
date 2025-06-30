import React from 'react';

interface ConsentPieChartProps {
  granted: number;
  pending: number;
  revoked: number;
}

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

function getSegments(granted: number, pending: number, revoked: number) {
  const total = granted + pending + revoked;
  if (total === 0) return [0, 0, 0];
  return [granted / total, pending / total, revoked / total];
}

const ConsentPieChart: React.FC<ConsentPieChartProps> = ({ granted, pending, revoked }) => {
  const [g, p, r] = getSegments(granted, pending, revoked);
  const angles = [g, p, r].map((v, i, arr) => arr.slice(0, i).reduce((a, b) => a + b, 0) * 360);
  const describeArc = (start: number, value: number, color: string) => {
    if (value === 0) return null;
    const end = start + value * 360;
    const large = value > 0.5 ? 1 : 0;
    const r = 16;
    const x1 = 20 + r * Math.cos((Math.PI * (start - 90)) / 180);
    const y1 = 20 + r * Math.sin((Math.PI * (start - 90)) / 180);
    const x2 = 20 + r * Math.cos((Math.PI * (end - 90)) / 180);
    const y2 = 20 + r * Math.sin((Math.PI * (end - 90)) / 180);
    return (
      <path
        key={color}
        d={`M20,20 L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
        fill={color}
      />
    );
  };
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" className="inline-block align-middle">
      {describeArc(0, g, COLORS[0])}
      {describeArc(angles[1], p, COLORS[1])}
      {describeArc(angles[2], r, COLORS[2])}
      <circle cx={20} cy={20} r={10} fill="#fff" />
    </svg>
  );
};

export default ConsentPieChart; 