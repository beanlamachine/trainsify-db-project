'use client';

import { CustomerField, Trains, Tickets } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {createBooking } from '@/app/lib/actions';
import React, { useState, useEffect } from 'react';
interface FormProps {
  customers: CustomerField[];
  trains: Trains[];
  tickets: Tickets[];
}


export default function Form({ customers, trains, tickets }: FormProps) {
  const [selectedTrainId, setSelectedTrainId] = useState('');
  const [filteredTickets, setFilteredTickets] = useState<Tickets[]>([]);

  useEffect(() => {
    if (selectedTrainId) {
      const validTickets = tickets.filter(ticket => ticket.trainid === parseInt(selectedTrainId));
      setFilteredTickets(validTickets);
    } else {
      setFilteredTickets([]);
    }
  }, [selectedTrainId, tickets]);

  return (
    <form action={createBooking}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customerid"
              name="customerid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.customerid} value={customer.customerid}>
                  {customer.name}
                  {customer.email}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Train Information */}
        <div className="mb-4">
          <label htmlFor="train" className="mb-2 block text-sm font-medium">
            Choose a train
          </label>
          <div className="relative">
            <select
              id="trainid"
              name="trainid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={e => setSelectedTrainId(e.target.value)}
            >
              <option value="" disabled>
                Select a train
              </option>
              {trains.map((train) => (
                <option key={train.trainid} value={train.trainid}>
                  {train.type}
                </option>
              ))}
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Ticket Information */}
        <div className="mb-4">
          <label htmlFor="ticket" className="mb-2 block text-sm font-medium">
            Choose a ticket
          </label>
          <div className="relative">
            <select
              id="ticketid"
              name="ticketid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a ticket
              </option>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <option key={ticket.ticketid} value={ticket.ticketid}>
                    {ticket.origin} to {ticket.destination} on {new Date(ticket.departure_time).toLocaleString()}
                  </option>
                ))
              ) : (
                <option disabled>No tickets available for selected train</option>
              )}
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
        
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/Bookings"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Booking</Button>
      </div>
    </form>
  );
}
