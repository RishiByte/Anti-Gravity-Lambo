'use client';

import { useMotionValueEvent, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Transform scroll progress to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Load images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Adjust filename format: ezgif-frame-001.jpg
            const filename = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            img.src = `${imageFolderPath}/${filename}`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    // Draw frame logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0 || !isLoaded) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use current frame or fallback to last available
        const frameToDraw = images[Math.floor(index)] || images[images.length - 1];

        if (!frameToDraw) return;

        // Canvas dimensions (handled by resize observer mostly, but we set strictly here)
        const dpr = window.devicePixelRatio || 1;

        // Calculate aspect ratio (contain)
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;
        const imgRatio = frameToDraw.width / frameToDraw.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image -> fit by height
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Canvas is taller than image -> fit by width
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Scale context to match dpr
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.drawImage(frameToDraw, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
    };

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Re-render current frame
                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images]);

    // Subscribe to scroll changes to re-render
    useMotionValueEvent(frameIndex, "change", (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(frameIndex.get());
        }
    }, [isLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-contain pointer-events-none z-0"
        />
    );
}
