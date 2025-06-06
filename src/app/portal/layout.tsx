
import PortalSidebar from '@/components/layout/PortalSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="patient" showSidebarToggle={true} />
        <div className="flex flex-1 pt-16">
          <PortalSidebar />
          <SidebarInset className="px-6 py-4 overflow-y-auto">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
