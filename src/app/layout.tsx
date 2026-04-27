import type { Metadata } from "next";
import "@/shared/styles/index.scss";
import { Manrope } from "next/font/google";
import { cn } from "@/shared/lib/styleUtils";
import { PlatformProvider } from "@/shared/providers/PlatformProvider";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Chemistry",
  description: "a Nail Master from Moscow",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={cn("font-sans", manrope.variable)}>
      <body className="antialiased">
        <PlatformProvider />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
