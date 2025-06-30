import React from "react";

interface ConsentAlertProps {
  type?: "success" | "error" | "info" | "warning";
  message: string;
}

const typeStyles: Record<string, string> = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

const ConsentAlert: React.FC<ConsentAlertProps> = ({ type = "info", message }) => (
  <div className={`border-l-4 p-4 mb-4 rounded ${typeStyles[type]}`}>{message}</div>
);

export default ConsentAlert; 