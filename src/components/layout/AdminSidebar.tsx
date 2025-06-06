
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Settings, BarChart2, LogOut, ShieldAlert } from 'lucide-react';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/settings', label: 'Clinic Settings', icon: Settings },
  { href: '/admin/reports', label: 'Reports', icon: BarChart2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const adminName = "Admin User"; // Placeholder

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r bg-card pt-16 transition-transform md:translate-x-0 -translate-x-full">
      <ScrollArea className="h-full py-4 px-3">
        <div className="flex flex-col h-full">
          <nav className="flex-grow space-y-2">
            <div className="mb-6 px-2">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="h-7 w-7 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Admin Portal</h2>
              </div>
              <p className="text-sm text-muted-foreground">Welcome, {adminName}!</p>
            </div>
            {adminNavItems.map((item) => (
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
