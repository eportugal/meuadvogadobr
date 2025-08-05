import { Navbar } from "@/components/sections/navbar";
import { FooterSection } from "@/components/sections/footer-section";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <FooterSection />
    </>
  );
}
