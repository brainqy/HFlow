
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ActivitySquare, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { placeholderNursePatientQueue } from '@/lib/placeholder-data';


export default function NurseVitalsEntryPage() {
  const patientsReadyForVitals = placeholderNursePatientQueue.filter(p => p.status === 'Ready for Vitals');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <ActivitySquare className="h-8 w-8" /> Vitals Entry
        </h1>
        <p className="text-muted-foreground mt-1">
          Record patient vital signs.
        </p>
      </header>

      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Record Patient Vitals</CardTitle>
          <CardDescription>
            Select a patient and enter their current vital signs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="patientSelect">Patient</Label>
            <Select>
              <SelectTrigger id="patientSelect">
                <SelectValue placeholder="Select patient from queue" />
              </SelectTrigger>
              <SelectContent>
                {patientsReadyForVitals.length > 0 ? (
                  patientsReadyForVitals.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>{patient.name} (Arrived: {patient.arrivalTime})</SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No patients ready for vitals</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input id="temperature" type="number" step="0.1" placeholder="e.g., 98.6" />
            </div>
            <div>
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input id="heartRate" type="number" placeholder="e.g., 70" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
              <Input id="bloodPressure" placeholder="e.g., 120/80" />
            </div>
            <div>
              <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
              <Input id="respiratoryRate" type="number" placeholder="e.g., 16" />
            </div>
          </div>
           <div>
              <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
              <Input id="oxygenSaturation" type="number" placeholder="e.g., 98" />
            </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={patientsReadyForVitals.length === 0}>
            <CheckCircle className="mr-2 h-4 w-4" /> Save Vitals
          </Button>
        </CardFooter>
      </Card>
      <p className="text-sm text-muted-foreground text-center">
        This is a placeholder page. Full vitals entry and saving functionality will be implemented here.
      </p>
    </div>
  );
}
