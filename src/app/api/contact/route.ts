import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// Define the Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Avoid model recompilation errors in Next.js development
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Validate Input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // 2. Connect to MongoDB
    await dbConnect();

    // 3. Save to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // 4. Send Email Notification via Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this if using another provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to yourself
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #06b6d4; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">
              Sent from Siddharth's Portfolio Website • ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn("Nodemailer: EMAIL_USER or EMAIL_PASS not set. Email notification skipped.");
    }

    // 5. Return success
    return NextResponse.json(
      { message: 'Message sent successfully!', contact: newContact },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}