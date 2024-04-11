import { fetchCustomers } from '@/app/lib/data';

export default function Page() {
  async function fetchAndRenderData() {
    try {
      const customersData = await fetchCustomers();
      return (
        <main>
          <h1>Customers</h1>
          <div>
            {customersData.map((customers) => (
              <div key={customers.customerid}>
                <p>Customer's ID: {customers.customerid}</p>
                <p>Customer's Name: {customers.name}</p>
                <p>Customer's Year of Birth: {customers.yeardob}</p>
                <p>Customer's Email: {customers.email}</p>
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
