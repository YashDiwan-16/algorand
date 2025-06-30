import React from "react";

interface ConsentDangerZoneProps {
  children: React.ReactNode;
}

const ConsentDangerZone: React.FC<ConsentDangerZoneProps> = ({ children }) => (
  <div className="border border-red-300 bg-red-50 rounded p-4 mt-6">
    <h3 className="text-red-700 font-semibold mb-2">Danger Zone</h3>
    <div>{children}</div>
  </div>
);

export default ConsentDangerZone; 