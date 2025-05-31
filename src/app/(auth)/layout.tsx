import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-darkPurple flex items-center justify-between overflow-hidden">
      {/* Overlay image dengan opacity */}
      <div className="absolute inset-0 bg-[url('/images/auth.jpg')] bg-cover bg-center bg-no-repeat opacity-30 z-0" />

      {/* Konten di atas background */}
      <div className="relative flex justify-center w-full text-white">
      <Image
          src={'/images/logo.png'}
          alt='logo'
          width={700}
          height={50}
          priority
          className={`transition-all duration-300 ease-in-out`}
        />
        {/* Tambahkan konten jika perlu */}
      </div>

      <div className="relative z-10 p-6 bg-white rounded-l-xl flex items-center max-w-2xl w-full min-h-screen shadow-md">
        {children}
      </div>
    </div>
  );
}
