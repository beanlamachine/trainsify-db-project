import { Button } from '@/app/ui/button';
import { deleteBooking } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';
interface FormProps {
  bookingid: number;
}

export default async function DeletePage({ bookingid }: FormProps) {
  const deleteBookingWithId = deleteBooking.bind(null, bookingid);
  return (
    <form
      action={deleteBookingWithId}
      className="rounded-md bg-gray-50 p-4 md:p-6"
    >
      <div>Are you sure you want to delete this booking?</div>
      <Button type="submit">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </Button>
    </form>
  );
}
