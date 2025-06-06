import { placeholderMedications } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill, CalendarDays, UserMd, RefreshCw, AlertTriangle, PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const isMedicationActive = (medication: typeof placeholderMedications[0]) => {
  if (!medication.endDate) return true; // No end date means it's ongoing
  return new Date(medication.endDate) >= new Date();
};

export default function MedicationsPage() {
  const activeMedications = placeholderMedications.filter(isMedicationActive);
  const pastMedications = placeholderMedications.filter(med => !isMedicationActive(med));

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <Pill className="h-8 w-8" /> My Medications
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your current and past prescriptions.
          </p>
        </div>
        <Button asChild>
          <Link href="/portal/medications/request-refill" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Request Refill
          </Link>
        </Button>
      </header>

      {/* Important Notice */}
      <Card className="bg-amber-50 border-amber-200 shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <CardTitle className="text-amber-700 font-headline">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">
            This list is for your reference only. Always follow your doctor's instructions for taking medications. 
            Do not stop or change your dosage without consulting your healthcare provider. If you experience any adverse effects, contact your doctor or seek emergency care immediately.
          </p>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Current Medications</CardTitle>
          <CardDescription>Medications you are currently prescribed to take.</CardDescription>
        </CardHeader>
        <CardContent>
          {activeMedications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead className="text-right">Refills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeMedications.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.frequency}</TableCell>
                    <TableCell>{med.prescribedBy}</TableCell>
                    <TableCell>{new Date(med.startDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      {med.refillsRemaining !== undefined ? `${med.refillsRemaining} left` : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No current medications found.</p>
          )}
        </CardContent>
      </Card>

      {/* Past Medications */}
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Past Medications</CardTitle>
          <CardDescription>Medications you are no longer taking.</CardDescription>
        </CardHeader>
        <CardContent>
           {pastMedications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastMedications.map((med) => (
                  <TableRow key={med.id} className="text-muted-foreground">
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.prescribedBy}</TableCell>
                    <TableCell>{new Date(med.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{med.endDate ? new Date(med.endDate).toLocaleDateString() : 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No past medication records found.</p>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-8">
         <Button variant="outline" asChild>
            <Link href="/portal/medications/add" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Over-the-Counter Medication
            </Link>
        </Button>
      </div>
       <p className="text-xs text-muted-foreground text-center mt-4">
          For any discrepancies or questions about your medication list, please contact our clinic.
        </p>
    </div>
  );
}
