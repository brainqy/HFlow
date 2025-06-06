
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Stethoscope, User, BriefcaseMedical, UserCog } from 'lucide-react'; // Added User, BriefcaseMedical for nurse, UserCog for doctor

const mainNavItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/blog', label: 'Blog' },
  { href: '/appointments', label: 'Book Appointment' },
];

const portalLoginNavItems = [
  { href: '/login', label: 'Patient Login', icon: User },
  { href: '/doctor-login', label: 'Doctor Login', icon: UserCog },
  { href: '/nurse-login', label: 'Nurse Login', icon: BriefcaseMedical },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-headline font-semibold text-primary">HealthFlow</h1>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNavItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-foreground/80 hover:text-primary px-3">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          {portalLoginNavItems.map((item) => (
             <Button key={item.label} variant="outline" size="sm" asChild className="ml-2">
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
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
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-7 w-7 text-primary" />
                  <h1 className="text-2xl font-headline font-semibold text-primary">HealthFlow</h1>
                </Link>
                {mainNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground text-base py-1"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4 space-y-2">
                  {portalLoginNavItems.map((item) => (
                    <Button key={item.label} variant="ghost" asChild className="w-full justify-start text-base py-2">
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
