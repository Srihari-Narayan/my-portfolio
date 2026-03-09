import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

function Contact() {
    const [ref, isVisible] = useScrollReveal();
    const contactMethods = [
        {
            name: 'srihari@umd.edu',
            icon: 'fas fa-university',
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

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
        attachment: null
    });

    const [fileError, setFileError] = React.useState('');

    const [status, setStatus] = React.useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');

        if (file) {
            // Whitelist extensions
            const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            if (!allowedExtensions.includes(fileExtension)) {
                setFileError('Invalid file type. Only PDF, JPG, and PNG are allowed.');
                e.target.value = ''; // Clear input
                setFormData({ ...formData, attachment: null });
                return;
            }

            // Size limit (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setFileError('File size exceeds 5MB limit.');
                e.target.value = ''; // Clear input
                setFormData({ ...formData, attachment: null });
                return;
            }

            setFormData({
                ...formData,
                attachment: file
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const formId = import.meta.env.VITE_FORMSPREE_ID;
        if (!formId) {
            console.error("Formspree ID missing in environment variables");
            setStatus('error');
            return;
        }

        try {
            const finalData = new FormData();
            finalData.append('name', formData.name);
            finalData.append('email', formData.email);
            finalData.append('message', formData.message);
            if (formData.attachment) {
                finalData.append('attachment', formData.attachment);
            }

            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: finalData
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '', attachment: null });
                setFileError('');
                setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
        }
    };

    return (
        <section
            id="contact"
            ref={ref}
            className={`contact section ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="container">
                <h2 className="section-title">Let's Connect</h2>
                <p className="section-description">Feel free to reach out for collaborations, questions, or just to chat about security!</p>

                <div className="contact-content-grid">
                    <div className="contact-left">
                        <div className="contact-methods-list">
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

                    <div className="contact-right">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h3 className="form-title">Send a Message</h3>

                            {status === 'success' ? (
                                <div className="form-success-message" style={{ textAlign: 'center', padding: '2rem' }}>
                                    <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: '#4ade80', marginBottom: '1rem' }}></i>
                                    <h4 style={{ color: 'white' }}>Message Sent!</h4>
                                    <p style={{ color: '#94a3b8' }}>Thanks for reaching out. I'll get back to you soon.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="attachment" className="file-input-label">
                                            <i className="fas fa-paperclip"></i>
                                            {formData.attachment ? formData.attachment.name : 'Attach File (PDF, PNG, JPG - Max 5MB)'}
                                        </label>
                                        <input
                                            type="file"
                                            id="attachment"
                                            name="attachment"
                                            onChange={handleFileChange}
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            className="file-input-hidden"
                                            disabled={status === 'submitting'}
                                        />
                                        {fileError && <p className="file-error-msg">{fileError}</p>}
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="form-input form-textarea"
                                            rows="4"
                                            disabled={status === 'submitting'}
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Something went wrong. Please try again or email me directly.</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary submit-btn"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? (
                                            <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                                        ) : (
                                            <><i className="fas fa-paper-plane"></i> Send Message</>
                                        )}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
