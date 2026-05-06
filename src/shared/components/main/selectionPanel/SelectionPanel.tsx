import styles from "./SelectionPanel.module.scss";

const SelectionPanel = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.selectionPanel}>{children}</div>;
};

export default SelectionPanel;
