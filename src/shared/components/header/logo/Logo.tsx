import Link from "@/shared/components/link/Link";
import Button from "@/shared/components/button/Button";
import Typography from "@/shared/components/typography/Typography";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <Button text="">
          <Typography as="h1" size="30" color="toxic">
            Chemistry
          </Typography>
        </Button>
      </Link>
    </div>
  );
};

export default Logo;
