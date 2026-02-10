'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-300 ${isScrolled ? 'bg-black/40 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="flex items-center gap-2">
                <span className="font-orbitron font-bold text-2xl tracking-widest text-white">
                    LAMBORGHINI
                </span>
            </div>

            <button className="relative overflow-hidden group border border-pagani-gold px-6 py-2 text-sm font-rajdhani font-bold tracking-widest text-white transition-all hover:bg-pagani-gold hover:text-black">
                <span className="relative z-10">INQUIRE</span>
            </button>
        </nav>
    );
}
