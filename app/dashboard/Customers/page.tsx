import { fetchCustomers } from '@/app/lib/data';
import Link from 'next/link';
import { UpdateCustomer, DeleteCustomer } from '@/app/ui/invoices/buttons.tsx';
import { revalidatePath } from 'next/cache';
export default function Page() {
  async function fetchAndRenderData() {
    revalidatePath('/dashboard/Customers');
    try {
      const customersData = await fetchCustomers();
      return (
        <main>
          <div>
            <Link href="/dashboard/Customers/Create" className="button">
              <span>Create New Customer</span>
            </Link>
          </div>{' '}
          <br></br>
          <h1>Customers</h1>
          <div>
            {customersData.map((customers) => (
              <div key={customers.customerid}>
                <p>Customer's ID: {customers.customerid}</p>
                <p>Customer's Name: {customers.name}</p>
                <p>Customer's Year of Birth: {customers.yeardob}</p>
                <p>Customer's Email: {customers.email}</p>
                <UpdateCustomer customerid={customers.customerid} />
                <DeleteCustomer customerid={customers.customerid} />
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
