import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import DashboardPreview from "@/components/DashboardPreview";
import ItineraryBuilder from "@/components/ItineraryBuilder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <ExperiencesSection />
      <DashboardPreview />
      <ItineraryBuilder />
      <Footer />
    </main>
  );
}
