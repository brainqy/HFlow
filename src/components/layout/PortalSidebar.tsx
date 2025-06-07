
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Pill, LogOut, Stethoscope, UserCircle, CalendarDays, Settings } from 'lucide-react';
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

const portalNavItems = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: "Dashboard" },
  { href: '/portal/appointments', label: 'My Appointments', icon: CalendarDays, tooltip: "My Appointments" },
  { href: '/portal/medical-history', label: 'Medical History', icon: FileText, tooltip: "Medical History" },
  { href: '/portal/medications', label: 'Medications', icon: Pill, tooltip: "Medications" },
  { href: '/portal/profile', label: 'My Profile', icon: Settings, tooltip: "My Profile & Settings"},
  { href: '/appointments', label: 'Book New Appointment', icon: Stethoscope, tooltip: "Book New Appointment" },
];

export default function PortalSidebar() {
  const { state } = useSidebar();
  const patientName = "Patient"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
         <div className="flex items-center gap-2">
          <UserCircle className="h-7 w-7 text-primary" />
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Patient Portal</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {patientName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {portalNavItems.map((item) => (
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
