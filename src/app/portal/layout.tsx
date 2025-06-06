
import PortalSidebar from '@/components/layout/PortalSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="patient" />
        <div className="flex flex-1 pt-16">
          <PortalSidebar />
          <SidebarInset className="p-0">
            <main className="flex-1 p-6">
              <div className="hidden md:block mb-4">
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
