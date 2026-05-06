import Typography from "../typography/Typography";
import styles from "./Link.module.scss";

interface LinkProps {
  children: React.ReactNode;
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string;
  className?: string;
}

const Link = ({
  children,
  href,
  target,
  rel,
  download,
  className,
}: LinkProps) => {
  const classNames = [className, styles.link].filter(Boolean).join(" ");
  return (
    <>
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={classNames}
      >
        <Typography as="h1">{children}</Typography>
      </a>
    </>
  );
};

export default Link;
