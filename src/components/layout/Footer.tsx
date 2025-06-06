import Link from 'next/link';
import { Stethoscope, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Stethoscope className="h-7 w-7 text-primary" />
              <h2 className="text-xl font-headline font-semibold text-primary">HealthFlow</h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              Providing comprehensive and compassionate healthcare services. Your health is our priority.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-headline text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/doctors" className="text-muted-foreground hover:text-primary">Find a Doctor</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Health Blog</Link></li>
              <li><Link href="/appointments" className="text-muted-foreground hover:text-primary">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-headline text-lg font-medium">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                123 Health St, Wellness City, CA 90210
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                (123) 456-7890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                contact@healthflow.clinic
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HealthFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
