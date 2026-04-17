"use client";

import Link from "next/link";
import Typography from "@/shared/components/typography/Typography";
import { usePathname } from "next/navigation";
import { useNavigationStore, navItems } from "@/shared/store/useNavigationStore";
import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

const Logo = ({className}: LogoProps) => {
  const pathname = usePathname();
  const { hoveredItemId } = useNavigationStore();

  const isHomePage = pathname === "/";
  const activeNavId =
    hoveredItemId ||
    navItems.find((item) => item.href === pathname)?.id;

  const logoTypo = activeNavId && !isHomePage
    ? styles[`color-${activeNavId}`]
    : "";

  return (
    <div className={`${styles.logo} ${className || ""}`}>
      <Link href="/" >
        <Typography as="h1" size="30" className={logoTypo}>
          Chemistry2
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;
