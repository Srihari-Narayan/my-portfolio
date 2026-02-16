import { Link } from 'react-router-dom';

function Resume() {
    const resumeFileName = 'Srihari N Narayan Resume 2026.pdf';

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

            <div className="pdf-viewer">
                <iframe
                    src={`/${resumeFileName}`}
                    title="Resume PDF"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}

export default Resume;
