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
    const [width, setWidth] = useState(window.innerWidth > 1000 ? 1000 : window.innerWidth - 40);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 1000 ? 1000 : window.innerWidth - 40);
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
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="pdf-page"
                        />
                    ))}
                </Document>
            </div>

            <style>{`
                html, body {
                    overflow-y: auto !important; /* Force scrolling */
                }
                .resume-viewer-container {
                    padding-top: 100px;
                    min-height: 100vh;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    overflow-y: visible; /* Ensure content flows */
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
                    padding: 0 0 50px 0; /* Add bottom padding */
                    background: transparent;
                    border-radius: var(--radius-lg);
                    margin: 0 auto;
                    width: 100%;
                    max-width: 1200px;
                    flex-grow: 1;
                    overflow: visible;
                }
                .pdf-page {
                    margin-bottom: 20px;
                    box-shadow: none !important;
                    background: transparent !important;
                    outline: none !important;
                    border: none !important;
                }
                .react-pdf__Page {
                    background-color: transparent !important;
                }
                .pdf-page canvas {
                    border-radius: 8px;
                    max-width: 100%;
                    height: auto !important;
                    display: block; /* Removes inline whitespace */
                }
                /* Text Selection Styles */
                .plugin--text-layer {
                    /* Fix for text layer alignment if needed */
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
