import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-primary flex items-center justify-between overflow-hidden">
      {/* Overlay image dengan opacity */}
      <div className="absolute inset-0 bg-[url('/images/auth.jpg')] bg-cover bg-center bg-no-repeat opacity-50 z-0" />

      {/* Konten di atas background */}
      <div className="relative z-10 text-custom-white">
        {/* Tambahkan konten jika perlu */}
      </div>

      <div className="relative z-10 p-6 bg-white rounded-l-xl flex items-center max-w-2xl w-full min-h-screen shadow-md">
        {children}
      </div>
    </div>
  );
}
