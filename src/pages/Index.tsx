import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VisaForm from "@/components/VisaForm";
import VisaResults from "@/components/VisaResults";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

interface VisaData {
  nationality: string;
  destination: string;
  purpose: string;
}

const Index = () => {
  const [visaData, setVisaData] = useState<VisaData | null>(null);

  const handleFormSubmit = (data: VisaData) => {
    setVisaData(data);
    setTimeout(() => {
      document.getElementById('visa-checker')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setVisaData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {visaData ? (
          <VisaResults 
            nationality={visaData.nationality}
            destination={visaData.destination}
            purpose={visaData.purpose}
            onReset={handleReset}
          />
        ) : (
          <VisaForm onSubmit={handleFormSubmit} />
        )}
        
        {!visaData && (
          <>
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
