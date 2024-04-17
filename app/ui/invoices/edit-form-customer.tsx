
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {updateCustomer } from '@/app/lib/actions';
import { fetchCustomersByID } from '@/app/lib/data';

interface FormProps {
    customerId: number;
}

export default async function Form({ customerId }: FormProps) {
    const customersData = await fetchCustomersByID(customerId);
    const updateCustomerWithID = updateCustomer.bind(null, customerId);
    return (
        <form action={updateCustomerWithID} className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Customer Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter updated name</label>
                <input type="text" id="name" name="name" defaultValue={customersData?.name || ''}  className="mt-1 p-2 w-full border-gray-300 rounded-md" />
            </div>
            {/* Year of Birth */}
            <div className="mb-4">
                <label htmlFor="yeardob" className="block text-sm font-medium text-gray-700">Enter updated Year of Birth</label>
                <input type="number" id="yeardob" name="yeardob" defaultValue={customersData?.yeardob?.toString() || ''}  className="mt-1 p-2 w-full border-gray-300 rounded-md" />
            </div>
            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter updated Email</label>
                <input type="email" id="email" name="email" defaultValue={customersData?.email || ''}  className="mt-1 p-2 w-full border-gray-300 rounded-md" />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/Customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Customer</Button>
            </div>
        </form>
    );
}
