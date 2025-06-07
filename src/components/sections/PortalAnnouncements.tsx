
"use client";

import { useState, useEffect } from 'react';
import { placeholderAnnouncements } from '@/lib/placeholder-data';
import type { Announcement, AnnouncementDisplayLocation } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface PortalAnnouncementsProps {
  portalType: AnnouncementDisplayLocation;
}

export default function PortalAnnouncements({ portalType }: PortalAnnouncementsProps) {
  const [activeAnnouncements, setActiveAnnouncements] = useState<Announcement[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const now = new Date();
    const announcements = placeholderAnnouncements.filter(ann => {
      const isTargeted = ann.displayLocations.includes(portalType) || ann.displayLocations.includes('all_portals');
      const isActiveDate = new Date(ann.startDate) <= now && (!ann.endDate || new Date(ann.endDate) >= now);
      return isTargeted && isActiveDate;
    }).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setActiveAnnouncements(announcements);
    // Reset expansion state if announcements change, default to expanded
    setIsExpanded(true); 
  }, [portalType]);

  if (activeAnnouncements.length === 0) {
    return null;
  }

  const announcementsToDisplay = isExpanded || activeAnnouncements.length <= 1 
    ? activeAnnouncements 
    : [activeAnnouncements[0]];

  return (
    <section className="mb-8 space-y-4">
      {activeAnnouncements.length > 1 && (
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary hover:text-primary/80"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Hide Older
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> Show All ({activeAnnouncements.length})
              </>
            )}
          </Button>
        </div>
      )}
      {announcementsToDisplay.map(ann => (
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
