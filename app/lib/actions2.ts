'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const CustomerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    yearOfBirth: z.number(),
  });

const TicketSchema = z.object ({
  origin: z.string(), 
  destination: z.string(), 
  departure_time: z.string(),
  arrival_time: z.string(),
  available: z.number(), 
  trainid:  z.number(), 
})

export async function createCustomer(formData: FormData) {
    const { name, email, yearOfBirth} = CustomerSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      yearOfBirth: Number(formData.get('yeardob')),
    });


    const result = await sql`
      SELECT 1 FROM customers WHERE email = ${email}
    `;

    // If the query returns any rows, the email already exists
    if (result.rowCount > 0) {
      // Email already exists, throw an error
      throw new Error('Email already in database');
    }

    await sql`
    INSERT INTO customers (name, email, yeardob)
    VALUES (${name}, ${email}, ${yearOfBirth})
  `;

    revalidatePath('/dashboard/Customers');
    redirect('/dashboard/Customers');
  }

  export async function createTicket(formData: FormData) {
    try {
      const { origin, destination, departure_time, trainid, arrival_time, available } = TicketSchema.parse({
        origin: formData.get('origin'),
        destination: formData.get('destination'),
        departure_time: formData.get('departure_time'),
        arrival_time: formData.get('arrival_time'),
        trainid: Number(formData.get('trainid')),
        available: Number(formData.get('available')),
      });
  
      // Ensure departure_time is parsed into a Date object
      const parsedDepartureTime = new Date(departure_time);
      const parsedArrivalTime = new Date(arrival_time);

  
      // Convert departure_time to a string representation
      const formattedDepartureTime = parsedDepartureTime.toISOString();
      const formattedArrivalTime = parsedArrivalTime.toISOString();
  
      // Insert into the database
      await sql`
        INSERT INTO tickets (TrainID, Origin, Destination, Departure_Time, Arrival_Time, Available)
        VALUES (${trainid}, ${origin}, ${destination}, ${formattedDepartureTime}, ${formattedArrivalTime}, ${available})
      `;
  
      // After successful insertion, revalidate and redirect
      revalidatePath('/dashboard/Tickets');
    
    } catch (error) {
      // Handle validation errors or SQL errors
      console.error('Error creating ticket:', error);
      // Handle error appropriately, such as showing a message to the user
    }  redirect('/dashboard/Tickets');
  }