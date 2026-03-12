import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TricolorStripe from "./TricolorStripe";
import ScrollProgressBar from "./ScrollProgressBar";
import BackToTop from "./BackToTop";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <TricolorStripe />
    <ScrollProgressBar />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <BackToTop />
  </div>
);

export default Layout;
