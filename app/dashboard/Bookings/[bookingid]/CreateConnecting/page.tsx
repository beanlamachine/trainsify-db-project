import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {
  fetchData,
  fetchConnectingTicketswithBookingID,
  fetchCustomerIDWithBookingID,
  fetchTicketInfoByBookingID,
} from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createConnectingBooking } from '@/app/lib/actions';

export default async function Page({
  params,
}: {
  params: { bookingid: number };
}) {
  const bookingid = params.bookingid;
  console.log(bookingid);
  const previousTicketInfo = await fetchTicketInfoByBookingID(bookingid);
  //const { customerid, name, yeardob, email } = await fetchData();
  //const connectingTickets = await fetchConnectingTicketswithTicketID;
  async function fetchAndRenderData() {
    try {
      const connectingTickets =
        await fetchConnectingTicketswithBookingID(bookingid);

      return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Bookings', href: '/dashboard/Bookings' },
              {
                label: 'Connect a ticket',
                href: `/dashboard/invoices/${bookingid}/CreateConnecting`,
                active: false,
              },
            ]}
          />

          <form action={createConnectingBooking}>
            <div>
              <label
                htmlFor="bookingid"
                className="mb-2 block text-sm font-medium"
              >
                Your new booking is under ID
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    readOnly={true}
                    id="bookingid"
                    name="bookingid"
                    type="number"
                    step="0.01"
                    defaultValue={bookingid}
                  />
                </div>
              </div>
            </div>
            <div>
              {previousTicketInfo.map((ticket) => (
                <div className='Showing_Tile'>
                  <div className='Tile_Header'>Previous Ticket Information</div>
                <table className="Showing_Table" key={ticket.ticketid}>
                  <tbody>
                    <tr>
                      <td>Origin:</td>
                      <td>{ticket.origin}</td>
                    </tr>
                    <tr>
                      <td>Destination:</td>
                      <td>{ticket.destination}</td>
                    </tr>
                    <tr>
                      <td>Departure Time:</td>
                      <td>
                        {ticket.departure_time.toDateString()}{' '}
                        {ticket.departure_time.toTimeString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Arrive Time:</td>
                      <td>
                        {ticket.arrival_time.toDateString()}{' '}
                        {ticket.arrival_time.toTimeString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Available:</td>
                      <td>{ticket.available}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              ))}
            </div>
            <p>
              IF you want you can create another booking with a connecting train
            </p>
            {/* Ticket Information */}
            <div className="mb-4">
              <label
                htmlFor="ticket"
                className="mb-2 block text-sm font-medium"
              >
                Choose a connecting ticket
              </label>
              <div className="relative">
                <select
                  id="ticketid"
                  name="ticketid"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a ticket
                  </option>
                  {connectingTickets.length > 0 ? (
                    connectingTickets.map((ticket) => (
                      <option key={ticket.ticketid} value={ticket.ticketid}>
                        {ticket.origin} to {ticket.destination} on{' '}
                        {new Date(ticket.departure_time).toLocaleString()}
                      </option>
                    ))
                  ) : (
                    <option disabled>No connecting trains available</option>
                  )}
                </select>
              </div>
            </div>
            <Button type="submit">Create Booking</Button>
          </form>
          <Link href="/dashboard" className="button mt-4">
            <span>I don't want to book a connecting train</span>
          </Link>
        </main>
      );
    } catch (error) {
      console.error('Error fetching connecting data:', error);
      return (
        <main>
          <h1>Error</h1>
          <p>Failure.</p>
        </main>
      );
    }
  }
  return fetchAndRenderData();
}
