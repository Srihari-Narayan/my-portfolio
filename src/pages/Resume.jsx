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
    const [pageNumber, setPageNumber] = useState(1);
    const [width, setWidth] = useState(window.innerWidth > 800 ? 800 : window.innerWidth - 40);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 800 ? 800 : window.innerWidth - 40);
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
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="pdf-page"
                        />
                    ))}
                </Document>
            </div>

            <style>{`
                .pdf-viewer-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    background: var(--color-surface);
                    border-radius: var(--radius-lg);
                    margin: 0 auto;
                    max-width: 100%;
                    overflow-x: hidden;
                }
                .pdf-page {
                    margin-bottom: 20px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .pdf-page canvas {
                    border-radius: 8px;
                    max-width: 100%;
                    height: auto !important;
                }
            `}</style>
        </div>
    );
}

export default Resume;
