import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Modal = ({ children, width, height }: ModalProps) => {
  return (
    <section
      className={styles.modal}
      style={
        {
          "--modal-width": width,
          "--modal-height": height,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
};

export default Modal;
