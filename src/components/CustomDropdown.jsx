"use client";
import { useState, useRef, useEffect } from 'react';

export default function CustomDropdown({ label, options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <label className="dropdown-label">{label}</label>
            <div
                className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{value}</span>
                <svg className={`chevron ${isOpen ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            {isOpen && (
                <ul className="dropdown-options">
                    {options.map((option) => (
                        <li
                            key={option}
                            className={`dropdown-option ${option === value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
