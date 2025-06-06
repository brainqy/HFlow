
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Settings, BarChart2, LogOut, ShieldAlert, PanelLeft } from 'lucide-react';
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
} from '@/components/ui/sidebar'; // Assuming SidebarProvider is in layout

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/admin/users', label: 'User Management', icon: Users, tooltip: 'User Management' },
  { href: '/admin/settings', label: 'Clinic Settings', icon: Settings, tooltip: 'Clinic Settings' },
  { href: '/admin/reports', label: 'Reports', icon: BarChart2, tooltip: 'Reports' },
];

export default function AdminSidebar() {
  const { state } = useSidebar();
  const adminName = "Admin User"; // Placeholder

  return (
    <Sidebar collapsible={state === 'expanded' ? "icon" : "offcanvas"}>
      <SidebarHeader>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Link href="#"><PanelLeft /></Link> 
        </Button>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-7 w-7 text-primary" />
          {state === 'expanded' && <h2 className="text-lg font-semibold tracking-tight font-headline text-primary">Admin Portal</h2>}
        </div>
        {state === 'expanded' && <p className="text-sm text-muted-foreground">Welcome, {adminName}!</p>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavItems.map((item) => (
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
