
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UsersRound, ActivitySquare, PackageSearch, CalendarClock, UserCog as ProfileIcon, LogOut, BriefcaseMedical } from 'lucide-react';
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

const nurseNavItems = [
  { href: '/nurse/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/nurse/patient-queue', label: 'Patient Queue', icon: UsersRound, tooltip: 'Patient Queue' },
  { href: '/nurse/vitals-entry', label: 'Vitals Entry', icon: ActivitySquare, tooltip: 'Vitals Entry' },
  { href: '/nurse/supplies', label: 'Supplies Mgmt', icon: PackageSearch, tooltip: 'Supplies Management' },
  { href: '/nurse/schedule', label: 'My Schedule', icon: CalendarClock, tooltip: 'My Schedule' },
  { href: '/nurse/profile', label: 'My Profile', icon: ProfileIcon, tooltip: 'My Profile & Settings' },
];

export default function NurseSidebar() {
  const { state } = useSidebar();
  const nurseName = "Nurse Alex"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="h-7 w-7 text-primary" />
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Nurse Portal</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {nurseName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {nurseNavItems.map((item) => (
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
