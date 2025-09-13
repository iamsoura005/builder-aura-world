import Header from "./Header";
import Footer from "./Footer";
import { PropsWithChildren } from "react";
import MouseTrail from "@/components/effects/MouseTrail";
import CustomCursor from "@/components/effects/CustomCursor";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col prism-bg md:cursor-none">
      <MouseTrail />
      <CustomCursor />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
