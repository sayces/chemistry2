import Link from "@/shared/components/ui-kit/link/Link";
import styles from "./HomeButton.module.scss";
import Typography from "../../ui-kit/typography/Typography";

const HomeButton = () => {
  return (
    <Link href="/" className={styles.link}>
      <Typography size="14" className={styles.homeButton}>chemistry2</Typography>
    </Link>
  );
}

export default HomeButton;