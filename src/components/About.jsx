// Commit boost: added comment for extra commit
import useScrollReveal from '../hooks/useScrollReveal';

function About() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section
            id="about"
            ref={ref}
            className={`about section ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="container">
                <h2 className="section-title">About Me</h2>
                {/* OSINT HINT: My earliest digital footsteps are on LinkedIn... look behind the commits of my high school projects. */}
                <div className="about-content">
                    <p>
                        I am an aspiring <strong>Penetration Tester</strong> pursuing a Master of Engineering in Cybersecurity at the University of Maryland, College Park.
                        My academic focus is currently dedicated to the frontier of <strong>AI Security</strong>, where I research techniques to secure Large Language Models and Deep Learning systems against adversarial threats like prompt injection.
                        Complementing this specialization, I maintain a strong proficiency in traditional Web and Application Security.
                    </p>
                    <p>
                        My practical expertise is heavily shaped by the competitive world of Capture The Flag challenges.
                        Operating under the alias <strong>AlienInDisguise</strong>, I have spent the past year competing at the highest levels.
                        I was a part of the winning team <strong>RandomHackers</strong> which won <strong>Hack the Madness 2026</strong>, hosted by HTB, and our team also won the <strong>BSides Charm 2026 Cloud Village CTF</strong>.
                        My other notable achievements include winning the AI CTF at <strong>BSidesNYC 2025</strong>, finishing as a runner-up in the BugCrowd Student CTF, and placing 10th in the Noob CTF at <strong>DEF CON 33</strong>.
                    </p>
                    <p>
                        I believe in sharing knowledge with the security community, which is why I regularly document my findings on <strong>Medium</strong>.
                        My blog serves as a hub for CTF writeups, challenge machine walkthroughs, and insights from my certification journey.
                        This commitment to growth is mirrored in my work as a <strong>Security Researcher</strong>; through Bugcrowd's Vulnerability Disclosure Programs (VDPs), I successfully discovered and reported critical-level vulnerabilities to the <strong>State of Maryland</strong> as well as <strong>NASA</strong>.
                        Whether I'm conducting bug bounty research or analyzing the latest security literature, I am always exploring the tools and methodologies that define modern security.
                    </p>
                    <p>
                        From developing deep learning-based phishing detectors to investigating WPA2 protocols, my work is characterized by a drive to push the boundaries of technical defense.
                        My ultimate goal is to architect robust, future-proof security for the next generation of AI-powered technologies.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;
