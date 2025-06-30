import React from "react";

const ConsentCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded shadow p-4 mb-4">{children}</div>
);

export default ConsentCard; 