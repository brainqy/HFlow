
import DoctorSidebar from '@/components/layout/DoctorSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function DoctorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="doctor" showSidebarToggle={true} />
        <div className="flex flex-1 pt-16">
          <DoctorSidebar />
          <SidebarInset className="pl-4 pr-6 py-4 overflow-y-auto">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
