import React, { ReactNode, useEffect } from 'react';
import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] transition-opacity duration-300 animate-fadeIn"
    >
      <div 
        className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-purple-500/10 border border-purple-500/20 w-full max-w-3xl max-h-[90vh] flex flex-col transition-transform duration-300 animate-scaleIn"
      >
        <header className="flex items-center justify-between p-6 border-b border-gray-700/50 flex-shrink-0">
          <h2 id="modal-title" className="text-xl font-poppins font-bold text-cyan-400">{title}</h2>
          <button onClick={onClose} aria-label="Fechar modal" className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            <XIcon />
          </button>
        </header>
        <main className="p-6 overflow-y-auto text-gray-300 space-y-4">
          {children}
        </main>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Modal;
