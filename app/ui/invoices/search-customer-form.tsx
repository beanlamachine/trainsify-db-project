'use client';

import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchBookingsByID, countBookingsByCustomerId } from '@/app/lib/data';
import { Bookings } from '@/app/lib/definitions';
import { CustomerField, Trains, Tickets } from '@/app/lib/definitions';

interface FormProps {
  customers: CustomerField[];
  trains: Trains[];
  tickets: Tickets[];
}

export default function Form({ customers }: FormProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    number | undefined
  >(undefined);
  const [bookingsData, setBookingsData] = useState<Bookings[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCustomerId !== undefined) {
        const bookings = await fetchBookingsByID(selectedCustomerId);
        setBookingsData(bookings.rows);

        // Fetch and set the total number of bookings
        const total = await countBookingsByCustomerId(selectedCustomerId);
        setTotalBookings(total);
      }
    };

    fetchData();
  }, [selectedCustomerId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    const selectedCustomer = customers.find(
      (customer) => customer.name === name,
    );
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
                    {customer.name} ({customer.email}, ID: {customer.customerid})
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </form>
      <div>
        {/* Display total number of bookings */}
        {selectedCustomerId !== undefined && (
          <div className='mt-5'>Total Bookings: {totalBookings}</div> 
        )}
      </div>
      <div className='Showing'>
        {bookingsData.map((booking) => (
          <div className='Showing_Tile' key={booking.bookingid}>
            <div className='Tile_Header'>Booking ID: {booking.bookingid}</div>
            <table>
              <tbody>
                <tr>
                  <td>Train ID:</td>
                  <td>{booking.trainid}</td>
                </tr>
                <tr>
                  <td>Ticket ID:</td>
                  <td> {booking.ticketid}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
