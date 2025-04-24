import Hero from "../components/Hero";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Payments from "../components/Payment";
import CustomerLogos from "../components/CustomerLogos";
const Home = () => {
return (
    <div className="bg-dark">
    <LandingNav />
    <Hero />
    <Features />
    <Payments />
    <CustomerLogos />
    <Footer />
    </div>
    );
    };
    export default Home;