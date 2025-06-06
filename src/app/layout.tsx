
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google'; // Using next/font for better performance
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { GlobalLoader } from '@/components/layout/GlobalLoader';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'HealthFlow - Modern Healthcare Management',
  description: 'Securely manage patient information, appointments, and medical records with HealthFlow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Standard Google Font links replaced by next/font */}
      </head>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable,
        poppins.variable
      )}>
        <GlobalLoader>
          {children}
        </GlobalLoader>
        <Toaster />
      </body>
    </html>
  );
}
