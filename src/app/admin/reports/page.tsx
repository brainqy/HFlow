
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, CalendarRange, Users, Activity, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"; // Assuming this component exists or will be created

// Mock for DatePickerWithRange if it doesn't exist
const DatePickerWithRange = ({ className }: { className?: string }) => (
  <div className={cn("grid gap-2", className)}>
    <Button variant="outline">Pick a date range</Button>
  </div>
);


export default function AdminReportsPage() {
  const reportTypes = [
    { id: 'appointment_volume', name: 'Appointment Volume', icon: CalendarRange, description: 'Track number of appointments over time.' },
    { id: 'patient_demographics', name: 'Patient Demographics', icon: Users, description: 'Analyze patient population characteristics.' },
    { id: 'user_activity', name: 'User Activity Logs', icon: Activity, description: 'Monitor system access and actions.' },
    { id: 'financial_overview', name: 'Financial Overview', icon: FileDown, description: 'Summary of billings and revenue (Placeholder).' },
  ];

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
          {/* Additional filters can be added here based on report type */}
          <Button className="w-full md:w-auto">
            <FileDown className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Available Reports</CardTitle>
          <CardDescription>List of commonly used or pre-generated reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map(report => (
              <div key={report.id} className="p-4 border rounded-lg flex items-start gap-3 hover:bg-muted/50 transition-colors">
                <report.icon className="h-8 w-8 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">{report.name}</h3>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary">View/Generate</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
       <p className="text-xs text-muted-foreground text-center mt-8">
          Reporting features are currently illustrative. Full data export and complex analytics would require backend integration.
        </p>
    </div>
  );
}

// Minimal DatePickerWithRange component for UI to render
import { cn } from "@/lib/utils"; // Make sure cn is imported if used in the actual component
// If you have a real DatePickerWithRange, you can remove this mock.
// export function DatePickerWithRange({ className }: { className?: string }) {
//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Button variant={"outline"} className="w-full justify-start text-left font-normal">
//         Pick a date range
//       </Button>
//     </div>
//   )
// }
