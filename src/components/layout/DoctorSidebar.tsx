
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, CalendarCheck, Settings, LogOut, UserCog, PanelLeft } from 'lucide-react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar 
} from '@/components/ui/sidebar';

const doctorNavItems = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/doctor/patients', label: 'My Patients', icon: Users, tooltip: 'My Patients' },
  { href: '/doctor/appointments', label: 'Appointments', icon: CalendarCheck, tooltip: 'Appointments' },
  { href: '/doctor/profile', label: 'Profile Settings', icon: Settings, tooltip: 'Profile Settings' },
];

export default function DoctorSidebar() {
  const { state } = useSidebar();
  const doctorName = "Dr. Smith"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Link href="#"><PanelLeft /></Link>
        </Button>
        <div className="flex items-center gap-2">
          <UserCog className="h-7 w-7 text-primary" />
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Doctor Portal</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {doctorName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {doctorNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton href={item.href} icon={<item.icon />} tooltip={item.tooltip}>
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="/" icon={<LogOut />} tooltip="Logout">
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
