import { useState, useEffect, useRef } from 'react';
import { useMediumFeed } from '../hooks/useMediumFeed';
import useScrollReveal from '../hooks/useScrollReveal';

function Writeups() {
    const [revealRef, isVisible] = useScrollReveal();
    const { posts, loading, error } = useMediumFeed('srihari.n.narayan');
    const [activeFilter, setActiveFilter] = useState('all');
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const filterPosts = (filter) => {
        setActiveFilter(filter);
    };

    const filteredPosts = posts.filter(post => {
        if (activeFilter === 'all') return true;
        // The API might categorize them differently, relying on manual check for now
        // Assuming 'ctf' filter maps to actual CTF writeups if available
        return post.autoCategories.includes(activeFilter);
    });

    // Duplicate posts for infinite effect (3 sets for bi-directional safety)
    const displayPosts = (filteredPosts.length > 0) ? [...filteredPosts, ...filteredPosts, ...filteredPosts] : [];

    // Initialize scroll position to the middle set
    useEffect(() => {
        if (scrollRef.current && displayPosts.length > 0) {
            const scrollContainer = scrollRef.current;
            // Wait for layout to settle slightly
            setTimeout(() => {
                // Approximate width of one set
                const singleSetWidth = scrollContainer.scrollWidth / 3;
                // Start at the beginning of the second set
                if (scrollContainer.scrollLeft < 100) {
                    scrollContainer.scrollLeft = singleSetWidth;
                }
            }, 100);
        }
    }, [displayPosts.length, activeFilter]);

    // Infinite Scroll Logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        // Re-enabled for mobile as requested (horizontal carousel)

        if (!scrollContainer || loading || error || isPaused || filteredPosts.length === 0) return;

        // Skip auto-scroll for the placeholder tabs
        if (activeFilter === 'machines' || activeFilter === 'certs') return;

        let animationFrameId;
        // Use a variable to track sub-pixel movement
        let scrollAccumulator = 0;
        const scrollSpeed = 0.5; // Adjust this value to change speed (0.5 = half speed)

        const scroll = () => {
            if (scrollContainer) {
                const singleSetWidth = scrollContainer.scrollWidth / 3;

                // Accumulate fractional scroll amount
                scrollAccumulator += scrollSpeed;

                // When we have at least 1 pixel to scroll
                if (scrollAccumulator >= 1) {
                    const pixelsToScroll = Math.floor(scrollAccumulator);
                    scrollContainer.scrollLeft += pixelsToScroll;
                    scrollAccumulator -= pixelsToScroll;
                }

                // Wrap forward: If we reach end of 2nd set (start of 3rd), jump to end of 1st set (start of 2nd)
                // Range 0..W..2W..3W
                // Targeted range: W..2W
                if (scrollContainer.scrollLeft >= 2 * singleSetWidth) {
                    scrollContainer.scrollLeft = singleSetWidth;
                }
                // Wrap backward protection (though auto-scroll goes right)
                // Just in case manual interaction pushed it too far left
                else if (scrollContainer.scrollLeft <= 0) {
                    scrollContainer.scrollLeft = singleSetWidth;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isPaused, loading, error, filteredPosts, activeFilter]);


    const headerScrollLeft = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const singleSetWidth = scrollContainer.scrollWidth / 3;
            const scrollAmount = 350;

            // Check if we are too close to the start (in 1st set)
            if (scrollContainer.scrollLeft < singleSetWidth * 0.5) {
                // Jump forward to 2nd set
                scrollContainer.scrollLeft += singleSetWidth;
            }

            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const headerScrollRight = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const singleSetWidth = scrollContainer.scrollWidth / 3;
            const scrollAmount = 350;

            // Check if we are too close to the end (in 3rd set)
            if (scrollContainer.scrollLeft > singleSetWidth * 2.5) {
                // Jump back to 2nd set
                scrollContainer.scrollLeft -= singleSetWidth;
            }

            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const stripHTML = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        return plainText.substring(0, 150) + '...';
    };

    return (
        <section
            id="writeups"
            ref={revealRef}
            className={`writeups section ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="container">
                <h2 className="section-title">Writeups & Blog</h2>
                <p className="section-description">CTF writeups, machine walkthroughs, and certification experiences from my Medium blog</p>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => filterPosts('all')}
                    >
                        All Posts
                    </button>
                    <button
                        className={`filter-tab ${activeFilter === 'ctf' ? 'active' : ''}`}
                        onClick={() => filterPosts('ctf')}
                    >
                        CTF Writeups
                    </button>
                    <button
                        className={`filter-tab ${activeFilter === 'machines' ? 'active' : ''}`}
                        onClick={() => filterPosts('machines')}
                    >
                        Machine Walkthroughs
                    </button>
                    <button
                        className={`filter-tab ${activeFilter === 'certs' ? 'active' : ''}`}
                        onClick={() => filterPosts('certs')}
                    >
                        Certification Experiences
                    </button>
                </div>

                {/* Content Area */}
                <div className="blog-grid-container"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {(activeFilter === 'machines' || activeFilter === 'certs') ? (
                        <div className="stay-tuned-msg fade-in">
                            <i className="fas fa-hourglass-half"></i>
                            <p>Stay tuned for future articles</p>
                        </div>
                    ) : (
                        <>
                            <button className="carousel-button left" onClick={headerScrollLeft} aria-label="Scroll left">
                                <i className="fas fa-chevron-left"></i>
                            </button>

                            <div className="blog-grid" ref={scrollRef}>
                                {loading && (
                                    <div className="loading-spinner">
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                        <p>Loading posts from Medium...</p>
                                    </div>
                                )}

                                {error && (
                                    <div className="loading-spinner">
                                        <i className="fas fa-exclamation-circle"></i>
                                        <p>{error}. Please visit Medium directly.</p>
                                    </div>
                                )}

                                {!loading && !error && displayPosts.map((post, index) => (
                                    <div key={index} className="blog-card" data-categories={post.autoCategories.join(',')}>
                                        <div className="blog-card-date">{formatDate(post.pubDate)}</div>
                                        <h3 className="blog-card-title">
                                            <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                                        </h3>
                                        <p className="blog-card-excerpt">{stripHTML(post.description)}</p>
                                        <div className="blog-card-categories">
                                            {post.categories && post.categories.slice(0, 3).map((cat, i) => (
                                                <span key={i} className="category-tag">{cat}</span>
                                            ))}
                                            {post.autoCategories.map((cat, i) => (
                                                <span key={`auto-${i}`} className="category-tag">{cat.toUpperCase()}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="carousel-button right" onClick={headerScrollRight} aria-label="Scroll right">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </>
                    )}
                </div>

                <div className="blog-cta">
                    <a href="https://medium.com/@srihari.n.narayan" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        View All Posts on Medium
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Writeups;
