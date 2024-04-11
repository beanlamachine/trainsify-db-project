import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function TainsifyLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <img src='@/app/ui/Trainsify_Logo.PNG' alt="logo"></img>
      <p className="text-[44px]">Trainsify</p>
    </div>
  );
}
