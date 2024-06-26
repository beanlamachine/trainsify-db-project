import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchData } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  revalidatePath('/dashboard/Bookings/create');
  const { customers, trains, tickets } = await fetchData();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bookings', href: '/dashboard/Bookings' },
          {
            label: 'Create Booking',
            href: '/dashboard/Bookings/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} trains={trains} tickets={tickets} />
    </main>
  );
}
