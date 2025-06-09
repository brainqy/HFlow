
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDoctorAppointments, placeholderDoctorPatients } from '@/lib/placeholder-data'; 
import { CalendarDays, UserPlus, Users, CheckCircle, Filter, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import PortalAnnouncements from '@/components/sections/PortalAnnouncements';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function ReceptionistDashboardPage() {
  const receptionistName = "Sarah Bell"; 
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { todaysAppointments, patientsCheckedIn, newRegistrations, upcomingAppointmentsList } = useMemo(() => {
    const allAppointments = placeholderDoctorAppointments;
    const allPatients = placeholderDoctorPatients.length; // For simulating registrations

    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = dateRange.to ? new Date(dateRange.to) : fromDate;
      toDate.setHours(0, 0, 0, 0);

      const rangeLabel = dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime()
        ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
        : format(dateRange.from, "LLL dd, y");

      const filteredAppointments = allAppointments.filter(appt => {
        const apptDate = new Date(appt.date);
        apptDate.setHours(0, 0, 0, 0);
        return apptDate >= fromDate && apptDate <= toDate;
      });

      return {
        todaysAppointments: {
          count: filteredAppointments.length,
          label: `Appointments (${rangeLabel})`,
        },
        patientsCheckedIn: {
          count: Math.floor(filteredAppointments.length * 0.7) + Math.floor(Math.random() * 5), // Simulated
          label: `Checked-In (${rangeLabel})`,
        },
        newRegistrations: {
          count: Math.floor(allPatients / 10) + Math.floor(Math.random() * 2), // Simulated
          label: `New Registrations (${rangeLabel})`,
        },
        upcomingAppointmentsList: {
            list: filteredAppointments.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time)).slice(0,5),
            label: `Upcoming (${rangeLabel})`
        }
      };
    }

    // Default to "Today"
    const todayISO = new Date().toISOString().split('T')[0];
    const appointmentsForToday = allAppointments.filter(a => a.date === todayISO);
    return {
      todaysAppointments: {
        count: appointmentsForToday.length,
        label: "Today's Appointments",
      },
      patientsCheckedIn: {
        count: 5, // Placeholder
        label: "Patients Checked-In (Today)",
      },
      newRegistrations: {
        count: 2, // Placeholder
        label: "New Registrations (Today)",
      },
      upcomingAppointmentsList: {
          list: appointmentsForToday.sort((a,b) => a.time.localeCompare(b.time)).slice(0,5),
          label: "Today's Upcoming"
      }
    };
  }, [dateRange]);

  const clearDateFilter = () => {
    setDateRange(undefined);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {receptionistName}!</h1>
          <p className="text-muted-foreground">Front Desk Dashboard for {todayFormatted}.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/receptionist/profile">
            My Profile
          </Link>
        </Button>
      </header>

      <PortalAnnouncements portalType="receptionist_portal" />
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filter Statistics by Date
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{todaysAppointments.label.split('(')[0].trim()}</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysAppointments.count}</div>
            <p className="text-xs text-muted-foreground">({todaysAppointments.label.split('(')[1]?.replace(')','') || 'Current'})</p>
            {!dateRange && <Link href="/receptionist/appointments" className="text-xs text-primary hover:underline mt-1 block">View Full Schedule</Link>}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{patientsCheckedIn.label.split('(')[0].trim()}</CardTitle>
            <CheckCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientsCheckedIn.count}</div>
            <p className="text-xs text-muted-foreground">({patientsCheckedIn.label.split('(')[1]?.replace(')','') || 'Today'})</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{newRegistrations.label.split('(')[0].trim()}</CardTitle>
            <UserPlus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newRegistrations.count}</div>
            <p className="text-xs text-muted-foreground">({newRegistrations.label.split('(')[1]?.replace(')','') || 'Today'})</p>
            {!dateRange && <Link href="/receptionist/patients" className="text-xs text-primary hover:underline mt-1 block">Patient Directory</Link>}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/receptionist/appointments">Manage Appointments</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/receptionist/patients">Search Patient Directory</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Appointments List ({upcomingAppointmentsList.label})</CardTitle>
            <CardDescription>A quick look at relevant scheduled visits.</CardDescription>
          </CardHeader>
          <CardContent className="max-h-72 overflow-y-auto">
            {upcomingAppointmentsList.list.length > 0 ? (
              upcomingAppointmentsList.list.map(appt => (
                <div key={appt.id} className="py-2 border-b last:border-b-0">
                  <p className="font-semibold text-foreground">{appt.patientName} - {appt.time}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(appt.date), "LLL dd, yyyy")} with {appt.doctorName}</p>
                </div>
              ))
            ) : (
                <p className="text-muted-foreground text-sm">No appointments for {upcomingAppointmentsList.label.toLowerCase().includes('today') ? 'today' : 'the selected period'}.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
