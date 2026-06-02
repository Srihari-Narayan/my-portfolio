import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { writeups } from '../data/writeups';

function WriteupViewer() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [writeup, setWriteup] = useState(null);
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const found = writeups.find(w => w.slug === slug);
        if (found) {
            setWriteup(found);
        } else {
            // Redirect back to list if writeup is not found
            navigate('/writeups');
        }
    }, [slug, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const percent = (window.pageYOffset / totalScroll) * 100;
                setScrollPercent(percent);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!writeup) return null;

    // Custom lightweight markdown micro-parser to render article contents beautifully
    const parseMarkdown = (text) => {
        if (!text) return '';

        const lines = text.split('\n');
        let htmlResult = [];
        let inList = false;
        let inCodeBlock = false;
        let codeContent = [];
        let codeLang = '';

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // 1. Code Block Parsing (```lang)
            if (line.trim().startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeLang = line.replace('```', '').trim();
                    codeContent = [];
                } else {
                    inCodeBlock = false;
                    // Render code block
                    htmlResult.push(
                        `<div class="code-block-container" key="code-${i}">
                            <div class="code-block-header">
                                <span class="code-lang">${codeLang || 'text'}</span>
                                <button class="copy-code-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent); this.innerHTML='<i class=&quot;fas fa-check&quot;></i> Copied'; setTimeout(() => this.innerHTML='<i class=&quot;far fa-copy&quot;></i> Copy', 2000)">
                                    <i class="far fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre><code>${codeContent.join('\n')}</code></pre>
                         </div>`
                    );
                }
                continue;
            }

            if (inCodeBlock) {
                // Escape HTML inside code block
                const escapedLine = line
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                codeContent.push(escapedLine);
                continue;
            }

            // 2. Alert Box Parsing (> [!TIP], > [!WARNING], > [!NOTE])
            if (line.trim().startsWith('> [!')) {
                const alertType = line.match(/> \[\!(.*)\]/)?.[1] || 'NOTE';
                let alertLines = [];
                i++; // Go to contents of blockquote
                while (i < lines.length && lines[i].trim().startsWith('>')) {
                    alertLines.push(lines[i].replace(/^\s*>\s*/, ''));
                    i++;
                }
                i--; // Step back for loop increments

                const alertClass = alertType.toLowerCase();
                const iconMap = {
                    tip: 'fas fa-lightbulb',
                    warning: 'fas fa-exclamation-triangle',
                    important: 'fas fa-circle-exclamation',
                    note: 'fas fa-info-circle'
                };
                const icon = iconMap[alertClass] || 'fas fa-info-circle';

                htmlResult.push(
                    `<div class="alert-box alert-${alertClass}" key="alert-${i}">
                        <div class="alert-title">
                            <i class="${icon}"></i> ${alertType.toUpperCase()}
                        </div>
                        <div class="alert-content">
                            ${parseInlineMarkdown(alertLines.join(' '))}
                        </div>
                     </div>`
                );
                continue;
            }

            // 3. Standard Headers
            if (line.startsWith('### ')) {
                htmlResult.push(`<h3 class="article-h3">${parseInlineMarkdown(line.slice(4))}</h3>`);
                continue;
            }
            if (line.startsWith('## ')) {
                htmlResult.push(`<h2 class="article-h2">${parseInlineMarkdown(line.slice(3))}</h2>`);
                continue;
            }
            if (line.startsWith('# ')) {
                htmlResult.push(`<h1 class="article-h1">${parseInlineMarkdown(line.slice(2))}</h1>`);
                continue;
            }

            // 4. Horizontal Rules
            if (line.trim() === '---') {
                htmlResult.push('<hr class="article-hr" />');
                continue;
            }

            // 5. Unordered List Items (* or -)
            if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                if (!inList) {
                    inList = true;
                    htmlResult.push('<ul class="article-ul">');
                }
                htmlResult.push(`<li>${parseInlineMarkdown(line.replace(/^\s*[\*\-]\s+/, ''))}</li>`);
                continue;
            } else if (inList && line.trim() === '') {
                inList = false;
                htmlResult.push('</ul>');
                continue;
            }

            // 6. Paragraphs (Skip empty lines)
            if (line.trim() !== '') {
                htmlResult.push(`<p class="article-p">${parseInlineMarkdown(line)}</p>`);
            }
        }

        // Close list if file ends inside one
        if (inList) {
            htmlResult.push('</ul>');
        }

        return htmlResult.join('\n');
    };

    // Parse bold, code span, images, links, etc.
    const parseInlineMarkdown = (text) => {
        return text
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="article-inline-img" />') // Images
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="article-link">$1</a>') // Links
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold **text**
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic *text*
            .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>'); // Inline code `code`
    };

    return (
        <div className="viewer-page-container">
            {/* Reading progress bar */}
            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${scrollPercent}%` }}></div>
            </div>

            <Navigation />

            <main className="viewer-main-content">
                <article className="article-body-container">
                    {/* Back Button */}
                    <div className="back-navigation">
                        <Link to="/writeups" className="back-link-btn">
                            <i className="fas fa-arrow-left"></i> Back to Articles
                        </Link>
                    </div>

                    {/* Metadata Header */}
                    <header className="article-viewer-header">
                        <div className="article-meta-row">
                            <div className="author-details">
                                <div className="author-avatar-large">
                                    <i className="fas fa-user-secret"></i>
                                </div>
                                <div className="author-text-details">
                                    <span className="author-real-name">Srihari N Narayan</span>
                                    <div className="meta-subtext">
                                        <span>{writeup.date}</span>
                                        <span className="separator">•</span>
                                        <span>{writeup.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1 className="article-full-title">{writeup.title}</h1>
                    </header>

                    {/* Pinned image/thumbnail fallback if any */}
                    {writeup.pdf ? (
                        <div className="article-full-cover pdf-cover-container">
                            <iframe src={`${writeup.pdf}#toolbar=0&navpanes=0&view=Fit`} title={writeup.title} className="pdf-iframe-full" />
                        </div>
                    ) : writeup.thumbnail ? (
                        <div className="article-full-cover">
                            <img src={writeup.thumbnail} alt={writeup.title} />
                        </div>
                    ) : (
                        <div className="article-full-cover cover-placeholder">
                            <div className="placeholder-content">
                                <i className="fas fa-terminal"></i>
                                <span>Srihari N Narayan | Security Walkthrough</span>
                            </div>
                        </div>
                    )}

                    {/* Formatted Markdown Content */}
                    <div 
                        className="article-rich-text"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(writeup.content) }}
                    />

                    {/* Article Footer */}
                    <footer className="article-viewer-footer">
                        <div className="back-navigation" style={{ marginTop: '2rem' }}>
                            <Link to="/writeups" className="back-link-btn">
                                <i className="fas fa-arrow-left"></i> Back to Articles
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>

            <Footer />

            <style>{`
                .viewer-page-container {
                    min-height: 100vh;
                    background-color: var(--color-bg);
                    display: flex;
                    flex-direction: column;
                }

                /* Progress Bar */
                .progress-bar-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: transparent;
                    z-index: 9999;
                }

                .progress-bar-fill {
                    height: 100%;
                    background: var(--color-red);
                    box-shadow: 0 0 10px var(--color-red);
                    width: 0%;
                    transition: width 0.1s ease;
                }

                .viewer-main-content {
                    flex: 1;
                    padding-top: 130px;
                    padding-bottom: 80px;
                }

                .article-body-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .back-navigation {
                    margin-bottom: 2rem;
                }

                .back-link-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }

                .back-link-btn:hover {
                    color: var(--color-red);
                }

                /* Header Styling */
                .article-viewer-header {
                    margin-bottom: 2.5rem;
                }

                .article-meta-row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .author-details {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .author-avatar-large {
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    background: rgba(220, 20, 60, 0.1);
                    border: 1px solid rgba(220, 20, 60, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-red);
                    font-size: 1.4rem;
                    box-shadow: 0 0 15px rgba(220, 20, 60, 0.15);
                }

                .author-text-details {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .author-real-name {
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                }

                .meta-subtext {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .separator {
                    color: rgba(255, 255, 255, 0.2);
                }

                .article-full-title {
                    font-family: var(--font-heading);
                    font-size: 2.2rem;
                    line-height: 1.3;
                    color: var(--color-text-primary);
                    margin: 0;
                }

                @media (max-width: 576px) {
                    .article-full-title {
                        font-size: 1.8rem;
                    }
                }

                /* Cover image */
                .article-full-cover {
                    width: 100%;
                    max-height: 500px;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    border: 1px solid var(--glass-border);
                    margin-bottom: 3rem;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(10, 10, 10, 0.5);
                }

                .article-full-cover img {
                    max-width: 100%;
                    max-height: 500px;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                }

                .cover-placeholder {
                    background: linear-gradient(135deg, rgba(220, 20, 60, 0.05) 0%, rgba(10, 10, 10, 0.95) 100%);
                    border-color: rgba(220, 20, 60, 0.25);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .placeholder-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    color: var(--color-text-secondary);
                }

                .placeholder-content i {
                    font-size: 3rem;
                    color: var(--color-red);
                    filter: drop-shadow(0 0 15px rgba(220, 20, 60, 0.5));
                }

                /* Rich Text Styles - Structured Cozy Typography */
                .article-rich-text {
                    font-family: var(--font-body);
                    color: rgba(255, 255, 255, 0.85); /* Highly readable, slightly off-white */
                    font-size: 1.15rem;
                    line-height: 1.8;
                    margin-bottom: 4rem;
                }

                .article-p {
                    margin-bottom: 1.75rem;
                }

                .article-h2 {
                    font-family: var(--font-heading);
                    color: var(--color-text-primary);
                    font-size: 1.75rem;
                    margin: 3rem 0 1.25rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    padding-bottom: 0.5rem;
                }

                .article-h3 {
                    font-family: var(--font-heading);
                    color: var(--color-text-primary);
                    font-size: 1.35rem;
                    margin: 2.25rem 0 1rem 0;
                }

                .article-hr {
                    border: none;
                    border-top: 1px solid var(--glass-border);
                    margin: 2.5rem 0;
                }

                .article-ul {
                    margin-bottom: 1.75rem;
                    padding-left: 1.5rem;
                    list-style-type: square;
                }

                .article-ul li {
                    margin-bottom: 0.6rem;
                }

                .inline-code {
                    background: rgba(220, 20, 60, 0.1);
                    color: var(--color-red);
                    padding: 0.2rem 0.4rem;
                    border-radius: var(--radius-sm);
                    font-size: 0.95rem;
                    font-family: 'Courier New', Courier, monospace;
                    border: 1px solid rgba(220, 20, 60, 0.2);
                }

                /* Code Block styling */
                .code-block-container {
                    margin: 2rem 0;
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    background: rgba(10, 10, 10, 0.85);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }

                .code-block-header {
                    background: rgba(255, 255, 255, 0.02);
                    padding: 0.6rem 1.2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .code-lang {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--color-text-secondary);
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                .copy-code-btn {
                    background: transparent;
                    border: none;
                    color: var(--color-text-secondary);
                    font-size: 0.8rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: color 0.3s ease;
                }

                .copy-code-btn:hover {
                    color: var(--color-white);
                }

                .code-block-container pre {
                    padding: 1.25rem;
                    margin: 0;
                    overflow-x: auto;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: #d1d5db;
                }

                /* Alert Boxes (GitHub Alerts styled premium) */
                .alert-box {
                    margin: 2rem 0;
                    padding: 1.25rem 1.5rem;
                    border-radius: var(--radius-md);
                    border-left: 4px solid transparent;
                    backdrop-filter: blur(10px);
                }

                .alert-note {
                    background: rgba(59, 130, 246, 0.05);
                    border-color: #3b82f6;
                    border-left-width: 4px;
                }

                .alert-tip {
                    background: rgba(16, 185, 129, 0.05);
                    border-color: #10b981;
                    border-left-width: 4px;
                }

                .alert-warning {
                    background: rgba(245, 158, 11, 0.05);
                    border-color: #f59e0b;
                    border-left-width: 4px;
                }

                .alert-important {
                    background: rgba(220, 20, 60, 0.05);
                    border-color: var(--color-red);
                    border-left-width: 4px;
                }

                .alert-title {
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    letter-spacing: 0.5px;
                }

                .alert-note .alert-title { color: #3b82f6; }
                .alert-tip .alert-title { color: #10b981; }
                .alert-warning .alert-title { color: #f59e0b; }
                .alert-important .alert-title { color: var(--color-red); }

                .alert-content {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.75);
                }

                /* Footer of viewer */
                .article-viewer-footer {
                    border-top: 1px solid var(--glass-border);
                    padding-top: 2rem;
                    margin-top: 2rem;
                }

                .metrics-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .clap-btn {
                    background: rgba(220, 20, 60, 0.1);
                    border: 1px solid rgba(220, 20, 60, 0.3);
                    color: var(--color-text-primary);
                    padding: 0.6rem 1.2rem;
                    border-radius: 30px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .clap-btn:hover {
                    border-color: var(--color-red);
                    background: rgba(220, 20, 60, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(220, 20, 60, 0.25);
                }

                .clap-btn.clapped {
                    background: var(--color-red);
                    border-color: var(--color-red);
                    color: white;
                }

                .share-buttons-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }

                .share-btn {
                    background: transparent;
                    border: 1px solid var(--glass-border);
                    color: var(--color-text-secondary);
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .share-btn:hover {
                    color: var(--color-white);
                    border-color: var(--color-red);
                    background: rgba(220, 20, 60, 0.1);
                }

                .article-inline-img {
                     display: block;
                     max-width: 100%;
                     max-height: 500px;
                     width: auto;
                     height: auto;
                     margin: 2.5rem auto;
                     border-radius: var(--radius-md);
                     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                     border: 1px solid var(--glass-border);
                 }

                .article-link {
                    color: var(--color-red);
                    text-decoration: none;
                    font-weight: 500;
                    border-bottom: 1px dashed rgba(220, 20, 60, 0.4);
                    transition: all 0.3s ease;
                }

                .article-link:hover {
                    color: var(--color-text-primary);
                    border-bottom-color: var(--color-text-primary);
                }

                 .pdf-iframe-full {
                     width: 100%;
                     aspect-ratio: 1.414;
                     border: none;
                     border-radius: var(--radius-lg);
                     display: block;
                 }

                 .pdf-cover-container {
                     width: 100%;
                     height: auto;
                     max-height: none !important;
                     overflow: hidden;
                     border-radius: var(--radius-lg);
                     box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
                     border: 1px solid var(--glass-border);
                 }
            `}</style>
        </div>
    );
}

export default WriteupViewer;
