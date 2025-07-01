import HeroSection from "../components/services/HeroSection";
import StatsCards from "../components/services/StatsCards";
import ServicesList from "../components/services/ServicesList";
import { useState } from "react";
import Header from "../components/services/Header";
import ContactPage from "./ContactPage";
import PricesSection from "../components/services/PricesSection";

const ServicePage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  return (
    <div className="min-h-screen ">
      <Header />
      <HeroSection />

      {/* <div className="container mx-auto px-4 py-8"> */}
      <div className="w-full bg-dark py-5">
        <StatsCards />
        <ServicesList />
        <PricesSection />
        <ContactPage />
        <footer id="footer">
          <div id="footer-top">
            <div className="container">
              <ul className="social-footer">
                <li>
                  <a
                    href="https://www.facebook.com"
                    className="btn-default btn-wapasha"
                    data-toggle="tooltip"
                    data-placement="top"
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
                    className="text-black hover:text-blue-700 text-xl transition transform hover:scale-125"
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
                    className="text-black hover:text-blue-500 text-xl transition transform hover:scale-125"
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
                    className="btn-default btn-wapasha"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Twitter"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="btn-default btn-wapasha"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Dribbble"
                  >
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
              </ul>
              <p className="footer-quote">
                "People Who Are Crazy Enough To Think They Can Change The World,
                Are The Ones Who Do."
                <br />
                <span className="footer-quote-author">Rob Siltanen</span>
              </p>
            </div>
          </div>
          <div id="footer-bottom">
            <div className="container">
              <p className="footer-bottom-text2">
                <span>
                  © 2017, Beardz by <a href="http://www.dotrex.co/">DotRex</a>.
                  All Rights Reserved.
                </span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ServicePage;
