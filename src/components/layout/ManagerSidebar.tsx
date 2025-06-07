
'use client';

import LinkImport from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Settings as ClinicSettingsIcon, BarChart2, LogOut, ShieldAlert, FileText, Briefcase, UserCog as ProfileIcon, Eye } from 'lucide-react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroupLabel,
  useSidebar
} from '@/components/ui/sidebar';

const managerNavItems = [
  { href: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/manager/users', label: 'User Management', icon: Users, tooltip: 'User Management' },
  { href: '/manager/doctors', label: 'Manage Doctors', icon: ProfileIcon, tooltip: 'Manage Doctors & Schedules' },
  { href: '/manager/services-offered', label: 'Manage Services', icon: Briefcase, tooltip: 'Manage Services' },
  { href: '/manager/blogs', label: 'Manage Blogs', icon: FileText, tooltip: 'Manage Blogs' },
  { href: '/manager/announcements', label: 'Announcements', icon: ShieldAlert, tooltip: 'Clinic Announcements'},
  { href: '/manager/homepage-settings', label: 'Homepage Widgets', icon: Eye, tooltip: 'Manage Homepage Widgets'},
  { href: '/manager/settings', label: 'Clinic Settings', icon: ClinicSettingsIcon, tooltip: 'Clinic Settings' },
  { href: '/manager/profile', label: 'My Profile', icon: ProfileIcon, tooltip: 'My Profile' },
  { href: '/manager/reports', label: 'Reports', icon: BarChart2, tooltip: 'Reports' },
];

export default function ManagerSidebar() {
  const { state } = useSidebar();
  const managerName = "Manager User"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-7 w-7 text-primary" />
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Manager Portal</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {managerName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {managerNavItems.map((item) => (
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
