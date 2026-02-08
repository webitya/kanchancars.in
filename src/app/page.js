import Image from "next/image";
import CarCard from "@/components/CarCard";
import cars from "@/data/cars.json";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content text-center">
          <h1 className="hero-title">KanchanCars</h1>
          <p className="hero-subtitle">Experience the Pinnacle of Luxury</p>
          <a href="#inventory" className="btn btn-primary hero-btn">View Collection</a>
        </div>
      </section>

      {/* Inventory Section */}
      <section id="inventory" className="section container">
        <div className="section-header text-center">
          <h2 className="section-title">Exclusive Collection</h2>
          <div className="divider"></div>
        </div>

        <div className="car-grid">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Contact Utility Section (Visual break) */}
      <section className="contact-break section">
        <div className="container text-center">
          <h2>Ready to Upgrade?</h2>
          <p className="mb-4">Contact us directly for personalized service.</p>
          <div className="contact-buttons">
            <a href="https://wa.me/917488425690" target="_blank" className="btn">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
