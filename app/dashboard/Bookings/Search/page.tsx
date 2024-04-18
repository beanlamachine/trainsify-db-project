import Form from '@/app/ui/invoices/search-customer-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchData } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  revalidatePath('/dashboard/Bookings/Search');
  const { customers, trains, tickets } = await fetchData();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bookings', href: '/dashboard/Bookings' },
          {
            label: 'Search Bookings',
            href: '/dashboard/Bookings/Search',
            active: true,
          },
        ]}
      />
      <Form customers={customers} trains={trains} tickets={tickets}  />
    </main>
  );
}
