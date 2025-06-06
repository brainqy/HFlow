
import ReceptionistSidebar from '@/components/layout/ReceptionistSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function ReceptionistPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="receptionist" showSidebarToggle={true} />
        <div className="flex flex-1 pt-16"> {/* pt-16 to offset fixed Navbar height */}
          <ReceptionistSidebar />
          <SidebarInset className="pl-4 pr-6 py-4 overflow-y-auto">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
