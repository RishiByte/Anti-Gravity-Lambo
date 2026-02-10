'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { carData } from '@/data/carData';

interface ZondaExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
    // Opacity transforms for each phase
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    const designOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);
    const designY = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [50, 0, 0, -50]);

    const engineOpacity = useTransform(scrollYProgress, [0.6, 0.65, 1], [0, 1, 1]);
    const engineY = useTransform(scrollYProgress, [0.6, 0.65], [50, 0]);

    const heroData = carData.find((d) => d.id === 'hero');
    const designData = carData.find((d) => d.id === 'design');
    const engineData = carData.find((d) => d.id === 'engine');

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center w-full h-full">
            {/* HUD Borders / Static Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-white/20 opacity-50" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-white/20 opacity-50" />

            {/* Hero Section */}
            {heroData && (
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute text-center"
                >
                    <motion.h1 className="text-6xl md:text-8xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter uppercase mb-4">
                        {heroData.title}
                    </motion.h1>
                    <motion.p className="text-pagani-gold font-rajdhani text-2xl tracking-[0.2em] mb-8">
                        {heroData.price}
                    </motion.p>
                    <button className="pointer-events-auto border border-pagani-gold text-pagani-gold px-8 py-3 font-orbitron text-sm tracking-widest hover:bg-pagani-gold hover:text-black transition-colors uppercase">
                        {heroData.cta}
                    </button>
                </motion.div>
            )}

            {/* Design Section */}
            {designData && (
                <motion.div
                    style={{ opacity: designOpacity, y: designY }}
                    className="absolute max-w-4xl px-8 text-left md:text-center w-full"
                >
                    <div className="flex flex-col items-start md:items-center">
                        <span className="text-sm text-pagani-gold tracking-widest font-bold mb-2 uppercase border-b border-pagani-gold pb-1">
                            Aesthetics
                        </span>
                        <h2 className="text-5xl font-orbitron font-bold mb-6 text-white uppercase">{designData.title}</h2>
                        <p className="font-rajdhani text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto">
                            {designData.description}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Engine Section */}
            {engineData && (
                <motion.div
                    style={{ opacity: engineOpacity, y: engineY }}
                    className="absolute w-full px-12 flex justify-end items-center h-full"
                >
                    <div className="max-w-md text-right">
                        <span className="block text-pagani-gold text-sm tracking-[0.3em] mb-2 uppercase font-mono">Performance</span>
                        <h2 className="text-6xl font-orbitron font-bold mb-8 text-white uppercase">{engineData.title}</h2>

                        <div className="space-y-6 border-r-2 border-pagani-gold pr-6">
                            {engineData.specs?.map((spec, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-rajdhani">{spec.label}</span>
                                    <span className="text-2xl font-orbitron text-white">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
