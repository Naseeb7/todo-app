import React from "react";
import CrossIcon from "../../assets/crossIcon.svg";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  title,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
          aria-modal="true"
          role="dialog"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <motion.div
            className={`flex flex-col gap-5 relative max-h-[90vh] max-w-[90vw] w-lg overflow-auto rounded-xl bg-white p-6 ${className}`}
            variants={modalVariants}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center w-full">
              {title && <p className="text-lg sm:text-xl font-bold">{title}</p>}
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:cursor-pointer"
                aria-label="Close modal"
              >
                <img
                  src={CrossIcon}
                  className="h-5 sm:h-6 w-5 sm:w-6"
                  alt="Cross"
                />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
