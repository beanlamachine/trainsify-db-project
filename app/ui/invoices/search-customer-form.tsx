'use client';

import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchBookingsByID } from '@/app/lib/data';
import { Bookings } from '@/app/lib/definitions'; 
import { CustomerField, Trains, Tickets } from '@/app/lib/definitions';


interface FormProps {
  customers: CustomerField[];
  trains: Trains[];
  tickets: Tickets[];
}

export default function Form({ customers }: FormProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | undefined>(undefined);
  const [bookingsData, setBookingsData] = useState<Bookings[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (selectedCustomerId !== undefined) {
        const data = await fetchBookingsByID(selectedCustomerId);
        setBookingsData(data.rows); 
      }
    };

    fetchBookings();
  }, [selectedCustomerId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    const selectedCustomer = customers.find(customer => customer.name === name);
    if (selectedCustomer) {
      setSelectedCustomerId(selectedCustomer.customerid);
    } else {
      setSelectedCustomerId(undefined);
    }
  };

  return (
    <div>
      <form>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer Name */}
          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Choose customer
            </label>
            <div className="relative">
              <select
                id="customerid"
                name="customerid"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {customers.map((customer) => (
                  <option key={customer.customerid} value={customer.name}>
                    {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </form>

      <div>
        {bookingsData.map((booking) => (
          <div key={booking.bookingid}>
            <p>Booking ID: {booking.bookingid}</p>
            <p>Customer ID: {booking.customerid}</p>
            <p>Train ID: {booking.trainid}</p>
            <p>Ticket ID: {booking.ticketid}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
