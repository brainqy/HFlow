
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderNursePatientQueue, placeholderNurseAlerts, placeholderNurseSchedule, placeholderDoctorPatients } from '@/lib/placeholder-data';
import { UsersRound, ActivitySquare, TriangleAlert, CalendarClock, Syringe, ClipboardList, Filter, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import PortalAnnouncements from '@/components/sections/PortalAnnouncements';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function NurseDashboardPage() {
  const nurseName = "Alex Miller"; 
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { patientsStat, vitalsStat, patientQueueList } = useMemo(() => {
    const allPatientsInQueue = placeholderNursePatientQueue; // For today's queue
    const totalPatientsProcessedHistorically = placeholderDoctorPatients.length; // Simulate total patients seen historically

    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = dateRange.to ? new Date(dateRange.to) : fromDate;
      toDate.setHours(0, 0, 0, 0);
      const rangeLabel = dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime()
        ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
        : format(dateRange.from, "LLL dd, y");

      // Simulate filtered data for the range
      const simulatedPatientsSeen = Math.floor(totalPatientsProcessedHistorically / 7) + Math.floor(Math.random() * 10);
      const simulatedVitalsRecorded = Math.floor(simulatedPatientsSeen * 0.8) + Math.floor(Math.random() * 5);
      
      // For the list, we'll show a mix of statuses for variety if a range is selected
      const simulatedProcessedPatients = placeholderNursePatientQueue.slice(0, Math.min(5, placeholderNursePatientQueue.length)).map((p, i) => ({
        ...p,
        status: i % 3 === 0 ? 'Discharged' : i % 3 === 1 ? 'With Doctor' : 'Ready for Vitals',
        arrivalTime: format(new Date(dateRange.from), "HH:mm") // Mock arrival time within range
      }));


      return {
        patientsStat: {
          count: simulatedPatientsSeen,
          label: `Patients Seen (${rangeLabel})`,
        },
        vitalsStat: {
          count: simulatedVitalsRecorded,
          label: `Vitals Recorded (${rangeLabel})`,
        },
        patientQueueList: {
            list: simulatedProcessedPatients,
            label: `Processed (${rangeLabel})`
        }
      };
    }

    // Default to "Today"
    return {
      patientsStat: {
        count: allPatientsInQueue.length,
        label: "Patients in Queue (Today)",
      },
      vitalsStat: {
        count: allPatientsInQueue.filter(p=> p.status === 'Ready for Vitals').length,
        label: "Pending Vitals (Today)",
      },
      patientQueueList: {
          list: allPatientsInQueue,
          label: "Today's Queue"
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
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, Nurse {nurseName}!</h1>
          <p className="text-muted-foreground">Overview for {todayFormatted}.</p>
        </div>
         <Button asChild variant="outline">
          <Link href="/nurse/schedule" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" /> My Schedule
          </Link>
        </Button>
      </header>

      <PortalAnnouncements portalType="nurse_portal" />

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{patientsStat.label.split('(')[0].trim()}</CardTitle>
            <UsersRound className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientsStat.count}</div>
            <p className="text-xs text-muted-foreground">({patientsStat.label.split('(')[1]?.replace(')','') || 'Current'})</p>
             {!dateRange && <Button variant="link" asChild className="p-0 h-auto text-xs text-primary mt-1 block"><Link href="/nurse/patient-queue">View Queue</Link></Button>}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{vitalsStat.label.split('(')[0].trim()}</CardTitle>
            <ActivitySquare className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vitalsStat.count}</div>
            <p className="text-xs text-muted-foreground">({vitalsStat.label.split('(')[1]?.replace(')','') || 'Current'})</p>
             {!dateRange && <Button variant="link" asChild className="p-0 h-auto text-xs text-primary mt-1 block"><Link href="/nurse/vitals-entry">Enter Vitals</Link></Button>}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <TriangleAlert className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placeholderNurseAlerts.length}</div>
             <p className="text-xs text-muted-foreground">requiring attention</p>
          </CardContent>
        </Card>
         <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shift Status</CardTitle>
            <CalendarClock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-semibold">{placeholderNurseSchedule.today.split('(')[0].trim()}</div>
            <p className="text-xs text-muted-foreground">({placeholderNurseSchedule.today.split('(')[1]?.replace(')','') || 'Regular Shift'})</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Queue / Processed List */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <UsersRound className="h-6 w-6 text-primary" /> {patientQueueList.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patientQueueList.list.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {patientQueueList.list.map(patient => (
                  <div key={patient.id} className="p-3 border rounded-md bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Arrival: {patient.arrivalTime}</p>
                      </div>
                      <Badge 
                        variant={patient.status === 'Waiting for Triage' ? 'destructive' : patient.status === 'Ready for Vitals' ? 'secondary' : 'default'}
                        className="capitalize"
                      >
                        {patient.status.toLowerCase()}
                      </Badge>
                    </div>
                     <div className="mt-2 space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">View Chart</Button>
                      {patient.status === 'Ready for Vitals' && <Button size="sm" className="text-xs">Record Vitals</Button>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Patient queue is currently empty for {patientQueueList.label.toLowerCase().includes('today') ? 'today' : 'the selected period'}.</p>
            )}
             {!dateRange && <Button asChild className="mt-4 w-full"><Link href="/nurse/patient-queue">Manage Full Queue</Link></Button>}
          </CardContent>
        </Card>

        {/* Quick Nurse Actions */}
        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                       <Syringe className="h-6 w-6 text-primary" /> Quick Tasks
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="default" className="w-full">Administer Medication</Button>
                    <Button variant="outline" className="w-full">Check Supplies</Button>
                    <Button variant="outline" className="w-full">Log Incident</Button>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                       <ClipboardList className="h-6 w-6 text-primary" /> Shift Notes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{placeholderNurseSchedule.notes || "No specific notes for this shift."}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
