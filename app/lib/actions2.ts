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