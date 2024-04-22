import { fetchTrains } from '@/app/lib/data';

export default function Page() {
  async function fetchAndRenderData() {
    try {
      const trainsData = await fetchTrains();
      return (
        <main>
          <div className='top'>
          <h1>Train Types</h1>
          </div>
          <div className="Showing">
            {trainsData.map((trains) => (
              <div className="Showing_Tile" key={trains.trainid}>
                <div className="Tile_Header">&nbsp;{trains.type}&nbsp;Train</div>
                <table className="Showing_Table">
                  <tbody>
                  <tr>
                    <td>Train ID: </td>
                    <td>{trains.trainid}</td>
                  </tr>
                  <tr>
                  <td>Seat Quantity:</td>
                  <td>&nbsp;{trains.seat_quantity}&nbsp;</td>
                  </tr>
                  </tbody>
                </table>
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