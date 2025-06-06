
import NurseSidebar from '@/components/layout/NurseSidebar';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function NursePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar /> 
      <div className="flex flex-1 pt-16"> {/* pt-16 to offset fixed Navbar height */}
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
         <NurseSidebar />
        </div>
        
        <div className="md:hidden fixed top-18 left-2 z-50"> {/* Adjust as needed */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 pt-16">
              <NurseSidebar />
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
