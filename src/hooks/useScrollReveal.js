import { useEffect, useRef, useState } from 'react';

const useScrollReveal = (threshold = 0.2) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can stop observing if we only want it to fade in once
                    // observer.unobserve(entry.target); 
                } else {
                    // Reset if you want it to fade out when scrolling away
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
    }, [threshold]);

    return [elementRef, isVisible];
};

export default useScrollReveal;
