
'use client';

import Link from 'next/link';
import { LayoutDashboard, CalendarClock, Users, UserCog, LogOut, BriefcaseMedical } from 'lucide-react';
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

const visitingDoctorNavItems = [
  { href: '/visiting-doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/visiting-doctor/schedule', label: 'My Schedule', icon: CalendarClock, tooltip: 'My Assigned Schedule' },
  { href: '/visiting-doctor/patients', label: 'Assigned Patients', icon: Users, tooltip: 'View Assigned Patients' },
  { href: '/visiting-doctor/profile', label: 'My Profile', icon: UserCog, tooltip: 'My Profile' },
];

export default function VisitingDoctorSidebar() {
  const { state } = useSidebar();
  const doctorName = "Visiting Doctor"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="h-7 w-7 text-primary" /> {/* Icon can be changed */}
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Visiting Doctor</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {doctorName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {visitingDoctorNavItems.map((item) => (
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
