import React from "react";

interface ConsentApiErrorBoundaryProps {
  children: React.ReactNode;
}

interface ConsentApiErrorBoundaryState {
  hasError: boolean;
}

class ConsentApiErrorBoundary extends React.Component<ConsentApiErrorBoundaryProps, ConsentApiErrorBoundaryState> {
  constructor(props: ConsentApiErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return <div className="text-red-600 p-4 bg-red-50 rounded">Something went wrong. Please try again.</div>;
    }
    return this.props.children;
  }
}

export default ConsentApiErrorBoundary; 