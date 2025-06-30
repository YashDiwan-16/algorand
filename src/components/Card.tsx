import React from 'react';

/**
 * Props for the Card component.
 */
interface CardProps {
  /**
   * The content to be displayed inside the card.
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the card.
   */
  className?: string;
  /**
   * Optional title to be displayed at the top of the card.
   */
  title?: string;
}

/**
 * A reusable card component with a shadow, border, and padding.
 */
const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 mb-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
};

export default Card; 