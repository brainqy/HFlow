
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, CalendarRange, Users, Activity, FileDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DateRange as DateRangeType } from "react-day-picker";


const reportTypes = [
  { id: 'appointment_volume', name: 'Appointment Volume', icon: CalendarRange, description: 'Track number of appointments over time.' },
  { id: 'patient_demographics', name: 'Patient Demographics', icon: Users, description: 'Analyze patient population characteristics.' },
  { id: 'user_activity', name: 'User Activity Logs', icon: Activity, description: 'Monitor system access and actions.' },
  { id: 'financial_overview', name: 'Financial Overview', icon: FileDown, description: 'Summary of billings and revenue (Placeholder).' },
];

const durationOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'allTime', label: 'All Time' },
    { value: 'custom', label: 'Custom Range' },
];

// Sample Data for Different Durations
const appointmentVolumeDataAllTime = [
  { month: "Jan", count: 120 }, { month: "Feb", count: 150 }, { month: "Mar", count: 130 },
  { month: "Apr", count: 160 }, { month: "May", count: 180 }, { month: "Jun", count: 170 },
];
const appointmentVolumeDataLast6Months = [ /* Same as All Time for demo */ ...appointmentVolumeDataAllTime ];
const appointmentVolumeDataLast30Days = [
  { week: "Week 1", count: 40 }, { week: "Week 2", count: 35 }, { week: "Week 3", count: 45 }, { week: "Week 4", count: 38 },
];
const appointmentVolumeDataLast7Days = [
  { day: "Mon", count: 5 }, { day: "Tue", count: 7 }, { day: "Wed", count: 6 }, { day: "Thu", count: 8 },
  { day: "Fri", count: 9 }, { day: "Sat", count: 3 }, { day: "Sun", count: 2 },
];

const chartConfig = { count: { label: "Appointments", color: "hsl(var(--primary))" } };

const systemLogsData = [
  { id: "log1", timestamp: "2024-08-15 10:05:12", user: "admin@example.com", action: "Logged In", details: "Successful login from IP 192.168.1.10" },
  { id: "log2", timestamp: "2024-08-15 10:06:22", user: "doctor@example.com", action: "Viewed Patient Chart", details: "Patient ID: dp1" },
  { id: "log3", timestamp: "2024-08-15 10:07:00", user: "nurse@example.com", action: "Recorded Vitals", details: "Patient ID: nq2" },
  { id: "log4", timestamp: "2024-08-15 10:08:51", user: "admin@example.com", action: "Updated Clinic Settings", details: "Changed clinic name" },
];


export default function AdminReportsPage() {
  const [selectedDuration, setSelectedDuration] = useState<string>('allTime');
  const [customDateRange, setCustomDateRange] = useState<DateRangeType | undefined>(undefined);

  const currentAppointmentData = useMemo(() => {
    switch (selectedDuration) {
      case 'last7days': return { data: appointmentVolumeDataLast7Days, xAxisKey: 'day', titleSuffix: "(Last 7 Days)" };
      case 'last30days': return { data: appointmentVolumeDataLast30Days, xAxisKey: 'week', titleSuffix: "(Last 30 Days)" };
      case 'last6months': return { data: appointmentVolumeDataLast6Months, xAxisKey: 'month', titleSuffix: "(Last 6 Months)" };
      case 'custom': // For custom, we'll just show all time for this demo
      case 'allTime':
      default: return { data: appointmentVolumeDataAllTime, xAxisKey: 'month', titleSuffix: "(All Time)" };
    }
  }, [selectedDuration]);


  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <BarChart2 className="h-8 w-8" /> Reports & Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate and view reports on various aspects of clinic operations.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Generate New Report</CardTitle>
          <CardDescription>Select a report type and configure parameters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label htmlFor="reportType" className="block text-sm font-medium text-foreground mb-1">Report Type</label>
                <Select>
                <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                    {reportTypes.map(report => (
                    <SelectItem key={report.id} value={report.id}>{report.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-1">Duration</label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        {durationOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date Range (for Custom)</label>
                <DatePickerWithRange 
                    date={customDateRange} 
                    onDateChange={setCustomDateRange} 
                    className={selectedDuration !== 'custom' ? 'opacity-50 pointer-events-none' : ''} 
                />
            </div>
          </div>
          <Button className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" /> Generate & Download Report
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Appointment Volume {currentAppointmentData.titleSuffix}</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
           <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentAppointmentData.data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey={currentAppointmentData.xAxisKey} tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Recent System Logs</CardTitle>
          <CardDescription>A brief overview of recent system activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemLogsData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <p className="text-xs text-muted-foreground text-center mt-8">
          Reporting features are illustrative. Full data export and complex analytics would require backend integration.
        </p>
    </div>
  );
}
