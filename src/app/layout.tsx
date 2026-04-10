import type { Metadata } from "next";
import "@/shared/styles/index.scss";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
