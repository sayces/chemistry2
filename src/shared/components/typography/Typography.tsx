import styles from "./Typography.module.scss";
import { ElementType, ReactNode } from "react";

type Size = "04" | "08" | "10" | "16" | "20" | "26" | "30";
type Color = "toxic" | "white" | "black";

// Допустимые текстовые теги
// type TextElement =
//   | "p"
//   | "span"
//   | "h1"
//   | "h2"
//   | "h3"
//   | "h4"
//   | "h5"
//   | "h6"
//   | "strong"
//   | "em"
//   | "small"
//   | "label";

interface TypographyOwnProps<E extends ElementType = "p"> {
  as?: E;
  children?: ReactNode;
  className?: string;
  size?: Size;
  color?: Color;
}

type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TypographyOwnProps<E>>;

const Typography = <E extends ElementType = "p">(props: TypographyProps<E>) => {
  const {
    as: Component = "p",
    children,
    className,
    size,
    color,
    style,
    ...rest
  } = props;

  const classNames = [
    styles.typography,
    size && styles[`size-${size}`],
    color && styles[`color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
