'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  bookingid: z.number(),
  customerid: z.string(),
  trainid: z.number(),
  ticketid: z.number(),
});

const CreateBooking = FormSchema.omit({ bookingid: true});
const CreateConnectingBooking = FormSchema.omit({trainid: true, customerid: true});

export async function createBooking(formData: FormData) {
  const { customerid, trainid, ticketid } = CreateBooking.parse({
    customerid: formData.get('customerid'),
    trainid: Number(formData.get('trainid')),
    ticketid: Number(formData.get('ticketid')),
  });

  const result = await sql`
    INSERT INTO bookings (customerid, trainid, ticketid)
    VALUES (${customerid}, ${trainid}, ${ticketid})
    RETURNING bookingid;  -- Retrieve the booking ID after insert
  `;

  const bookingId = result.rows[0].bookingid;  // Extract the booking ID from the result
  console.log(bookingId);

    // Decrement the 'available' field in the 'Tickets' table
    await sql`
    UPDATE Tickets
    SET available = available - 1
    WHERE ticketid = ${ticketid};
  `;

  // Redirect after successfully creating the booking
  revalidatePath(`/dashboard/Bookings/${bookingId}/CreateConnecting`);
  redirect(`/dashboard/Bookings/${bookingId}/CreateConnecting`);
}

export async function createConnectingBooking(formData: FormData) {
  const { ticketid, bookingid } = CreateConnectingBooking.parse({
    bookingid: Number(formData.get('bookingid')),
    ticketid: Number(formData.get('ticketid')),
  });

  console.log('BookingIDTest:', bookingid)
  console.log('ticketIDTest:', ticketid)

  const customeridReseult = await sql`SELECT customerid FROM Bookings WHERE BookingID = ${bookingid};`;
  const customerid = customeridReseult.rows[0].customerid;

  const trainidResult = await sql`SELECT trainid FROM tickets WHERE ticketid = ${ticketid};`;
  const trainid = trainidResult.rows[0].trainid;

  const result = await sql`
    INSERT INTO bookings (customerid, trainid, ticketid)
    VALUES (${customerid}, ${trainid}, ${ticketid})
    RETURNING bookingid;
  `;

  const createdBookingId = result.rows[0].bookingid;
  console.log('Created Booking ID:', createdBookingId);

  // Redirect after successfully creating the booking
  // revalidatePath(`/dashboard/Bookings/${createdBookingId}/CreateConnecting`);
  // redirect(`/dashboard/Bookings/${createdBookingId}/CreateConnecting`);
  revalidatePath('/dashboard/Bookings');
  redirect('/dashboard/Bookings');
}

  export async function updateCustomer(id: number, formData: FormData) {
    await sql.query(
      `UPDATE Customers 
       SET name = $1, yeardob = $2, email = $3
       WHERE customerid = ${id}`,
      [formData.get('name'), formData.get('yeardob'), formData.get('email')]
  );
  revalidatePath('/dashboard/Customers');
  redirect('/dashboard/Customers');
  }

  export async function deleteCustomer(customerId: number) {
    console.log(customerId);
    try {
      await sql.query(`DELETE FROM Customers WHERE customerid = ${customerId}`);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to delete customer.');
    }
    revalidatePath('/dashboard/Customers');
    redirect('/dashboard/Customers');
  }

  export async function deleteBooking(bookingid: number) {
    console.log(bookingid);
    try {
      await sql.query(`DELETE FROM bookings WHERE bookingid = ${bookingid}`);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to delete customer.');
    }
    revalidatePath('/dashboard/Bookings');
    redirect('/dashboard/Bookings');
  }

 