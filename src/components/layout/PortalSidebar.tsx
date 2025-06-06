'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, Pill, Brain, LogOut, UserCircle, Stethoscope } from 'lucide-react';

const portalNavItems = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/medical-history', label: 'Medical History', icon: FileText },
  { href: '/portal/medications', label: 'Medications', icon: Pill },
  { href: '/portal/ai-summary', label: 'AI Record Summary', icon: Brain },
  { href: '/appointments', label: 'Book Appointment', icon: Stethoscope },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r bg-card pt-16 transition-transform md:translate-x-0 -translate-x-full">
      <ScrollArea className="h-full py-4 px-3">
        <div className="flex flex-col h-full">
          <nav className="flex-grow space-y-2">
            <div className="mb-6 px-2">
              <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Patient Portal</h2>
              <p className="text-sm text-muted-foreground">Welcome, Patient!</p>
            </div>
            {portalNavItems.map((item) => (
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
              <Link href="/">
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
