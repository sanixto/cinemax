import type { Metadata } from 'next';

import './globals.css';
import Header from '@/components/header';

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
