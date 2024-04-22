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
          <div className="top">
          <h1>Customers</h1>
          <div className='top'>
            <Link href="/dashboard/Customers/create" className="button h-10">
              <span>Create New Customer</span>
            </Link>
          </div>
          </div>
          
          <div className='Showing'>
            {customersData.map((customers) => (
              <div className='Showing_Tile' key={customers.customerid}>
                <div className="Tile_Header">{customers.name}</div>
                <table className='Showing_Table'>
                  <tbody>
                    <tr>
                      <td>ID:</td>
                      <td>{customers.customerid}</td>
                    </tr>
                    <tr>
                      <td>Year of Birth:</td>
                      <td>{customers.yeardob}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td className=''>{customers.email}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='top mt-4 mb-2'>
                    <UpdateCustomer customerid={customers.customerid} />
                    <DeleteCustomer customerid={customers.customerid} />
                    </div>
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
