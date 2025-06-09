
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDoctorPatients, placeholderDoctors, placeholderDoctorAppointments } from '@/lib/placeholder-data';
import { Users, Stethoscope, CalendarCheck, AlertTriangle, Settings, Filter, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import PortalAnnouncements from '@/components/sections/PortalAnnouncements';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function ManagerDashboardPage() {
  const managerName = "Manager"; 
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { totalPatients, totalDoctors, appointments } = useMemo(() => {
    const allPatients = placeholderDoctorPatients.length;
    const allDoctors = placeholderDoctors.length;
    const allAppointments = placeholderDoctorAppointments.length;

    if (dateRange?.from) {
      const fromDate = format(dateRange.from, "LLL dd, y");
      const toDate = dateRange.to ? format(dateRange.to, "LLL dd, y") : fromDate;
      const rangeLabel = dateRange.to && dateRange.from !== dateRange.to ? `${fromDate} - ${toDate}` : fromDate;
      return {
        totalPatients: {
          count: Math.floor(allPatients / 4) + Math.floor(Math.random() * 3), // Simulated new patients
          label: `New Patients (${rangeLabel})`,
        },
        totalDoctors: {
          count: allDoctors,
          label: "Total Doctors",
        },
        appointments: {
          count: Math.floor(allAppointments / 2) + Math.floor(Math.random() * 5), // Simulated count
          label: `Appointments (${rangeLabel})`,
        },
      };
    }
    return {
      totalPatients: {
        count: allPatients,
        label: "Total Patients (All Time)",
      },
      totalDoctors: {
        count: allDoctors,
        label: "Total Doctors",
      },
      appointments: {
        count: allAppointments,
        label: "Total Appointments (All Time)",
      },
    };
  }, [dateRange]);

  const clearDateFilter = () => {
    setDateRange(undefined);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Manager Dashboard</h1>
          <p className="text-muted-foreground">Overview for {todayFormatted}. Welcome, {managerName}!</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/manager/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> System Settings
          </Link>
        </Button>
      </header>

      <PortalAnnouncements portalType="manager_portal" />

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

      {/* Quick Stats/Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{totalPatients.label.startsWith("New") ? "New Patients" : "Total Patients"}</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients.count}</div>
             <p className="text-xs text-muted-foreground">{totalPatients.label.replace("Total Patients ", "").replace("New Patients ", "")}</p>
            {!dateRange && <Link href="/manager/users?role=patient" className="text-xs text-primary hover:underline">View Patients</Link>}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{totalDoctors.label}</CardTitle>
            <Stethoscope className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDoctors.count}</div>
            <Link href="/manager/users?role=doctor" className="text-xs text-primary hover:underline">View Doctors</Link>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <CalendarCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.count}</div>
             <p className="text-xs text-muted-foreground">{appointments.label.replace('Total Appointments ', '')}</p>
          </CardContent>
        </Card>
         <Card className="shadow-md bg-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">System Alerts</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div> {/* Placeholder */}
            <p className="text-xs text-muted-foreground">No critical alerts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
             <CardDescription>Overview of recent system events (Placeholder).</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
                <li>New patient registered: John B.</li>
                <li>Doctor Eleanor Vance updated profile.</li>
                <li>Appointment scheduled for Alice W.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Links</CardTitle>
            <CardDescription>Common management tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full" asChild><Link href="/manager/users">Manage Users</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link href="/manager/settings">Manage Clinic Settings</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link href="/manager/reports">View Reports</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
