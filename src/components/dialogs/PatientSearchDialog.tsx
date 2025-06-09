
"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeholderDoctorPatients } from '@/lib/placeholder-data';
import type { DoctorPatient } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Search, ArrowRight } from 'lucide-react';

interface PatientSearchDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function PatientSearchDialog({ isOpen, onOpenChange }: PatientSearchDialogProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DoctorPatient[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isOpen]);

  const handleSearch = () => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      // Optionally show a toast or message to enter more characters
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();
    const results = placeholderDoctorPatients.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerTerm) ||
        (p.phone && p.phone.includes(searchTerm)) ||
        (p.email && p.email.toLowerCase().includes(lowerTerm))
    );
    setSearchResults(results);
  };

  const handleProceedToRegistration = () => {
    onOpenChange(false);
    router.push('/receptionist/register-patient');
  };

  const handleViewDetails = (patientId: string) => {
    onOpenChange(false);
    router.push(`/receptionist/patients/${patientId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Search for Existing Patient
          </DialogTitle>
          <DialogDescription>
            Check if the patient is already in the system before creating a new record. Search by name, phone, or email.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-2">
            <Input
              id="patientSearchTerm"
              placeholder="Enter name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
            <Button onClick={handleSearch} size="icon" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-2 border p-3 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground">Search Results:</h4>
              {searchResults.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {patient.phone && `Phone: ${patient.phone}`}
                      {patient.email && patient.phone && " | "}
                      {patient.email && `Email: ${patient.email}`}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(patient.id)}>
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {searchTerm && searchResults.length === 0 && (
            <p className="text-sm text-center text-muted-foreground py-4">No patient found matching "{searchTerm}".</p>
          )}
        </div>
        <DialogFooter className="sm:justify-between gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleProceedToRegistration}>
            <UserPlus className="mr-2 h-4 w-4" />
            Register New Patient Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
