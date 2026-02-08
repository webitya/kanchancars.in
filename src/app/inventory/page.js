"use client";
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import carsData from '../../data/cars.json';
import CarCard from '../../components/CarCard';
import CustomDropdown from '../../components/CustomDropdown';
import CustomSlider from '../../components/CustomSlider';

function InventoryContent() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [maxPrice, setMaxPrice] = useState(100000000);

    useEffect(() => {
        const query = searchParams.get('search');
        if (query !== null) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const brands = useMemo(() => {
        const allBrands = carsData.map(car => car.name.split(' ')[0]);
        return ['All', ...new Set(allBrands)].sort();
    }, []);

    const filteredCars = useMemo(() => {
        const lowQuery = searchQuery.toLowerCase();
        return carsData.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(lowQuery) ||
                car.category.toLowerCase().includes(lowQuery) ||
                (car.features && car.features.some(f => f.toLowerCase().includes(lowQuery))) ||
                car.description.toLowerCase().includes(lowQuery);

            const brand = car.name.split(' ')[0];
            const matchesBrand = selectedBrand === 'All' || brand === selectedBrand;

            const priceVal = parseInt(car.price.replace(/[₹,]/g, ''));
            const matchesPrice = priceVal <= maxPrice;

            return matchesSearch && matchesBrand && matchesPrice;
        });
    }, [searchQuery, selectedBrand, maxPrice]);

    const handlePriceChange = (e) => {
        setMaxPrice(parseInt(e.target.value));
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedBrand('All');
        setMaxPrice(100000000);
    };

    return (
        <div className="container">
            <div className="inventory-header">
                <div>
                    <h1 className="page-title">Our Exclusive Inventory</h1>
                    <p className="page-subtitle" style={{ textAlign: 'left', marginBottom: '30px' }}>From Ultra-Luxury to Premium SUVs.</p>
                </div>
                {(searchQuery || selectedBrand !== 'All' || maxPrice < 100000000) && (
                    <button className="btn-clear-all" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                )}
            </div>

            <section className="filter-bar">
                <div className="filter-group">
                    <label className="dropdown-label">Search</label>
                    <div className="filter-input-wrapper">
                        <input
                            type="text"
                            placeholder="Model or Category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-input"
                        />
                        {searchQuery && (
                            <button className="filter-clear" onClick={() => setSearchQuery('')}>&times;</button>
                        )}
                    </div>
                </div>

                <CustomDropdown
                    label="Brand"
                    options={brands}
                    value={selectedBrand}
                    onChange={setSelectedBrand}
                />

                <CustomSlider
                    label="Max Price"
                    min={1000000}
                    max={100000000}
                    value={maxPrice}
                    onChange={setMaxPrice}
                    formatter={(val) => `₹${(val / 10000000).toFixed(1)} Cr`}
                />
            </section>

            <div className="results-count">
                Showing {filteredCars.length} vehicles
            </div>

            <section className="inventory-grid">
                {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
                {filteredCars.length === 0 && (
                    <div className="no-results">
                        No vehicles match your criteria. Please adjust your filters.
                    </div>
                )}
            </section>
        </div>
    );
}

export default function Inventory() {
    return (
        <main className="inventory-page">
            <Suspense fallback={<div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading Inventory...</div>}>
                <InventoryContent />
            </Suspense>
        </main>
    );
}
