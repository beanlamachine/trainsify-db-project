import { fetchTickets, fetchData } from '@/app/lib/data';
import Link from 'next/link';
import { UpdateCustomer, DeleteCustomer } from '@/app/ui/invoices/buttons.tsx';
import { revalidatePath } from 'next/cache';
export default function Page() {
  async function fetchAndRenderData() {
    revalidatePath('/dashboard/Tickets');
    try {
      //const ticketsData = await fetchTickets();
      const { customers, trains, tickets } = await fetchData();
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
            {tickets.map((t) => {
              const foundTrain = trains.find(
                (train) => train.trainid === t.trainid,
              );
              return (
                <div key={t.ticketid}>
                  <p>Ticket's ID: {t.ticketid}</p>
                  {foundTrain ? (
                    <p>Trains's Type: {foundTrain.type}</p>
                  ) : (
                    <p>Train not found</p>
                  )}
                  <p>Origin: {t.origin}</p>
                  <p>Destination: {t.destination}</p>
                  <p>
                    Departure Time: {t.departure_time.toDateString()}{' '}
                    {t.departure_time.toTimeString()}
                  </p>
                  <p>
                    Arrive Time: {t.arrival_time.toDateString()}{' '}
                    {t.arrival_time.toTimeString()}
                  </p>
                  <p>Available: {t.available}</p>
                  <br />
                </div>
              );
            })}
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
