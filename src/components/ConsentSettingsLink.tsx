import React from "react";

interface ConsentSettingsLinkProps {
  href?: string;
}

const ConsentSettingsLink: React.FC<ConsentSettingsLinkProps> = ({ href = "/settings" }) => (
  <a
    href={href}
    className="inline-block px-4 py-2 text-blue-600 hover:underline hover:text-blue-800 font-medium"
  >
    Settings
  </a>
);

export default ConsentSettingsLink; 