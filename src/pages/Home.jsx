import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Certifications from '../components/Certifications';
import Writeups from '../components/Writeups';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import MatrixBackground from '../components/MatrixBackground';

function Home() {
    return (
        <>
            <MatrixBackground />
            <Navigation />
            <Hero />
            <About />
            <Certifications />
            <Writeups />
            <Contact />
            <Footer />
        </>
    );
}

export default Home;
