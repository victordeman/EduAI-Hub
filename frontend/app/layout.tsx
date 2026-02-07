import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduAI Hub - AI-Powered Education Platform',
  description: 'AI platform for universities',
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div className="flex pt-16">
            <Sidebar />
            <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 lg:p-8 overflow-auto">
              <div className="max-w-7xl mx-auto transition-opacity duration-150">
                {children}
              </div>
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
