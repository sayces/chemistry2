import styles from "./SelectionPanel.module.scss";

const SelectionPanel = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div ref={ref} className={styles.selectionPanel}>
      {children}
    </div>
  );
};

export default SelectionPanel;
