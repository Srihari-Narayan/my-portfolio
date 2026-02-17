import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [commandText, setCommandText] = useState("");
    const [showCTFMessage, setShowCTFMessage] = useState(false);
    const [commandIndex, setCommandIndex] = useState(0);
    const location = useLocation();

    const sequences = [
        {
            command: "cat flag.txt",
            output: "🚩 CTF Challenge: There are 5 hidden flags scattered throughout this website. Can you find them all?"
        },
        {
            command: "whoami",
            output: "srihari"
        }
    ];

    useEffect(() => {
        const runAnimation = () => {
            setCommandText("");
            setShowCTFMessage(false);
            const currentSequence = sequences[commandIndex];
            let index = 0;

            const typingInterval = setInterval(() => {
                if (index < currentSequence.command.length) {
                    setCommandText(currentSequence.command.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        setShowCTFMessage(true);
                    }, 800);
                }
            }, 100);
            return typingInterval;
        };

        const firstInterval = runAnimation();

        const rotationInterval = setInterval(() => {
            setCommandIndex(prev => (prev + 1) % sequences.length);
        }, 10000);

        return () => {
            clearInterval(firstInterval);
            clearInterval(rotationInterval);
        };
    }, [commandIndex]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileMenuOpen(false);
        }
    };

    const navbarStyle = {
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.05)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)'
    };

    // Only show section links on home page
    const isHome = location.pathname === '/';

    // Check if mobile/tablet (screen width < 1024px)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="navbar" style={navbarStyle}>
            <div className="container">
                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    {isHome && (
                        <>
                            <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>About</a></li>
                            <li><a href="#writeups" onClick={(e) => scrollToSection(e, '#writeups')}>Writeups</a></li>
                            <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>Contact</a></li>
                        </>
                    )}
                    {!isHome && <li><Link to="/">Home</Link></li>}
                    <li><Link to="/resume">Resume</Link></li>

                    {/* CTF Sections - Hidden on Mobile */}
                    {!isMobile && (
                        <>
                            <li><Link to="/submit-flags">Submit Flags</Link></li>
                            <li><Link to="/admin">Admin Panel</Link></li>
                        </>
                    )}
                </ul>
                <button
                    className="mobile-menu-toggle"
                    aria-label="Toggle menu"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
            <div className="ctf-announcement-bar">
                <div className="terminal-prompt">
                    <span className="terminal-user">srihari</span>
                    <span className="terminal-at">@</span>
                    <span className="terminal-host">kali</span>
                    <span className="terminal-colon">:</span>
                    <span className="terminal-path">~</span>
                    <span className="terminal-symbol">$</span>
                    <span className="terminal-command">
                        {showCTFMessage
                            ? ` ${sequences[commandIndex].output}`
                            : ` ${commandText}`}
                        {!showCTFMessage && <span className="terminal-cursor"></span>}
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
