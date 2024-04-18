import Form from '@/app/ui/invoices/createForm2';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchData } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  revalidatePath('/dashboard/Customers/Create');
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/Customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/Customers/Create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}