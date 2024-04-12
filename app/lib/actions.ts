'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  bookingid: z.string(),
  customerid: z.string(),
  trainid: z.number(),
  ticketid: z.number(),
});

const CreateBooking = FormSchema.omit({ bookingid: true});

export async function createBooking(formData: FormData) {
    const { customerid, trainid, ticketid } = CreateBooking.parse({
      customerid: formData.get('customerid'),
      trainid: Number(formData.get('trainid')),
      ticketid: Number(formData.get('ticketid')),
    });

    await sql`
    INSERT INTO bookings (customerid, trainid, ticketid)
    VALUES (${customerid}, ${trainid}, ${ticketid})
  `;

    revalidatePath('/dashboard/Bookings');
    redirect('/dashboard/Bookings');
  }
