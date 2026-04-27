"use client";

import { createPortal } from "react-dom";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import styles from "./Modal.module.scss";
import { RefObject, useEffect, useRef } from "react";
import { useModalStore } from "@/entities/store/modal/useModalStore";

interface ModalProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Modal = ({ children, width, height }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { isOpen, closeModal, openModal } = useModalStore(); // забираем isOpen и closeModal

  useClickOutside(modalRef, () => {
    if (isOpen) {
      closeModal();
    }
  });

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={closeModal} // клик по фону тоже закрывает
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
        onClick={(e) => e.stopPropagation()} // клик внутри модала не закрывает
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
