import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — Nomad Privé",
  description: "Begin your bespoke journey. Get in touch with Nomad Privé.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ paddingTop: "7rem" }}>
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
