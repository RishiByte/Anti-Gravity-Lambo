'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';

// Placeholder components for sections not fully specified but requested in structure
const SpecsGrid = () => (
    <section className="py-24 px-8 border-t border-white/10 bg-pagani-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border border-white/5 hover:border-pagani-gold transition-colors group">
                <h3 className="text-pagani-gold font-rajdhani uppercase tracking-widest text-sm mb-2">Acceleration</h3>
                <p className="text-4xl font-orbitron text-white group-hover:text-shadow-glow transition-all">2.9 s</p>
                <span className="text-xs text-gray-500">0-100 km/h</span>
            </div>
            <div className="p-6 border border-white/5 hover:border-pagani-gold transition-colors group">
                <h3 className="text-pagani-gold font-rajdhani uppercase tracking-widest text-sm mb-2">Max Power</h3>
                <p className="text-4xl font-orbitron text-white group-hover:text-shadow-glow transition-all">640 CV</p>
                <span className="text-xs text-gray-500">@ 8,000 rpm</span>
            </div>
            <div className="p-6 border border-white/5 hover:border-pagani-gold transition-colors group">
                <h3 className="text-pagani-gold font-rajdhani uppercase tracking-widest text-sm mb-2">Top Speed</h3>
                <p className="text-4xl font-orbitron text-white group-hover:text-shadow-glow transition-all">&gt; 325 km/h</p>
                <span className="text-xs text-gray-500">track verified</span>
            </div>
        </div>
    </section>
);

const Features = () => (
    <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
            <h2 className="text-5xl font-orbitron font-bold mb-8 text-white uppercase">Aerodinamica Lamborghini Attiva</h2>
            <p className="font-rajdhani text-xl text-gray-300 leading-relaxed">
                ALA is a smart, innovative system that manages active aerodynamics. It adapts to the driving style and type of route, increasing vertical load to assist stability and speed through curves, or reducing aerodynamic resistance to assist acceleration and reaching top speed.
            </p>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-black py-12 border-t border-white/10 text-center">
        <h1 className="font-orbitron text-2xl text-white mb-4 tracking-widest">LAMBORGHINI</h1>
        <p className="font-rajdhani text-gray-500 text-sm">© {new Date().getFullYear()} Automobili Lamborghini S.p.A.</p>
    </footer>
);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main className="bg-pagani-black text-white min-h-screen">
            <Navbar />

            <section ref={containerRef} className="h-[500vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <ZondaScrollCanvas
                            scrollYProgress={scrollYProgress}
                            totalFrames={181}
                            imageFolderPath="/Lambo-Frames"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <ZondaExperience scrollYProgress={scrollYProgress} />
                    </div>
                </div>
            </section>

            <div className="relative z-20 bg-pagani-black">
                <SpecsGrid />
                <Features />
                <Footer />
            </div>
        </main>
    );
}
