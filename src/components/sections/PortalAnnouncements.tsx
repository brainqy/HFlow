
"use client";

import { useState, useEffect } from 'react';
import { placeholderAnnouncements } from '@/lib/placeholder-data';
import type { Announcement, AnnouncementDisplayLocation } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

interface PortalAnnouncementsProps {
  portalType: AnnouncementDisplayLocation;
}

export default function PortalAnnouncements({ portalType }: PortalAnnouncementsProps) {
  const [activeAnnouncements, setActiveAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const now = new Date();
    const announcements = placeholderAnnouncements.filter(ann => {
      const isTargeted = ann.displayLocations.includes(portalType) || ann.displayLocations.includes('all_portals');
      const isActiveDate = new Date(ann.startDate) <= now && (!ann.endDate || new Date(ann.endDate) >= now);
      return isTargeted && isActiveDate;
    }).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setActiveAnnouncements(announcements);
  }, [portalType]);

  if (activeAnnouncements.length === 0) {
    return null; // Don't render anything if no active announcements for this portal
  }

  return (
    <section className="mb-8 space-y-4">
      {activeAnnouncements.map(ann => (
        <Alert key={ann.id} className="shadow-md">
          <Bell className="h-5 w-5 text-primary" />
          <AlertTitle className="font-headline text-lg text-primary">{ann.title}</AlertTitle>
          <AlertDescription className="text-foreground/90">
            {ann.content}
            <p className="text-xs text-muted-foreground mt-1">
              Posted: {format(new Date(ann.createdAt), "PPP")}
              {ann.endDate && ` (Ends: ${format(new Date(ann.endDate), "PPP")})`}
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </section>
  );
}
