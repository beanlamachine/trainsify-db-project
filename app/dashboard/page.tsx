import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <p>Dashboard Page</p>
      <Image 
        src="/Trainsify_Logo.png"
        width={500}
        height={500} 
        alt="Picture of the author" 
      />
    </div>
  );
}
