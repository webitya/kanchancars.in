import Image from 'next/image';

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="image-wrapper">
        <Image 
          src={car.image} 
          alt={car.name} 
          fill 
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="car-details">
        <span className="category">{car.category}</span>
        <h3 className="name">{car.name}</h3>
        <p className="price">{car.price}</p>
        <div className="actions">
            <a 
                href={`https://wa.me/917488425690?text=I'm interested in the ${car.name}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
            >
                Inquire
            </a>
        </div>
      </div>
    </div>
  );
}
