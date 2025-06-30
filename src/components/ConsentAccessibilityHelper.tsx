import React from 'react';

const ConsentAccessibilityHelper: React.FC = () => (
  <div aria-live="polite" className="sr-only">
    Use the tab key to navigate consent actions. Press enter to approve, revoke, or view details. All actions are accessible via keyboard and screen reader.
  </div>
);

export default ConsentAccessibilityHelper; 