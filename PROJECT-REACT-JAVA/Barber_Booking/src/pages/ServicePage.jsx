import HeroSection from "../components/services/HeroSection";
import StatsCards from "../components/services/StatsCards";
import ServicesList from "../components/services/ServicesList";
import { useState } from "react";
import Header from "../components/services/Header";
import ContactPage from "./ContactPage";

const ServicePage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <div className="container mx-auto px-4 py-8"> */}
      <div className="w-full bg-dark py-5">
        <StatsCards />
        <ServicesList />
      </div>
    </div>
  );
};

export default ServicePage;
