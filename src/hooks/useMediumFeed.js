import { useState, useEffect } from 'react';

export function useMediumFeed(username) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFeed() {
            try {
                // Add query param to rssUrl itself to bypass Medium/potential intermediate caching
                const rssUrl = `https://medium.com/@${username}/feed?t=${Date.now()}`;
                const cacheBuster = Date.now();
                const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=lfe1onwq2vpncf8wuzoplrwnykrqekqbxtg31jex&count=50&_=${cacheBuster}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    // Sort by date descending (just in case RSS isn't perfectly ordered)
                    const sortedItems = data.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

                    // Auto-categorize posts
                    const categorizedPosts = sortedItems.slice(0, 50).map(post => {
                        const title = post.title.toLowerCase();
                        const content = (post.description || "").toLowerCase();
                        const categories = [];

                        // 1. Check for Certifications (Prioritize this to ensure they appear in the right tab)
                        if (title.includes('certification') || title.includes('cert') ||
                            title.includes('oscp') || title.includes('ejpt') || title.includes('pnpt') ||
                            title.includes('ceh') || title.includes('cissp') || title.includes('security+') ||
                            title.includes('exam') || title.includes('review')) {
                            categories.push('certs');
                        }

                        // 2. Check for Machine Walkthroughs
                        if (title.includes('hackthebox') || title.includes('tryhackme') ||
                            title.includes('machine') || content.includes('walkthrough')) {
                            categories.push('machines');
                        }

                        // 3. Check for CTF (Only if not already classified as a Cert, or if explicitly desired)
                        // If it's a cert review, we probably don't want it in the generic "CTF" bucket even if it mentions CTF
                        if (!categories.includes('certs') && (title.includes('ctf') || content.includes('ctf'))) {
                            categories.push('ctf');
                        }

                        return { ...post, autoCategories: categories };
                    });

                    setPosts(categorizedPosts);
                    setLoading(false);
                } else {
                    setError('Unable to load blog posts');
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching Medium feed:', err);
                setError('Unable to load blog posts');
                setLoading(false);
            }
        }

        fetchFeed();
    }, [username]);

    return { posts, loading, error };
}
