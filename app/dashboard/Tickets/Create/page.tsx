import Form from '@/app/ui/invoices/create-ticket-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchData } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  revalidatePath('/dashboard/Tickets/Create');
  const { customers, trains, tickets } = await fetchData();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/dashboard/Tickets' },
          {
            label: 'Create Ticket',
            href: '/dashboard/Tickets/Create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} trains={trains} tickets={tickets} />
    </main>
  );
}