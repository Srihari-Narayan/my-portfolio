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
                    <Link to="/" className="btn btn-primary back-btn">
                        <i className="fas fa-arrow-left"></i> Back to Homepage
                    </Link>

                    <h1 className="resume-title">Resume</h1>

                    <button onClick={handleDownload} className="btn btn-primary download-btn">
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
                    warning={null} /* Suppress warnings */
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
                    padding: 1rem 0;
                    margin-bottom: 2rem;
                    background: rgba(10, 10, 10, 0.95); /* Matches --color-bg */
                    border-bottom: 1px solid var(--color-surface);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                }

                .header-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    gap: 3rem; /* Push buttons away from title */
                }

                /* ... existing styles ... */

                .btn {
                    white-space: nowrap;
                    width: 220px; /* Exact fixed width for identical shape */
                    justify-content: center;
                    display: inline-flex; /* Ensure flex alignment for content */
                    align-items: center;
                }

                /* PDF Container */
                .pdf-viewer-container {
                    width: 100%;
                    max-width: 1000px;
                    display: flex;
                    justify-content: center;
                    padding-bottom: 4rem;
                    padding-left: 1rem;
                    padding-right: 1rem;
                }

                /* ... existing styles ... */
                
                .pdf-document {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem; /* Spacing between pages */
                    width: 100%;
                }

                .page-wrapper {
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6); /* Deep shadow, no border */
                    border-radius: 4px; /* Slight round for paper feel */
                    overflow: hidden;
                    background-color: white; /* Ensure paper is white */
                    transition: transform 0.3s ease;
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
                @media (max-width: 768px) {
                    .header-content {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        padding: 0 1rem;
                    }
                    
                    .resume-title {
                        order: -1; /* Title on top */
                        font-size: 1.5rem;
                        margin-bottom: 0.5rem;
                    }

                    .header-content .btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .resume-header {
                        position: relative; /* Unstick on mobile to save screen space */
                        padding: 1.5rem 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Resume;
