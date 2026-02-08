"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import carsData from '../data/cars.json';

export default function Search({ placeholder = "Search cars...", initialValue = "" }) {
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            const lowValue = value.toLowerCase();
            const results = [];

            carsData.forEach(car => {
                let matchType = null;

                if (car.name.toLowerCase().includes(lowValue)) {
                    matchType = "Model";
                } else if (car.category.toLowerCase().includes(lowValue)) {
                    matchType = "Category";
                } else if (car.features && car.features.some(f => f.toLowerCase().includes(lowValue))) {
                    const feature = car.features.find(f => f.toLowerCase().includes(lowValue));
                    matchType = `Feature: ${feature}`;
                } else if (car.description.toLowerCase().includes(lowValue)) {
                    matchType = "Description match";
                }

                if (matchType) {
                    results.push({ ...car, matchType });
                }
            });

            setSuggestions(results.slice(0, 6));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const onSelectSuggestion = (carName) => {
        setQuery(carName);
        setShowSuggestions(false);
        router.push(`/inventory?search=${encodeURIComponent(carName)}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        router.push(`/inventory?search=${encodeURIComponent(query)}`);
    };

    return (
        <div className="search-wrapper" ref={wrapperRef}>
            <form onSubmit={onSubmit} className="search-form">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                    className="search-input"
                />
                {query && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={() => { setQuery(''); setSuggestions([]); setShowSuggestions(false); }}
                        aria-label="Clear search"
                    >
                        &times;
                    </button>
                )}
                <button type="submit" className="search-submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((car) => (
                        <li
                            key={car.id}
                            onClick={() => onSelectSuggestion(car.name)}
                            className="suggestion-item"
                        >
                            <div className="suggestion-main">
                                <span className="suggestion-name">{car.name}</span>
                                <span className="suggestion-type">{car.matchType}</span>
                            </div>
                            <span className="suggestion-category">{car.category}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
