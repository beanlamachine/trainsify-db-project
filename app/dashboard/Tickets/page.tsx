import { fetchData } from '@/app/lib/data';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { countAssociatedBookingwithTickets } from '@/app/lib/data'; // Importing the function

export default function Page() {
  async function fetchAndRenderData() {
    revalidatePath('/dashboard/Tickets');
    try {
      const { customers, trains, tickets } = await fetchData();
      return (
        <main>
          <div className='top'>
          <h1>Tickets</h1>
          <div>
            <Link href="/dashboard/Tickets/Create" className="button">
              <span>Create New Ticket</span>
            </Link>
          </div>
          </div>
          <div className='Showing'>
            {tickets.map(async (t) => {
              // Mapping asynchronously
              const foundTrain = trains.find(
                (train) => train.trainid === t.trainid,
              );
              const bookingCount = await countAssociatedBookingwithTickets(
                t.ticketid,
              ); // Fetching booking count
              return (
                <div className='Showing_Tile' key={t.ticketid}>
                  <div className="Tile_Header">Ticket's ID: {t.ticketid}</div>
                  <table className="Showing_Table">
                    <tbody>
                      <tr>
                      <td>Train's Type:</td>
                      {foundTrain ? (
                        <td>{foundTrain.type}</td>
                      ) : (
                        <td>Train not found</td>
                      )}
                      </tr>
                      <tr>
                      <td>Origin:</td>
                      <td> {t.origin}</td>
                      </tr>
                      <tr>
                        <td>Destination: </td>
                        <td>{t.destination}</td>
                      </tr>
                      <tr>
                      <td>
                        Departure Time: 
                      </td>
                      <td>{t.departure_time.toDateString()}{' '}
                        {t.departure_time.toTimeString()}</td>
                      </tr>
                      <tr>
                        <td>
                          Arrive Time:
                       </td>
                       <td>{t.arrival_time.toDateString()}{' '}
                          {t.arrival_time.toTimeString()}</td>
                      </tr>
                      <tr>
                        <td>Available: </td>
                        <td>{t.available}</td>
                      </tr>
                      <tr>
                        <td>Bookings Count: </td>{' '}
                        <td>{bookingCount}</td>
                      </tr>
                      {/* Displaying booking count */}
                    </tbody>
                  </table>
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
