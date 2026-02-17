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
                    // Auto-categorize posts
                    const categorizedPosts = data.items.slice(0, 6).map(post => {
                        const title = post.title.toLowerCase();
                        const content = post.description.toLowerCase();
                        const categories = [];

                        if (title.includes('ctf') || content.includes('ctf')) {
                            categories.push('ctf');
                        }
                        if (title.includes('hackthebox') || title.includes('tryhackme') ||
                            title.includes('machine') || content.includes('walkthrough')) {
                            categories.push('machines');
                        }
                        if (title.includes('certification') || title.includes('cert') ||
                            title.includes('oscp') || title.includes('ejpt')) {
                            categories.push('certs');
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
