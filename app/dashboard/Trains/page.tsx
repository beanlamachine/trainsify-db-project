import { fetchTrains } from '@/app/lib/data';

export default function Page() {
  async function fetchAndRenderData() {
    try {
      const trainsData = await fetchTrains();
      return (
        <main>
          <h1>Trains</h1>
          <div>
            {trainsData.map((trains) => (
              <div key={trains.trainid}>
                <p>Train ID: {trains.trainid}</p>
                <p>Train Type: {trains.type}</p>
                <p>Seat Quantity: {trains.seat_quantity}</p>
                <br />
              </div>
            ))}
          </div>
        </main>
      );
    } catch (error) {
      console.error('Error fetching trains:', error);
      return (
        <main>
          <h1>Error</h1>
          <p>Failed to fetch trains data.</p>
        </main>
      );
    }
  }

  // Fetch data and render the component
  return fetchAndRenderData();
}