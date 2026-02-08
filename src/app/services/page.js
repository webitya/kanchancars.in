export default function Services() {
    const services = [
        {
            title: "Luxury Sales",
            description: "Access to an exclusive inventory of the world's finest automobiles, sourced and verified for quality."
        },
        {
            title: "Automotive Consulting",
            description: "Expert advice to help you select the perfect vehicle that matches your lifestyle and preferences."
        },
        {
            title: "Financing Solutions",
            description: "Tailored financial packages to make your dream car ownership a reality with competitive rates."
        },
        {
            title: "After-Sales Support",
            description: "Comprehensive support and maintenance guidance to ensure your vehicle remains in pristine condition."
        }
    ];

    return (
        <main className="services-page">
            <div className="container">
                <h1 className="page-title">Our Services</h1>
                <p className="page-subtitle">Comprehensive Automotive Solutions</p>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
