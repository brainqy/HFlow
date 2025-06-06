
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  UserPlus, 
  Users, 
  Settings, 
  LogOut, 
  PanelLeft,
  CalendarCheck
} from 'lucide-react';
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

const receptionistNavItems = [
  { href: '/receptionist/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/receptionist/appointments', label: 'Manage Appointments', icon: CalendarPlus, tooltip: 'Manage Appointments' },
  { href: '/receptionist/register-patient', label: 'Register Patient', icon: UserPlus, tooltip: 'Register New Patient' },
  { href: '/receptionist/patients', label: 'Patient Directory', icon: Users, tooltip: 'Patient Directory' },
  { href: '/receptionist/profile', label: 'My Profile', icon: Settings, tooltip: 'My Profile' },
];

export default function ReceptionistSidebar() {
  const { state } = useSidebar();
  const receptionistName = "Receptionist"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Link href="#"><PanelLeft /></Link>
        </Button>
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-7 w-7 text-primary" /> {/* Icon for Receptionist Portal */}
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Receptionist Portal</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {receptionistName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {receptionistNavItems.map((item) => (
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
