
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ActivitySquare, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { placeholderNursePatientQueue } from '@/lib/placeholder-data';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

export default function NurseVitalsEntryPage() {
  const { toast } = useToast();
  const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>();
  const patientsReadyForVitals = placeholderNursePatientQueue.filter(p => p.status === 'Ready for Vitals');

  const handleSubmitVitals = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPatientId) {
        toast({ title: "Error", description: "Please select a patient.", variant: "destructive" });
        return;
    }
    // In a real app, you would collect form data and submit it
    const formData = new FormData(event.currentTarget);
    const vitals = {
        temperature: formData.get('temperature'),
        heartRate: formData.get('heartRate'),
        bloodPressure: formData.get('bloodPressure'),
        respiratoryRate: formData.get('respiratoryRate'),
        oxygenSaturation: formData.get('oxygenSaturation'),
    };
    console.log("Vitals for patient " + selectedPatientId + ":", vitals);
    toast({ 
        title: "Vitals Recorded", 
        description: `Vitals for patient ${patientsReadyForVitals.find(p=>p.id === selectedPatientId)?.name} submitted successfully.` 
    });
    // Reset form or clear selection
    setSelectedPatientId(undefined);
    event.currentTarget.reset();
  };

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
        <form onSubmit={handleSubmitVitals}>
            <CardHeader>
            <CardTitle className="font-headline text-xl">Record Patient Vitals</CardTitle>
            <CardDescription>
                Select a patient and enter their current vital signs.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div>
                <Label htmlFor="patientSelect">Patient</Label>
                <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger id="patientSelect">
                    <SelectValue placeholder="Select patient from queue" />
                </SelectTrigger>
                <SelectContent>
                    {patientsReadyForVitals.length > 0 ? (
                    patientsReadyForVitals.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>{patient.name} (Arrived: {patient.arrivalTime})</SelectItem>
                    ))
                    ) : (
                    <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> No patients currently marked "Ready for Vitals".
                    </div>
                    )}
                </SelectContent>
                </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="temperature">Temperature (°F)</Label>
                <Input id="temperature" name="temperature" type="number" step="0.1" placeholder="e.g., 98.6" required />
                </div>
                <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input id="heartRate" name="heartRate" type="number" placeholder="e.g., 70" required />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input id="bloodPressure" name="bloodPressure" placeholder="e.g., 120/80" required />
                </div>
                <div>
                <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
                <Input id="respiratoryRate" name="respiratoryRate" type="number" placeholder="e.g., 16" required />
                </div>
            </div>
            <div>
                <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                <Input id="oxygenSaturation" name="oxygenSaturation" type="number" placeholder="e.g., 98" required />
            </div>
            </CardContent>
            <CardFooter>
            <Button type="submit" className="w-full" disabled={patientsReadyForVitals.length === 0 || !selectedPatientId}>
                <CheckCircle className="mr-2 h-4 w-4" /> Save Vitals
            </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
