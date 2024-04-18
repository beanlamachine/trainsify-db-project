import { fetchTickets } from '@/app/lib/data';
import Link from 'next/link';
import { UpdateCustomer, DeleteCustomer } from '@/app/ui/invoices/buttons.tsx';
import { revalidatePath } from 'next/cache';
export default function Page() {
  async function fetchAndRenderData() {
    revalidatePath('/dashboard/Tickets');
    try {
      const ticketsData = await fetchTickets();
      return (
        <main>
          <div>
            <Link href="/dashboard/Tickets/Create" className="button">
              <span>Create New Ticket</span>
            </Link>
          </div>{' '}
          <br></br>
          <h1>Tickets</h1>
          <br />
          <div>
            {ticketsData.map((t) => (
              <div key={t.ticketid}>
                <p>Ticket's ID: {t.ticketid}</p>
                <p>Trains's Name: {t.trainid}</p>
                <p>Origin: {t.origin}</p>
                <p>Destination: {t.destination}</p>
                <p>Departure Time: {t.departure_time.toDateString()} {t.departure_time.toTimeString()}</p>
                <p>Arrive Time: {t.arrival_time.toDateString()} {t.arrival_time.toTimeString()}</p>
                <p>Available: {t.available}</p>
                <br />
              </div>
            ))}
          </div>
        </main>
      );
    } catch (error) {
      console.error('Error fetching customers:', error);
      return (
        <main>
          <h1>Error</h1>
          <p>Failed to fetch customers data.</p>
        </main>
      );
    }
  }

  // Fetch data and render the component
  return fetchAndRenderData();
}
