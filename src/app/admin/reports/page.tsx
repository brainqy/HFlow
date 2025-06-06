
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, CalendarRange, Users, Activity, FileDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"; // Ensure this component exists and works
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const reportTypes = [
  { id: 'appointment_volume', name: 'Appointment Volume', icon: CalendarRange, description: 'Track number of appointments over time.' },
  { id: 'patient_demographics', name: 'Patient Demographics', icon: Users, description: 'Analyze patient population characteristics.' },
  { id: 'user_activity', name: 'User Activity Logs', icon: Activity, description: 'Monitor system access and actions.' },
  { id: 'financial_overview', name: 'Financial Overview', icon: FileDown, description: 'Summary of billings and revenue (Placeholder).' },
];

const appointmentVolumeData = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 150 },
  { month: "Mar", count: 130 },
  { month: "Apr", count: 160 },
  { month: "May", count: 180 },
  { month: "Jun", count: 170 },
];

const chartConfig = {
  count: {
    label: "Appointments",
    color: "hsl(var(--primary))",
  },
};

const systemLogsData = [
  { id: "log1", timestamp: "2024-08-15 10:05:12", user: "admin@example.com", action: "Logged In", details: "Successful login from IP 192.168.1.10" },
  { id: "log2", timestamp: "2024-08-15 10:06:22", user: "doctor@example.com", action: "Viewed Patient Chart", details: "Patient ID: dp1" },
  { id: "log3", timestamp: "2024-08-15 10:07:00", user: "nurse@example.com", action: "Recorded Vitals", details: "Patient ID: nq2" },
  { id: "log4", timestamp: "2024-08-15 10:08:51", user: "admin@example.com", action: "Updated Clinic Settings", details: "Changed clinic name" },
];


export default function AdminReportsPage() {
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
            <label className="block text-sm font-medium text-foreground mb-1">Date Range</label>
            <DatePickerWithRange className="w-full" />
          </div>
          <Button className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" /> Generate & Download Report
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Appointment Volume (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
           <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentVolumeData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
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
