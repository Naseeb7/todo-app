import React from "react";
import CrossIcon from "../../assets/crossIcon.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`flex flex-col gap-5 relative max-h-[90vh] max-w-[90vw] min-w-lg overflow-auto rounded-xl bg-white p-6 ${className}`}
      >
        <div className="flex justify-between items-center w-full">
          {title && <p className="text-xl font-bold">{title}</p>}
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:cursor-pointer"
            aria-label="Close modal"
          >
            <img src={CrossIcon} className="h-6 w-6" alt="Cross" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
