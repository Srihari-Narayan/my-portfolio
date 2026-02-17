import { useEffect, useRef, useState } from 'react';

const useScrollReveal = (threshold = 0.2) => {
    // Check if mobile (screen width < 768px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Always visible on mobile, otherwise start hidden
    const [isVisible, setIsVisible] = useState(isMobile);
    const elementRef = useRef(null);

    useEffect(() => {
        // Skip observer on mobile
        if (isMobile) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: threshold
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, isMobile]);

    return [elementRef, isVisible];
};

export default useScrollReveal;
