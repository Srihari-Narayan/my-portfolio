import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker
// Using unpkg as a reliable CDN for the worker to avoid build complexity
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
    const resumeFileName = 'Srihari N Narayan Resume 2026.pdf';
    const [numPages, setNumPages] = useState(null);
    const [width, setWidth] = useState(window.innerWidth > 800 ? 800 : window.innerWidth - 40);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Desktop considered >= 1024px

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 800 ? 800 : window.innerWidth - 40);
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/${resumeFileName}`;
        link.download = resumeFileName;
        link.click();
    };

    return (
        <div className="resume-viewer-container">
            <div className="resume-header">
                <Link to="/" className="btn btn-outline">
                    <i className="fas fa-arrow-left"></i> Back to Portfolio
                </Link>
                <h1>Resume</h1>
                <button onClick={handleDownload} className="btn btn-primary">
                    <i className="fas fa-download"></i> Download PDF
                </button>
            </div>

            <div className="pdf-viewer-wrapper">
                {isMobile ? (
                    /* Mobile: Render as Images (react-pdf) */
                    <Document
                        file={`/${resumeFileName}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="loading-spinner">
                                <i className="fas fa-spinner fa-spin"></i> Loading PDF...
                            </div>
                        }
                        error={
                            <div className="error-message">
                                Failed to load PDF. Please use the download button.
                            </div>
                        }
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={width}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="pdf-page"
                            />
                        ))}
                    </Document>
                ) : (
                    /* Desktop: Render as Native Iframe */
                    <iframe
                        src={`/${resumeFileName}#toolbar=0&navpanes=0&view=FitH`}
                        title="Resume PDF"
                        className="desktop-pdf-frame"
                    />
                )}
            </div>

            <style>{`
                .resume-viewer-container {
                    padding-top: 100px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                .resume-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2rem 2rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                }
                .pdf-viewer-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0;
                    background: transparent;
                    border-radius: var(--radius-lg);
                    margin: 0 auto;
                    width: 100%;
                    max-width: 1200px;
                    flex-grow: 1;
                    min-height: 80vh;
                }
                /* Mobile specific styles */
                .pdf-page {
                    margin-bottom: 20px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .pdf-page canvas {
                    border-radius: 8px;
                    max-width: 100%;
                    height: auto !important;
                }
                
                /* Desktop Iframe Styles */
                .desktop-pdf-frame {
                    width: 100%;
                    height: 85vh;
                    border: none;
                    border-radius: 8px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                }

                @media (max-width: 768px) {
                    .resume-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .resume-header h1 {
                        order: -1;
                    }
                    .resume-header .btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}

export default Resume;
