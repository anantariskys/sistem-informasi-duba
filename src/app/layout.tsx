import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import ClientSessionProvider from '@/client/provider/ClientSessionProvider';
import QueryProvider from '@/client/provider/QueryProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/lib/auth';

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'SISTEM INFORMASI DIBU',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ToastContainer />
        <ClientSessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
