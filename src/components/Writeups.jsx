import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { writeups } from '../data/writeups';

function Writeups() {
    const [revealRef, isVisible] = useScrollReveal();

    // Select top 3 latest/pinned writeups for the homepage preview
    const previewPosts = [...writeups]
        .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.date) - new Date(a.date);
        })
        .slice(0, 3);

    return (
        <section
            id="writeups"
            ref={revealRef}
            className={`writeups section ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="container">
                <h2 className="section-title">Writeups & Blog</h2>
                <p className="section-description">CTF writeups, machine walkthroughs, and certification experiences hosted locally on my portfolio</p>

                <div className="blog-grid-static" style={{ marginTop: '2rem' }}>
                    {previewPosts.map((post) => (
                        <div key={post.slug} className="blog-card">
                            <div className="blog-card-date">{post.date}</div>
                            <h3 className="blog-card-title">
                                <Link to={`/writeups/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="blog-card-excerpt">
                                {post.description.replace('Introduction: ', '')}
                            </p>
                            <div className="blog-card-categories">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="category-tag">
                                        {tag.toUpperCase()}
                                    </span>
                                ))}
                                <span className="category-tag" style={{ background: 'rgba(255,255,255,0.03)', color: '#a3a3a3', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    {post.readTime}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="blog-cta">
                    <Link to="/writeups" className="btn btn-outline">
                        View All Writeups & Walkthroughs
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Writeups;
