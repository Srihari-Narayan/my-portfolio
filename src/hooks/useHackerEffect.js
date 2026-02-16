import { useState, useEffect, useRef } from 'react';

const useHackerEffect = (finalText, speed = 30) => {
    const [text, setText] = useState(finalText);
    const [isHovered, setIsHovered] = useState(false);

    // Characters to scramble through
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    const animationRef = useRef(null);

    const triggerEffect = () => {
        let iterations = 0;

        // Clear any existing animation to prevent overlap
        if (animationRef.current) clearInterval(animationRef.current);

        const interval = setInterval(() => {
            setText(prev => {
                let result = "";
                for (let i = 0; i < finalText.length; i++) {
                    if (i < iterations) {
                        result += finalText[i];
                    } else {
                        result += letters[Math.floor(Math.random() * letters.length)];
                    }
                }
                return result;
            });

            if (iterations >= finalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 6;
        }, speed);

        animationRef.current = interval;
        return interval;
    };

    useEffect(() => {
        const animationInterval = triggerEffect();
        return () => {
            clearInterval(animationInterval);
            if (animationRef.current) clearInterval(animationRef.current);
        };
    }, [finalText, speed]);

    // Optional: Re-trigger on hover if desired
    const replay = () => {
        triggerEffect();
    };

    return text;
};

export default useHackerEffect;
