
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDoctorAppointments, placeholderDoctorPatients, placeholderDoctors, allClinicAppointments } from '@/lib/placeholder-data';
import { CalendarCheck, Users, Brain, ClipboardPlus, ListOrdered, Eye, Filter, RotateCcw, Ticket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import PortalAnnouncements from '@/components/sections/PortalAnnouncements';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

export default function DoctorDashboardPage() {
  const doctorProfile = placeholderDoctors.find(doc => doc.name === "Dr. Eleanor Vance") || placeholderDoctors[0]; 
  const doctorName = doctorProfile.name;
  const currentDoctorId = doctorProfile.id;
  
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        const notificationKey = `doctorNotification_${currentDoctorId}`;
        const notificationDataString = localStorage.getItem(notificationKey);
        if (notificationDataString) {
          const notificationData = JSON.parse(notificationDataString);
          toast({
            title: "Patient En Route",
            description: `${notificationData.patientName} has been sent for consultation.`,
            action: (
              <ToastAction
                altText="View Patient Chart"
                onClick={() => router.push(`/doctor/patients/${notificationData.patientId}/chart`)}
              >
                View Chart
              </ToastAction>
            ),
            duration: 10000, 
          });
          localStorage.removeItem(notificationKey);
        }
      } catch (error) {
        console.error("Error checking for doctor notification:", error);
      }
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [currentDoctorId, toast, router]);


  const displayedAppointments = useMemo(() => {
    const relevantAppointments = allClinicAppointments.filter(a => a.doctorId === currentDoctorId);

    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = dateRange.to ? new Date(dateRange.to) : fromDate;
      toDate.setHours(0, 0, 0, 0);

      const rangeLabel = dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime()
        ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
        : format(dateRange.from, "LLL dd, y");

      const filtered = relevantAppointments.filter(appt => {
        const apptDate = new Date(appt.date);
        apptDate.setHours(0, 0, 0, 0);
        return apptDate >= fromDate && apptDate <= toDate;
      });
      return {
        count: filtered.length,
        label: `Appointments (${rangeLabel})`,
        list: filtered.sort((a, b) => {
            const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            if (dateComparison !== 0) return dateComparison;
            if (a.ticketNumber && b.ticketNumber) return a.ticketNumber - b.ticketNumber;
            return a.time.localeCompare(b.time);
        }),
      };
    }

    const todayISO = new Date().toISOString().split('T')[0];
    const todays = relevantAppointments.filter(a => a.date === todayISO);
    return {
      count: todays.length,
      label: "Today's Appointments",
      list: todays.sort((a,b) => {
        if (a.ticketNumber && b.ticketNumber) return a.ticketNumber - b.ticketNumber;
        return a.time.localeCompare(b.time);
      }),
    };
  }, [dateRange, currentDoctorId]);

  const clearDateFilter = () => {
    setDateRange(undefined);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {doctorName}!</h1>
          <p className="text-muted-foreground">Your dashboard for {todayFormatted}.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/doctor/profile" className="flex items-center gap-2">
            View Profile
          </Link>
        </Button>
      </header>
      
      <PortalAnnouncements portalType="doctor_portal" />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filter Appointments by Date
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="dashboardDateRange" className="block text-sm font-medium text-foreground mb-1">Date Range</label>
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>
          {dateRange && (
            <Button onClick={clearDateFilter} variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" /> Clear Filter
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{displayedAppointments.label}</CardTitle>
            <CalendarCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayedAppointments.count}</div>
             <Link href="/doctor/appointments" className="text-xs text-primary hover:underline">View Full Schedule</Link>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placeholderDoctorPatients.filter(p => p.primaryDoctorId === currentDoctorId || allClinicAppointments.some(app => app.patientId === p.id && app.doctorId === currentDoctorId)).length}</div>
            <p className="text-xs text-muted-foreground">under your care</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Lab Reviews</CardTitle>
            <ListOrdered className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div> {/* Placeholder */}
            <p className="text-xs text-muted-foreground">awaiting your review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <CalendarCheck className="h-6 w-6 text-primary" /> {dateRange ? `Schedule for ${displayedAppointments.label.replace('Appointments (','').replace(')','')}` : "Today's Schedule"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {displayedAppointments.list.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {displayedAppointments.list.map(appt => (
                  <div key={appt.id} className="p-3 border rounded-md bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-foreground">{appt.patientName} {appt.ticketNumber && <span className="text-xs text-muted-foreground">(Ticket #{appt.ticketNumber})</span>}</p>
                            <p className="text-sm text-muted-foreground">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {appt.time}</p>
                        </div>
                        <Badge variant="outline">{appt.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Reason: {appt.reason}</p>
                    <div className="mt-2">
                      <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary text-xs">
                        <Link href={`/doctor/patients/${appt.patientId}/chart`} className="flex items-center gap-1">
                           <Eye className="h-3 w-3" /> View Patient Chart
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No appointments scheduled for {dateRange ? `the selected period` : "today"}.</p>
            )}
            <Button asChild className="mt-4 w-full">
              <Link href="/doctor/appointments">View Full Schedule</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <ClipboardPlus className="h-6 w-6 text-primary" /> Common Actions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="default" className="w-full opacity-50 cursor-not-allowed">New Prescription</Button>
                    <Button variant="outline" className="w-full opacity-50 cursor-not-allowed">Order Lab Test</Button>
                    <Button variant="outline" className="w-full opacity-50 cursor-not-allowed">Refer Patient</Button>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <Brain className="h-6 w-6 text-primary" /> Other Tools
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <Button variant="outline" asChild className="w-full opacity-50 cursor-not-allowed">
                        <Link href="#">Differential Diagnosis Aid (Demo)</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
