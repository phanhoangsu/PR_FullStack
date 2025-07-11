import React, { useState } from "react";
import ImgBody from "../assets/body-bg.jpg";

import HeroSection from "../components/services/HeroSection";
import StatsCards from "../components/services/StatsCards";
import ServicesList from "../components/services/ServicesList";
import Header from "../components/services/Header";
import ContactPage from "./ContactPage";
import PricesSection from "../components/services/PricesSection";
import AboutSection from "../components/services/AboutSection";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/style.css";
import GallerySection from "../components/services/GallerySection";
import BlogSection from "../components/services/BlogSection";

const ServicePage = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <HeroSection />
            {/* <StatsCards /> */}
            <ServicesList />
            <PricesSection />
          </>
        );
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactPage />;
      case "services":
        return <ServicesList />;
      case "prices":
        return <PricesSection />;
      case "gallery":
        return <GallerySection />; // ✅ thêm dòng này
      case "blog":
        return <BlogSection />; // ✅ thêm dòng này
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${ImgBody})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header onTabChange={setActiveTab} />
      <TransitionGroup component={null}>
        <CSSTransition key={activeTab} timeout={800} classNames="fade-scale">
          <div className="absolute left-0 top-0 w-full z-10 px-4">
            {renderTabContent()}
          </div>
        </CSSTransition>
      </TransitionGroup>

      {/* FOOTER */}
      <footer id="footer" className="relative z-0 pt-10 mt-10">
        <div id="footer-top">
          <div className="container mx-auto text-center">
            <ul className="social-footer flex justify-center gap-6 mb-6">
              <li>
                <a
                  href="https://www.facebook.com"
                  className="text-blue-600 hover:text-blue-800 text-2xl transition transform hover:scale-125"
                  title="Facebook"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="text-blue-700 hover:text-blue-900 text-2xl transition transform hover:scale-125"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Zalo"
                  className="transition transform hover:scale-125"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                    alt="Zalo"
                    className="w-6 h-6 inline"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="text-blue-400 hover:text-blue-600 text-2xl transition transform hover:scale-125"
                  title="Twitter"
                >
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-500 hover:text-pink-700 text-2xl transition transform hover:scale-125"
                  title="Dribbble"
                >
                  <i className="fa fa-dribbble"></i>
                </a>
              </li>
            </ul>

            <p className="footer-quote text-white italic text-base px-4 mb-6">
              "People Who Are Crazy Enough To Think They Can Change The World,
              Are The Ones Who Do."
              <br />
              <span className="footer-quote-author font-semibold text-sm">
                Rob Siltanen
              </span>
            </p>
          </div>
        </div>

        <div id="footer-bottom" className="bg-black bg-opacity-60 py-4">
          <div className="container mx-auto text-center text-white text-sm">
            <p className="footer-bottom-text2">
              © 2017, Beardz by{" "}
              <a
                href="http://www.dotrex.co/"
                className="underline hover:text-gray-300"
              >
                DotRex
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;
