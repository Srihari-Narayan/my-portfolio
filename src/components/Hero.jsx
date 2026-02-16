import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatrixBackground from './MatrixBackground';
import useHackerEffect from '../hooks/useHackerEffect';

function Hero() {
    const [name, setName] = useState("Srihari N Narayan");
    const scrambledName = useHackerEffect(name);

    const toggleName = () => {
        setName(prev => prev === "Srihari N Narayan" ? "AlienInDisguise" : "Srihari N Narayan");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            toggleName();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* TODO: Remove before deployment! */}
            {/* CRITICAL: API credentials and config below - REMOVE THIS! */}
            {/* flag{I_should_have_removed_critical_comments_from_the_source_code} */}
            {/* Production notes: Remember to sanitize all user inputs */}

            <section id="hero" className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span
                                className="gradient-text"
                                onClick={toggleName}
                                style={{ cursor: 'pointer' }}
                            >
                                {scrambledName}
                            </span>
                        </h1>
                        <p className="hero-subtitle">Cybersecurity Enthusiast | CTF Player | Security Researcher | AI Security</p>
                        <p className="hero-description">Passionate about offensive security and securing the future of Artificial Intelligence.</p>

                        <div className="social-links">
                            <Link to="/resume" className="btn btn-primary">
                                <i className="fas fa-file-pdf"></i> View Resume
                            </Link>
                            <a href="https://www.linkedin.com/in/srihari-narayan/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://tryhackme.com/p/srihari.narayan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TryHackMe">
                                <i className="fas fa-flag"></i>
                            </a>
                            <a href="https://github.com/Srihari-Narayan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://medium.com/@srihari.n.narayan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Medium">
                                <i className="fab fa-medium"></i>
                            </a>
                            <a href="https://www.credential.net/profile/sriharinarayan/wallet" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Accredible">
                                <i className="fas fa-certificate"></i>
                            </a>
                        </div>
                    </div>




                </div>
            </section>
        </>
    );
}

export default Hero;
