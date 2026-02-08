"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link href="/" className="logo">
                    KanchanCars
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-menu">
                    <Link href="/inventory" className="nav-link">Inventory</Link>
                    <Link href="/services" className="nav-link">Services</Link>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/contact" className="nav-link">Contact</Link>
                </div>

                {/* Hamburger Button */}
                <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className={`bar ${isOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'open' : ''}`}></span>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={toggleMenu}>&times;</button>
                    <div className="mobile-nav-links">
                        <Link href="/inventory" className="mobile-nav-link" onClick={toggleMenu}>Inventory</Link>
                        <Link href="/services" className="mobile-nav-link" onClick={toggleMenu}>Services</Link>
                        <Link href="/about" className="mobile-nav-link" onClick={toggleMenu}>About</Link>
                        <Link href="/contact" className="mobile-nav-link" onClick={toggleMenu}>Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
