
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
          <SidebarInset className="p-0"> {/* Remove default padding from SidebarInset if Navbar handles it */}
            <main className="flex-1 p-6">
              <div className="mb-4 md:hidden"> {/* Mobile trigger, if needed outside Sidebar component itself */}
                 {/* The Sidebar component from ui/sidebar now handles its own mobile sheet trigger if configured as such */}
              </div>
               <div className="hidden md:block mb-4"> {/* Desktop trigger */}
                <SidebarTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <PanelLeft />
                  </Button>
                </SidebarTrigger>
              </div>
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
