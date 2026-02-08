import carsData from '../../data/cars.json';
import CarCard from '../../components/CarCard';

export default function Inventory() {
    return (
        <main className="inventory-page">
            <div className="container">
                <h1 className="page-title">Our Exclusive Inventory</h1>
                <p className="page-subtitle">From Ultra-Luxury to Premium SUVs. Explore our diverse collection.</p>

                <section className="inventory-grid">
                    {carsData.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </section>
            </div>
        </main>
    );
}
