
import ManagerSidebar from '@/components/layout/ManagerSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function ManagerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="manager" showSidebarToggle={true} />
        <div className="flex flex-1 pt-16"> {/* pt-16 to offset fixed Navbar height */}
          <ManagerSidebar />
          <SidebarInset className="px-4 py-4 overflow-y-auto">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
