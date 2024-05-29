import { curve, heroBackground, robot } from "../assets";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef, useState } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import { useNavigate } from 'react-router-dom';
// import styles from "../CSSCode/Hero.module.css"; // Assuming you're using CSS Modules


const Hero = () => {
  const parallaxRef = useRef(null);
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [domainDetails, setDomainDetails] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const takenDomains = {
      "example.ejust": { ip: "192.168.1.1", owner: "0x1234567890abcdef" },
      "test.ejust": { ip: "192.168.1.2", owner: "0xfedcba0987654321" },
      "blocknet.ejust": { ip: "192.168.1.3", owner: "0xabcdef0123456789" },
    };

    if (domain) {
      const fullDomain = domain.toLowerCase() + ".ejust";
      if (takenDomains[fullDomain]) {
        setStatus("TAKEN");
        setDomainDetails(takenDomains[fullDomain]);
      } else {
        setStatus("AVAILABLE");
        setDomainDetails(null);
      }
    }
  };

  const handleBuyNow = () => {
    navigate(`../Buy.jsx?domain=${domain.toLowerCase()}.ejust`);
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Explore the Possibilities of&nbsp;Blockchain&nbsp;DNS with {` `}
            <span className="inline-block relative">
              BlockNet{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Unleash the power of blockchain technology with BlockNet. Secure your domains with our decentralized system.
          </p>
          <div className="flex justify-center items-center space-x-2">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter a domain..."
              className="px-40 py-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-4 focus:ring-red-600 focus:border-transparent shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
          {status && (
            <>
              <p className={`mt-4 text-lg ${status === "TAKEN" ? "text-red-600" : "text-green-600"}`}>
                Domain is {status}
              </p>
              {status === "TAKEN" && domainDetails && (
                <div className="mt-4 text-left text-lg text-gray-700">
                  <p><strong>IP Address:</strong> {domainDetails.ip}</p>
                  <p><strong>Owner Address:</strong> {domainDetails.owner}</p>
                </div>
              )}
              {status === "AVAILABLE" && (
                <button
                  onClick={handleBuyNow}
                  className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                  Buy Now
                </button>
              )}
            </>
          )}
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />
                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Code generation"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          <BackgroundCircles />
        </div>
        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
