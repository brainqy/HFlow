export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  education: string[];
  experience: string[];
  imageUrl: string;
  availability?: Record<string, string[]>; // e.g. { "Monday": ["9am-12pm", "2pm-5pm"] }
  dataAiHint?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType; // Lucide icon component
  details?: string;
  imageUrl?: string;
  dataAiHint?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags?: string[];
  dataAiHint?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO string
  time: string; // e.g., "10:00 AM"
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface MedicalRecordItem {
  id: string;
  date: string;
  type: 'diagnosis' | 'medication' | 'allergy' | 'procedure' | 'note';
  description: string;
  doctor?: string; // Name of the doctor associated with the record
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string; // Doctor's name
  refillsRemaining?: number;
}
