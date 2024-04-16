import Form from '@/app/ui/invoices/edit-form-customer';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchData } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { customerid: number } }) {
    const customerid = params.customerid;
    //const { customerid, name, yeardob, email } = await fetchData();
    
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/Customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/invoices/${customerid}/edit`,
            active: true,
          },
        ]}
      />

      <Form customerId = {customerid} />


      
    </main>
  );
}