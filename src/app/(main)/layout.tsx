
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyContactBar from '@/components/layout/EmergencyContactBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <EmergencyContactBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
