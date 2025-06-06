
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LayoutDashboard, UsersRound, ActivitySquare, PackageSearch, CalendarClock, Settings, LogOut, BriefcaseMedical } from 'lucide-react';

const nurseNavItems = [
  { href: '/nurse/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/nurse/patient-queue', label: 'Patient Queue', icon: UsersRound },
  { href: '/nurse/vitals-entry', label: 'Vitals Entry', icon: ActivitySquare },
  { href: '/nurse/supplies', label: 'Supplies Mgmt', icon: PackageSearch },
  { href: '/nurse/schedule', label: 'My Schedule', icon: CalendarClock },
  { href: '/nurse/profile', label: 'Profile Settings', icon: Settings },
];

export default function NurseSidebar() {
  const pathname = usePathname();
  const nurseName = "Nurse Alex"; // Placeholder

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r bg-card pt-16 transition-transform md:translate-x-0 -translate-x-full">
      <ScrollArea className="h-full py-4 px-3">
        <div className="flex flex-col h-full">
          <nav className="flex-grow space-y-2">
            <div className="mb-6 px-2">
               <div className="flex items-center gap-2 mb-1">
                <BriefcaseMedical className="h-7 w-7 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Nurse Portal</h2>
              </div>
              <p className="text-sm text-muted-foreground">Welcome, {nurseName}!</p>
            </div>
            {nurseNavItems.map((item) => (
              <Button
                key={item.label}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start', pathname === item.href && 'bg-primary/10 text-primary hover:bg-primary/20')}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="mt-auto p-2 border-t">
             <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" asChild>
              <Link href="/"> {/* Main page or specific logout page */}
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
