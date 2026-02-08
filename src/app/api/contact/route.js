import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, email, phone, subject, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to Admin
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: 'kanchancars.in@gmail.com', // Admin email
            subject: `New Lead: ${name} - ${subject}`,
            text: `
        New Lead Details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
        };

        // Auto-reply to Client
        const mailOptionsClient = {
            from: process.env.EMAIL_USER,
            to: email, // Client email
            subject: `Thank you for contacting KanchanCars`,
            text: `
        Dear ${name},
        
        Thank you for reaching out to KanchanCars. We have received your message regarding "${subject}".
        
        Our team will review your inquiry and get back to you shortly.
        
        Best regards,
        The KanchanCars Team
        www.kanchancars.com
      `,
        };

        await transporter.sendMail(mailOptionsAdmin);
        await transporter.sendMail(mailOptionsClient);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
    }
}
