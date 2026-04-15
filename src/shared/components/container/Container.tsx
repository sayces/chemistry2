import styles from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'withPadding';
}

const Container = ({ children, variant = 'default' }: ContainerProps) => {
  const className = variant === 'withPadding' ? styles.containerWithPadding : styles.container;

  return <div className={className}>{children}</div>;
};

export default Container;
