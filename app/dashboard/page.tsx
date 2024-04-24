import Image from 'next/image';
import {
  UserGroupIcon,
  HomeIcon,
  TicketIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <div className="body">
      <div className='header'>
        <h1>Welcome to Trainsify </h1>
      <Image className='image'
        src="/Trainsify_Logo.png"
        width={500}
        height={500}
        alt="trainsify logo"
      />
      </div>
      <div className='Tile_Header mt-4'>Click on any of the links below to get started!</div>
      <div className="grid-container">
        <a
          href='/dashboard/Bookings'><div className="grid-item"><div className='icon_div'><CalendarDaysIcon className='icon'/></div>View Bookings</div>
        </a>
        <a href='/dashboard/Trains'>
        <div className="grid-item"><div className='icon_div'><PaperAirplaneIcon className='icon'/></div>View Trains</div>
        </a>
        <a href='/dashboard/Customers'>
        <div className="grid-item"><div className='icon_div'><UserGroupIcon className='icon'/></div>View Customers</div>
        </a>
        <a href='/dashboard/Tickets'>
        <div className="grid-item"><div className='icon_div'><TicketIcon className='icon'/></div>View Tickets</div>
        </a>
      </div>
      <div className='footer mb-2 h-10 rounded-md bg-blue-600'>Created by Armina Fani, Ben Nguyen, & Eavan Stamps</div>
    </div>
  );
}
