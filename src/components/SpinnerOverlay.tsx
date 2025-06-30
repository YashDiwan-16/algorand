import React from 'react';
import Spinner from './Spinner';

const SpinnerOverlay: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <Spinner />
  </div>
);

export default SpinnerOverlay; 