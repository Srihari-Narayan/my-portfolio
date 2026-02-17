import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size to fill window
        const resizeCanvas = () => {
             // Basic implementation: always resize. 
             // Improved: Check if width changed significantly to avoid mobile address bar jitter
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Track previous dimensions to ignore address bar showing/hiding on mobile
        let prevWidth = window.innerWidth;
        
        const handleResize = () => {
            // Only resize if width changes (orientation change) or height changes significantly
            if (Math.abs(window.innerWidth - prevWidth) > 0) {
                prevWidth = window.innerWidth;
                resizeCanvas();
            }
        };

        window.addEventListener('resize', handleResize);
        resizeCanvas();

        // Matrix characters
        const chars = '0123456789ABCDEF';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#DC143C'; // Red text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Randomly reset drop to top
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.3, // Subtle background
                pointerEvents: 'none' // Click through
            }}
        />
    );
};

export default MatrixBackground;
