import DeletePage from '@/app/ui/invoices/delete-booking-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page({ params }: { params: { bookingid: number } }) {
    const bookingid = params.bookingid;
    //const { customerid, name, yeardob, email } = await fetchData();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bookings', href: '/dashboard/Bookings' },
          {
            label: 'Delete Bookings',
            href: `/dashboard/invoices/${bookingid}/delete`,
            active: true,
          },
        ]}
      />
    <DeletePage bookingid = {bookingid}></DeletePage>

      
    </main>
  );
}