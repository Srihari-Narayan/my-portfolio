import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

function Contact() {
    const [ref, isVisible] = useScrollReveal();
    const contactMethods = [
        {
            name: 'srihari@umd.edu',
            icon: 'fas fa-envelope',
            url: 'mailto:srihari@umd.edu',
            type: 'email'
        },
        {
            name: 'LinkedIn',
            icon: 'fab fa-linkedin-in',
            url: 'https://www.linkedin.com/in/srihari-narayan/',
            type: 'social'
        }
    ];

    return (
        <section
            id="contact"
            ref={ref}
            className={`contact section ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="container">
                <h2 className="section-title">Let's Connect</h2>
                <p className="section-description">Feel free to reach out for collaborations, questions, or just to chat about security!</p>

                <div className="contact-methods-list" style={{ maxWidth: '600px', margin: '2rem auto 0 auto' }}>
                    {contactMethods.map((method, index) => (
                        <a
                            key={index}
                            href={method.url}
                            target={method.type === 'email' ? '_self' : '_blank'}
                            rel={method.type === 'email' ? '' : 'noopener noreferrer'}
                            className="contact-method-tab"
                        >
                            <div className="contact-method-icon">
                                <i className={method.icon}></i>
                            </div>
                            <span className="contact-method-text">{method.name}</span>
                            <i className="fas fa-chevron-right arrow-icon"></i>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Contact;
