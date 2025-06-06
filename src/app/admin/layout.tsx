
import AdminSidebar from '@/components/layout/AdminSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="admin" />
        <div className="flex flex-1 pt-16"> {/* pt-16 to offset fixed Navbar height */}
          <AdminSidebar />
          <SidebarInset className="p-6 overflow-y-auto"> {/* SidebarInset is the <main> tag, now handles padding and scroll */}
            <div className="hidden md:block mb-4"> {/* Desktop trigger */}
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PanelLeft />
                </Button>
              </SidebarTrigger>
            </div>
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
