
"use client";

import { Siren, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function EmergencyContactBar() {
  return (
    <div className="bg-background py-2 border-b border-destructive/30 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-sm text-destructive font-medium">
            <Siren className="h-5 w-5" />
            <span>For Emergency Ambulance/Appointment:</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="https://wa.me/918888822222" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="hover:opacity-80 transition-opacity">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </Link>
            <Link href="tel:+918888822222" className="text-lg font-bold text-destructive hover:underline flex items-center gap-1">
              <Phone className="h-5 w-5" />
              +91 88888 22222
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
