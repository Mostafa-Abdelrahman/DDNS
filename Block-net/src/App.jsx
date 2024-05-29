import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Buy from "./components/Buy";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Authenticate from "./components/Authenticate";
import ManageDomain from "./components/ManageDomain";



const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Buy/>
        <Pricing />
        <Authenticate/>
        <ManageDomain/>
        
        <Footer />
        
       
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
