import { Button } from '@/app/ui/button';
import { deleteCustomer } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';
interface FormProps {
  customerid: number;
}

export default async function DeletePage({ customerid }: FormProps) {
  const deleteCustomerWithId = deleteCustomer.bind(null, customerid);
  return (
    <form
      action={deleteCustomerWithId}
      className="rounded-md bg-gray-50 p-4 md:p-6"
    >
      <div>Are you sure you want to delete this customer?</div>
      <Button type="submit">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </Button>
    </form>
  );
}
