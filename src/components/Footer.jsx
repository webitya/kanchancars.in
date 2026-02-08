import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-column brand-column">
                    <div className="footer-logo">KanchanCars</div>
                    <p className="footer-tagline">Experience the Pinnacle of Luxury</p>
                    <div className="social-links">
                        <span className="social-icon">IG</span>
                        <span className="social-icon">FB</span>
                        <span className="social-icon">X</span>
                    </div>
                </div>

                <div className="footer-column">
                    <h4 className="column-title">Quick Links</h4>
                    <Link href="/#inventory" className="footer-link">Inventory</Link>
                    <Link href="/contact" className="footer-link">Contact Us</Link>
                    <Link href="/about" className="footer-link">About Us</Link>
                    <Link href="/services" className="footer-link">Services</Link>
                </div>

                <div className="footer-column contact-column">
                    <h4 className="column-title">Contact</h4>
                    <p>Ranchi, Jharkhand</p>
                    <p><a href="mailto:kanchancars.in@gmail.com">kanchancars.in@gmail.com</a></p>
                    <p><a href="https://wa.me/917488425690" target="_blank" rel="noopener noreferrer">+91 7488425690</a></p>
                </div>

                <div className="footer-column newsletter-column">
                    <h4 className="column-title">Newsletter</h4>
                    <p>Subscribe for exclusive offers.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your Email" className="newsletter-input" />
                        <button type="button" className="newsletter-btn">→</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} KanchanCars. All rights reserved.</p>
                    <div className="legal-links">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
