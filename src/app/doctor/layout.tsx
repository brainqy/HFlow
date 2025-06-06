
import DoctorSidebar from '@/components/layout/DoctorSidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default function DoctorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Navbar userType="doctor" />
        <div className="flex flex-1 pt-16">
          <DoctorSidebar />
          <SidebarInset className="px-6 py-4 overflow-y-auto"> {/* Reduced vertical padding */}
            <div className="hidden md:block"> 
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
