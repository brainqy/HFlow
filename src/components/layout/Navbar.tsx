
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Stethoscope, User, BriefcaseMedical, UserCog, LogOut, LayoutDashboard, LogIn, ShieldAlert, CalendarCheck } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const mainNavItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/blog', label: 'Blog' },
  { href: '/appointments', label: 'Book Appointment' },
];

export default function Navbar({ userType, showSidebarToggle }: { userType?: 'patient' | 'doctor' | 'nurse' | 'admin' | 'receptionist', showSidebarToggle?: boolean }) {
  let dashboardLink = '/';
  let DashboardIconComponent = LayoutDashboard;
  let portalName = '';

  if (userType === 'patient') {
    dashboardLink = '/portal/dashboard';
    portalName = 'Patient Portal';
    DashboardIconComponent = User;
  } else if (userType === 'doctor') {
    dashboardLink = '/doctor/dashboard';
    DashboardIconComponent = UserCog;
    portalName = 'Doctor Portal';
  } else if (userType === 'nurse') {
    dashboardLink = '/nurse/dashboard';
    DashboardIconComponent = BriefcaseMedical;
    portalName = 'Nurse Portal';
  } else if (userType === 'admin') {
    dashboardLink = '/admin/dashboard';
    DashboardIconComponent = ShieldAlert;
    portalName = 'Admin Portal';
  } else if (userType === 'receptionist') {
    dashboardLink = '/receptionist/dashboard';
    DashboardIconComponent = CalendarCheck; 
    portalName = 'Receptionist Portal';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          {userType && showSidebarToggle && (
            <div className="mr-2 hidden md:block">
              <SidebarTrigger />
            </div>
          )}
          <Link href={dashboardLink} className="flex items-center gap-2">
            <Stethoscope className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-headline font-semibold text-primary">HealthFlow</h1>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {!userType && mainNavItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-foreground/80 hover:text-primary px-3">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}

          {userType ? (
            <>
              <span className="text-sm font-medium text-muted-foreground mr-4">{portalName}</span>
              <Button variant="outline" size="sm" asChild className="ml-2">
                <Link href={dashboardLink} className="flex items-center gap-2">
                  <DashboardIconComponent className="h-4 w-4" />
                  My Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="ml-2">
                <Link href="/" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="default" size="sm" asChild className="ml-2">
                <Link href="/portal-access" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-4 text-lg font-medium mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-7 w-7 text-primary" />
                  <h1 className="text-2xl font-headline font-semibold text-primary">HealthFlow</h1>
                </div>
                {!userType && mainNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground text-base py-1"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4 space-y-2">
                  {userType ? (
                    <>
                     <span className="block text-sm font-medium text-muted-foreground px-1 py-2">{portalName}</span>
                      <Button variant="ghost" asChild className="w-full justify-start text-base py-2">
                        <Link href={dashboardLink} className="flex items-center gap-3">
                          <DashboardIconComponent className="h-5 w-5" />
                          My Dashboard
                        </Link>
                      </Button>
                      <Button variant="ghost" asChild className="w-full justify-start text-base py-2">
                        <Link href="/" className="flex items-center gap-3">
                          <LogOut className="h-5 w-5" />
                          Logout
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild className="w-full justify-start text-base py-2">
                        <Link href="/portal-access" className="flex items-center gap-3">
                          <LogIn className="h-5 w-5" />
                          Sign In
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
