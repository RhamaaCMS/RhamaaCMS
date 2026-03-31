import type { PropsWithChildren } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
