import React from 'react';

/**
 * Props for the Button component.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to be displayed inside the button.
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the button.
   */
  className?: string;
}

/**
 * A reusable button component with default styling.
 */
const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 