import Header from "./Header";
import Footer from "./Footer";
import { PropsWithChildren } from "react";
import MouseTrail from "@/components/effects/MouseTrail";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col prism-bg">
      <MouseTrail />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
