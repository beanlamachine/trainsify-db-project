import Form from '@/app/ui/invoices/create-ticket-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchTickets, fetchData } from '@/app/lib/data';
 
export default async function Page() {
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