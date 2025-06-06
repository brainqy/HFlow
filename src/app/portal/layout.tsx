import PortalSidebar from '@/components/layout/PortalSidebar';
import Navbar from '@/components/layout/Navbar'; // Using the main navbar for consistency on top
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Navbar remains for branding and top-level navigation like logout */}
      <Navbar /> 
      <div className="flex flex-1 pt-16"> {/* pt-16 to offset fixed Navbar height */}
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
         <PortalSidebar />
        </div>
        
        {/* Mobile Sidebar Trigger - integrated into Navbar or as a separate button if Navbar is removed from portal */}
        <div className="md:hidden fixed top-18 left-2 z-50"> {/* Adjust positioning if needed */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 pt-16"> {/* pt-16 to offset fixed Navbar height */}
              <PortalSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <main className="flex-1 p-6 md:ml-64"> {/* ml-64 for desktop sidebar width */}
          {children}
        </main>
      </div>
    </div>
  );
}
