import React from "react";

interface ConsentFormFieldErrorProps {
  message?: string;
}

const ConsentFormFieldError: React.FC<ConsentFormFieldErrorProps> = ({ message }) => (
  message ? <span className="text-red-600 text-xs ml-1">{message}</span> : null
);

export default ConsentFormFieldError; 