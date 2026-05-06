// @/shared/components/modal/Modal.tsx
"use client";

import { createPortal } from "react-dom";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import styles from "./Modal.module.scss";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;        // Управляется снаружи
  onClose: () => void;    // Функция закрытия снаружи
  width?: string;
  height?: string;
}

const Modal = ({ children, isOpen, onClose, width, height }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ждем монтирования на клиенте для корректной работы Portals в Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  useClickOutside(modalRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen || !mounted) return null;

  // Рендерим модалку в body, чтобы избежать проблем с z-index и overflow
  return createPortal(
    <div
      className={styles.modalBackdrop}
      onClick={onClose} // Клик по фону закрывает
    >
      <div
        ref={modalRef}
        className={styles.modal}
        style={
          {
            "--modal-width": width,
            "--modal-height": height,
          } as React.CSSProperties
        }
        onClick={(e) => e.stopPropagation()} // Клик внутри не закрывает
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;