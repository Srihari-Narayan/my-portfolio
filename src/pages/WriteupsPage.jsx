import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { writeups } from '../data/writeups';

function WriteupsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [filteredWriteups, setFilteredWriteups] = useState(writeups);

    // Categories derived from tags
    const tabs = [
        { id: 'all', label: 'All Articles' },
        { id: 'htb', label: 'HTB Walkthroughs' },
        { id: 'thm', label: 'THM Walkthroughs' },
        { id: 'certs', label: 'Certifications' }
    ];

    useEffect(() => {
        if (activeTab === 'all') {
            // Pinned articles first, then by date (newer first)
            const sorted = [...writeups].sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return new Date(b.date) - new Date(a.date);
            });
            setFilteredWriteups(sorted);
        } else {
            const filtered = writeups.filter(w => w.tags.includes(activeTab));
            setFilteredWriteups(filtered);
        }
        
        // Scroll to top of list
        window.scrollTo(0, 0);
    }, [activeTab]);

    // Helper to render SVG/CSS visual placeholder for thumbnails
    const renderThumbnail = (writeup) => {
        if (writeup.thumbnail) {
            return (
                <div className="article-thumbnail">
                    <img src={writeup.thumbnail} alt={writeup.title} />
                </div>
            );
        }
        
        // Return a premium CSS/SVG placeholder card
        return (
            <div className="article-thumbnail placeholder-gradient">
                <div className="placeholder-icon">
                    {writeup.tags.includes('htb') ? (
                        <i className="fas fa-cube"></i>
                    ) : writeup.tags.includes('ai-security') ? (
                        <i className="fas fa-brain"></i>
                    ) : (
                        <i className="fas fa-terminal"></i>
                    )}
                </div>
                <div className="placeholder-tag">{writeup.tags[0]?.toUpperCase()}</div>
            </div>
        );
    };

    return (
        <div className="writeups-page-container">
            <Navigation />

            <main className="writeups-main-content">
                <div className="writeups-container">
                    <div className="writeups-layout">
                        {/* Main Feed Column */}
                        <div className="feed-column">
                            <h1 className="dashboard-title">Dashboard & Articles</h1>
                            <p className="dashboard-subtitle">A collection of security writeups, walkthroughs, and research notes moved locally from Medium.</p>

                            {/* Medium-style Tabs */}
                            <div className="dashboard-tabs">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Articles List */}
                            <div className="articles-list">
                                {filteredWriteups.length > 0 ? (
                                    filteredWriteups.map((writeup, index) => (
                                        <article key={writeup.slug} className="article-item">
                                            {/* Pinned Tag */}
                                            {writeup.pinned && (
                                                <div className="pinned-header">
                                                    <i className="fas fa-thumbtack"></i> Pinned
                                                </div>
                                            )}

                                            <div className="article-inner-grid">
                                                {/* Text Content */}
                                                <div className="article-text-section">
                                                    {/* Author Row */}
                                                    <div className="author-row">
                                                        <div className="author-avatar">
                                                            <i className="fas fa-user-secret"></i>
                                                        </div>
                                                        <span className="author-name">Srihari N Narayan</span>
                                                        <span className="bullet-separator">•</span>
                                                        <span className="publish-date">{writeup.date}</span>
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="article-item-title">
                                                        <Link to={`/writeups/${writeup.slug}`}>{writeup.title}</Link>
                                                    </h2>

                                                    {/* Subtitle/Excerpt */}
                                                    <p className="article-item-description">{writeup.description}</p>

                                                    {/* Bottom Metadata bar */}
                                                    <div className="article-item-footer">
                                                        <div className="footer-left">
                                                            <span className="footer-metric">
                                                                <i className="fas fa-hands-clapping"></i> {writeup.claps}
                                                            </span>
                                                            <span className="footer-metric">
                                                                <i className="far fa-comment"></i> {writeup.responses}
                                                            </span>
                                                            <span className="read-time-badge">{writeup.readTime}</span>
                                                        </div>
                                                        <div className="footer-right">
                                                            <button className="footer-action-btn" aria-label="Bookmark">
                                                                <i className="far fa-bookmark"></i>
                                                            </button>
                                                            <button className="footer-action-btn" aria-label="More Options">
                                                                <i className="fas fa-ellipsis-h"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Thumbnail / Image */}
                                                {renderThumbnail(writeup)}
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <i className="fas fa-folder-open"></i>
                                        <p>No articles found in this category.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <aside className="sidebar-column">
                            <div className="sidebar-widget profile-widget">
                                <div className="widget-header">
                                    <div className="profile-secret-icon">
                                        <i className="fas fa-shield-halved"></i>
                                    </div>
                                    <h3>Srihari N Narayan</h3>
                                </div>
                                <p className="profile-bio">Cybersecurity Enthusiast | CTF Player | Security Researcher | Master of Engineering in Cybersecurity at UMD.</p>
                                <div className="profile-stats">
                                    <div className="stat-box">
                                        <span className="stat-num">{writeups.length}</span>
                                        <span className="stat-label">Articles</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="stat-num">{writeups.filter(w => w.pinned).length}</span>
                                        <span className="stat-label">Pinned</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-widget tags-widget">
                                <h3>Recommended Topics</h3>
                                <div className="topics-cloud">
                                    <span className="topic-tag" onClick={() => setActiveTab('htb')}>HTB</span>
                                    <span className="topic-tag" onClick={() => setActiveTab('thm')}>TryHackMe</span>
                                    <span className="topic-tag" onClick={() => setActiveTab('certs')}>Certifications</span>
                                    <span className="topic-tag">AI Security</span>
                                    <span className="topic-tag">Penetration Testing</span>
                                    <span className="topic-tag">Adversarial ML</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />

            <style>{`
                .writeups-page-container {
                    min-height: 100vh;
                    background-color: var(--color-bg);
                    display: flex;
                    flex-direction: column;
                }

                .writeups-main-content {
                    flex: 1;
                    padding-top: 120px;
                    padding-bottom: 60px;
                }

                .writeups-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .writeups-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }

                @media (min-width: 992px) {
                    .writeups-layout {
                        grid-template-columns: 2.2fr 1fr;
                    }
                }

                /* Dashboard & Titles */
                .dashboard-title {
                    font-family: var(--font-heading);
                    color: var(--color-text-primary);
                    font-size: 2.5rem;
                    margin: 0 0 0.5rem 0;
                    background: linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .dashboard-subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }

                /* Medium-style Tabs */
                .dashboard-tabs {
                    display: flex;
                    gap: 1.5rem;
                    border-bottom: 1px solid var(--glass-border);
                    margin-bottom: 2.5rem;
                    overflow-x: auto;
                    padding-bottom: 1px;
                }

                .dashboard-tab {
                    background: transparent;
                    border: none;
                    color: var(--color-text-secondary);
                    padding: 0.75rem 0;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    position: relative;
                    white-space: nowrap;
                    transition: color 0.3s ease;
                }

                .dashboard-tab:hover {
                    color: var(--color-text-primary);
                }

                .dashboard-tab.active {
                    color: var(--color-red);
                    font-weight: 600;
                }

                .dashboard-tab.active::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: var(--color-red);
                }

                /* Articles List */
                .articles-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .article-item {
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 2.5rem;
                }

                .article-item:last-child {
                    border-bottom: none;
                }

                .pinned-header {
                    color: var(--color-text-secondary);
                    font-size: 0.85rem;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .pinned-header i {
                    font-size: 0.8rem;
                }

                .article-inner-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    align-items: start;
                }

                @media (min-width: 576px) {
                    .article-inner-grid {
                        grid-template-columns: 1fr 140px;
                        gap: 2rem;
                    }
                }

                /* Author Row */
                .author-row {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 0.75rem;
                    font-size: 0.85rem;
                }

                .author-avatar {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: rgba(220, 20, 60, 0.15);
                    border: 1px solid rgba(220, 20, 60, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-red);
                    font-size: 0.75rem;
                }

                .author-name {
                    color: var(--color-text-primary);
                    font-weight: 500;
                }

                .bullet-separator {
                    color: rgba(255, 255, 255, 0.25);
                }

                .publish-date {
                    color: var(--color-text-secondary);
                }

                /* Article Texts */
                .article-item-title {
                    font-family: var(--font-heading);
                    font-size: 1.4rem;
                    line-height: 1.4;
                    margin: 0 0 0.5rem 0;
                }

                .article-item-title a {
                    color: var(--color-text-primary);
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .article-item-title a:hover {
                    color: var(--color-red);
                }

                .article-item-description {
                    color: var(--color-text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0 0 1.25rem 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Bottom Metadatas */
                .article-item-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                }

                .footer-left {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                }

                .footer-metric {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .read-time-badge {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.15rem 0.5rem;
                    border-radius: var(--radius-sm);
                }

                .footer-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .footer-action-btn {
                    background: transparent;
                    border: none;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    padding: 0.25rem;
                    font-size: 0.95rem;
                    transition: color 0.3s ease;
                }

                .footer-action-btn:hover {
                    color: var(--color-red);
                }

                /* Thumbnails & Fallbacks */
                .article-thumbnail {
                    width: 100%;
                    height: 140px;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    background: #1a1a1a;
                    border: 1px solid var(--glass-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .article-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .placeholder-gradient {
                    background: linear-gradient(135deg, rgba(220, 20, 60, 0.05) 0%, rgba(10, 10, 10, 0.9) 100%);
                    border: 1px solid rgba(220, 20, 60, 0.25);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                    transition: border-color 0.3s ease;
                }

                .article-inner-grid:hover .placeholder-gradient {
                    border-color: var(--color-red);
                }

                .placeholder-icon {
                    font-size: 2.2rem;
                    color: var(--color-red);
                    filter: drop-shadow(0 0 10px rgba(220, 20, 60, 0.4));
                }

                .placeholder-tag {
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: var(--color-text-secondary);
                    background: rgba(220, 20, 60, 0.1);
                    padding: 0.1rem 0.4rem;
                    border-radius: var(--radius-sm);
                    border: 1px solid rgba(220, 20, 60, 0.2);
                }

                /* Sidebar Layout */
                .sidebar-column {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .sidebar-widget {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-lg);
                    padding: 1.75rem;
                    backdrop-filter: blur(10px);
                }

                .sidebar-widget h3 {
                    font-family: var(--font-heading);
                    font-size: 1.15rem;
                    color: var(--color-text-primary);
                    margin: 0 0 1rem 0;
                }

                /* Profile Widget */
                .profile-widget {
                    text-align: center;
                    border-top: 2px solid var(--color-red);
                }

                .widget-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .profile-secret-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(220, 20, 60, 0.1);
                    border: 1px solid rgba(220, 20, 60, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-red);
                    font-size: 1.8rem;
                    box-shadow: 0 0 20px rgba(220, 20, 60, 0.2);
                }

                .profile-bio {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                    margin-bottom: 1.5rem;
                }

                .profile-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    border-top: 1px solid var(--glass-border);
                    padding-top: 1.25rem;
                }

                .stat-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .stat-num {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--color-text-secondary);
                }

                /* Tags Widget */
                .topics-cloud {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                }

                .topic-tag {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .topic-tag:hover {
                    color: var(--color-white);
                    border-color: var(--color-red);
                    background: rgba(220, 20, 60, 0.15);
                }

                /* Empty state */
                .empty-state {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: var(--color-text-secondary);
                }

                .empty-state i {
                    font-size: 3rem;
                    color: rgba(255, 255, 255, 0.1);
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
}

export default WriteupsPage;
