import { motion } from "framer-motion";
import styles from "./SelectionPanel.module.scss";

const SelectionPanel = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div ref={ref} className={styles.selectionPanel}>
      <motion.div layout style={{ width: "100%" }}>
        {children}
      </motion.div>
    </div>
  );
};

export default SelectionPanel;
