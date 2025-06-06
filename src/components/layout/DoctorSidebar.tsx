
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, CalendarCheck, Brain, Settings, LogOut, UserCog } from 'lucide-react';

const doctorNavItems = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/doctor/patients', label: 'My Patients', icon: Users },
  { href: '/doctor/appointments', label: 'Appointments', icon: CalendarCheck },
  { href: '/portal/ai-summary', label: 'AI Record Summary', icon: Brain }, // Link to existing AI summary
  { href: '/doctor/profile', label: 'Profile Settings', icon: Settings },
];

export default function DoctorSidebar() {
  const pathname = usePathname();
  const doctorName = "Dr. Smith"; // Placeholder

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r bg-card pt-16 transition-transform md:translate-x-0 -translate-x-full">
      <ScrollArea className="h-full py-4 px-3">
        <div className="flex flex-col h-full">
          <nav className="flex-grow space-y-2">
            <div className="mb-6 px-2">
              <div className="flex items-center gap-2 mb-1">
                <UserCog className="h-7 w-7 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Doctor Portal</h2>
              </div>
              <p className="text-sm text-muted-foreground">Welcome, {doctorName}!</p>
            </div>
            {doctorNavItems.map((item) => (
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
