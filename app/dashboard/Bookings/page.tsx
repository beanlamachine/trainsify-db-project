import { fetchBookings } from '@/app/lib/data';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import {  DeleteBooking } from '@/app/ui/invoices/buttons.tsx';
export default function Page() {
  revalidatePath('/dashboard/Bookings');
  async function fetchAndRenderData() {
    try {
      const bookingsData = await fetchBookings();
      return (
        <main>
          <div className="top" >
          <h1>Bookings</h1>
          <div className="top">
            <div className="">
              <Link
                href="/dashboard/Bookings/create"
                className="button"
              >
                <span>Create New Booking</span>
              </Link>
            </div>

            <div className="">
              <Link
                href="/dashboard/Bookings/Search"
                className="button"
              >
                <span>Search by Customer</span>
              </Link>
            </div>
            </div>
          </div>
          
          <div className="Showing">
            {bookingsData.map((booking) => (
              <div className="Showing_Tile" key={booking.bookingid}>
                <div className="Tile_Header">Booking ID: &nbsp; {booking.bookingid}</div>
                <table className="Showing_Table">
                    <tbody>
                    <tr className="">
                      <td className="">Customer ID: </td>
                      <td> &nbsp;{booking.customerid}&nbsp;</td>
                    </tr>
                    <tr className="">
                      <td>Train ID: </td>
                      <td>&nbsp;{booking.trainid}&nbsp;</td>
                    </tr>
                    <tr className="">
                      <td>Ticket ID:</td>
                      <td>&nbsp;{booking.ticketid}&nbsp;</td>
                    </tr>
                </tbody>
                </table>
                <div className='top mt-4 mb-2'>
                    <DeleteBooking bookingid={booking.bookingid} />
                    </div>
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
