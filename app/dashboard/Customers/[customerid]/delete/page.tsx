import DeletePage from '@/app/ui/invoices/deletecustomer-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchData } from '@/app/lib/data';
import { deleteCustomer } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';

export default async function Page({ params }: { params: { customerid: number } }) {
    const customerid = params.customerid;
    //const { customerid, name, yeardob, email } = await fetchData();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/Customers' },
          {
            label: 'Delete Customer',
            href: `/dashboard/invoices/${customerid}/delete`,
            active: true,
          },
        ]}
      />
    <DeletePage customerid = {customerid}></DeletePage>

      
    </main>
  );
}