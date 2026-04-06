import React from 'react';
import IframeBookingModal from './IframeBookingModal';

// Compatibility wrapper for components that might still try to import CysecWidgetModal
const CysecWidgetModal = ({ isOpen, onClose }) => {
  return <IframeBookingModal isOpen={isOpen} onClose={onClose} />;
};

export default CysecWidgetModal;