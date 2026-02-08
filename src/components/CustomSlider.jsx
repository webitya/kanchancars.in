"use client";
import { useState, useEffect, useRef } from 'react';

export default function CustomSlider({ label, min, max, value, onChange, formatter }) {
    const [percentage, setPercentage] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const p = ((value - min) / (max - min)) * 100;
        setPercentage(p);
    }, [value, min, max]);

    const handleInput = (e) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <div className="custom-slider-wrapper">
            <div className="slider-header">
                <label className="slider-label">{label}</label>
                <span className="slider-value">{formatter(value)}</span>
            </div>
            <div className="slider-container">
                <div
                    className="slider-track-progress"
                    style={{ width: `${percentage}%` }}
                ></div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step="1000000"
                    value={value}
                    onChange={handleInput}
                    className="custom-range-input"
                />
            </div>
        </div>
    );
}
