import './_styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from './_components/Sidebar';
import TopBar from './_components/TopBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soundverse DNA Creator',
  description: 'Build your unique audio DNA profile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-soundverse-dark text-gray-100`}>
        <Sidebar />
        <TopBar />
        <main className="ml-16 mt-16 p-6 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}