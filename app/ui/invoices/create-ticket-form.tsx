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
import { createTicket } from '@/app/lib/actions2';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface FormProps {
  tickets: Tickets[];
  trains: Trains[];
  customers: CustomerField[];
}

export default function Form({ customers, trains, tickets }: FormProps) {
  const [departure_time, setDeparture_time] = useState<Date | null>(new Date()); // Initialize with null
  const [arrival_time, setArrival_time] = useState<Date | null>(new Date());
  return (
    <form action={createTicket}>
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

      {/* Origin */}
      <div className="mb-4">
        <label htmlFor="origin" className="mb-2 block text-sm font-medium">
          Enter origin:
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="origin"
              name="origin"
              type="text"
              placeholder="Enter origin"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Enter destination:
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="destination"
              name="destination"
              type="destination"
              placeholder="Enter destination"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      {/* departure time */}
      <div className="mb-4">
        <label
          htmlFor="departure_time"
          className="mb-2 block text-sm font-medium"
        >
          Enter departure time:
        </label>
        <DatePicker
          selected={departure_time}
          onChange={(date) => setDeparture_time(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          id="departure_time"
          name="departure_time"
          placeholderText="Enter departure time"
        />
      </div>

      {/* departure time */}
      <div className="mb-4">
        <label
          htmlFor="arrival_time"
          className="mb-2 block text-sm font-medium"
        >
          Enter arrival time:
        </label>
        <DatePicker
          selected={arrival_time}
          onChange={(date) => setArrival_time(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          id="arrival_time"
          name="arrival_time"
          placeholderText="Enter arrival time"
        />
      </div>

      {/* available tickets */}
      <div className="mb-4">
        <label htmlFor="available" className="mb-2 block text-sm font-medium">
          Enter available tickets:
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="available"
              name="available"
              type="available"
              placeholder="Enter available"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/Customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Ticket</Button>
      </div>
    </form>
  );
}
