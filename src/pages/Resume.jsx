import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
    const resumeFileName = 'Srihari N Narayan Resume 2026.pdf';
    const [numPages, setNumPages] = useState(null);
    const [width, setWidth] = useState(1000);

    useEffect(() => {
        function handleResize() {
            // Cap width at 1000px, or use screen width minus padding for mobile
            const newWidth = Math.min(window.innerWidth - 32, 1000);
            setWidth(newWidth);
        }

        // Initial set
        handleResize();

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
        <div className="resume-page-container">
            {/* Header Section */}
            <div className="resume-header">
                <div className="header-content">
                    <Link to="/" className="btn btn-outline">
                        <i className="fas fa-arrow-left"></i> Back to Homepage
                    </Link>
                    <button onClick={handleDownload} className="btn btn-primary">
                        Download PDF <i className="fas fa-download"></i>
                    </button>
                </div>
            </div>

            {/* PDF Viewer Section */}
            <div className="pdf-viewer-container">
                <Document
                    file={`/${resumeFileName}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="loading-text">
                            <i className="fas fa-spinner fa-spin"></i> Loading Resume...
                        </div>
                    }
                    error={
                        <div className="error-text">
                            Failed to load PDF. Please use the download button.
                        </div>
                    }
                    className="pdf-document"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_wrapper_${index}`} className="page-wrapper">
                            <Page
                                pageNumber={index + 1}
                                width={width}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                className="pdf-page-render"
                            />
                        </div>
                    ))}
                </Document>
            </div>

            <style>{`
                /* Page Container - Dark Background */
                .resume-page-container {
                    min-height: 100vh;
                    background-color: var(--color-bg); /* Black/Grey */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                /* Header - Sticky Top, Glass Effect */
                .resume-header {
                    width: 100%;
                    padding: 1.5rem 0;
                    margin-bottom: 2rem;
                    background: rgba(10, 10, 10, 0.95); /* Matches --color-bg */
                    border-bottom: 1px solid var(--color-surface);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                }

                .header-content {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* PDF Container */
                .pdf-viewer-container {
                    width: 100%;
                    max-width: 1000px;
                    display: flex;
                    justify-content: center;
                    padding-bottom: 4rem;
                }

                .pdf-document {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem; /* Spacing between pages */
                }

                .page-wrapper {
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6); /* Deep shadow, no border */
                    border-radius: 4px; /* Slight round for paper feel */
                    overflow: hidden;
                    background-color: white; /* Ensure paper is white */
                }

                /* Override react-pdf defaults to prevent white outlines */
                .pdf-page-render canvas {
                    display: block !important;
                    height: auto !important;
                    max-width: 100%;
                }
                
                .react-pdf__Page__textContent {
                    border-radius: 4px;
                }

                .loading-text, .error-text {
                    color: var(--color-text-secondary);
                    font-size: 1.2rem;
                    margin-top: 2rem;
                }

                /* Mobile Adjustments */
                @media (max-width: 600px) {
                    .header-content {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .header-content .btn {
                        width: 100%;
                        justify-content: center;
                    }
                    .resume-header {
                        position: relative; /* Unstick on mobile to save screen space */
                    }
                }
            `}</style>
        </div>
    );
}

export default Resume;
