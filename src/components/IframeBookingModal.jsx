import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const IframeBookingModal = ({ isOpen, onClose, url = "https://cy-sec.online" }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-5xl h-[90vh] sm:h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header / Close Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-2 bg-white/80 backdrop-blur-md hover:bg-slate-100 rounded-full transition-colors shadow-sm border border-slate-200"
                aria-label="Close modal"
              >
                <X className="h-6 w-6 text-slate-600" />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-grow w-full h-full relative bg-slate-50">
              {/* Loading State */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                <p className="text-slate-500 font-medium">Loading form...</p>
              </div>

              <iframe
                src={url}
                className="absolute inset-0 w-full h-full border-0 z-10 bg-white"
                title="Cy-Sec Booking Form"
                allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IframeBookingModal;