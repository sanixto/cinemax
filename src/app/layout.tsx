import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: `Cinemax`,
  description: `Сервіс онлайн купівлі квитків у кінотеатр Cinemax`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
