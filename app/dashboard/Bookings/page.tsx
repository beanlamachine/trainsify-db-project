import { fetchBookings } from '@/app/lib/data';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
export default function Page() {
  revalidatePath('/dashboard/Bookings');
  async function fetchAndRenderData() {
    try {
      const bookingsData = await fetchBookings();
      return (
        <main>
          <div>
            <Link href="/dashboard/Bookings/Create" className="button">
              <span>Create New Booking</span>
            </Link>
          </div>{' '}
          <br></br>
          <h1>Bookings</h1>
          <div>
            {bookingsData.map((booking) => (
              <div key={booking.bookingid}>
                <p>Booking ID: {booking.bookingid}</p>
                <p>Customer ID: {booking.customerid}</p>
                <p>Train ID: {booking.trainid}</p>
                <p>Ticket ID: {booking.ticketid}</p>
                <br />
              </div>
            ))}
          </div>
        </main>
      );
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return (
        <main>
          <h1>Error</h1>
          <p>Failed to fetch bookings data.</p>
        </main>
      );
    }
  }

  // Fetch data and render the component
  return fetchAndRenderData();
}
