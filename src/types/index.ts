
export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  maxPatients: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  education: string[];
  experience: string[];
  imageUrl: string;
  availability?: AvailabilitySlot[]; 
  dataAiHint?: string;
  email?: string; 
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType; 
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
  date: string; 
  time: string; 
  reason: string;
  status: 'Scheduled' | 'Checked-in' | 'Completed' | 'Cancelled' | 'Pending Confirmation';
  reminderSent?: boolean;
}

export interface MedicalRecordItem {
  id: string;
  date: string;
  type: 'diagnosis' | 'medication' | 'allergy' | 'procedure' | 'note';
  description: string;
  doctor?: string; 
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string; 
  refillsRemaining?: number;
}

export interface DoctorAppointment {
  id: string;
  patientName: string;
  doctorName: string; 
  doctorId: string; 
  time: string; // This likely needs to align with AvailabilitySlot startTime or be derived
  reason: string;
  date: string; 
  status: 'Scheduled' | 'Checked-in' | 'Completed' | 'Cancelled' | 'Pending Confirmation';
  reminderSent?: boolean;
}

export interface DoctorPatient {
  id: string;
  name: string;
  lastVisit: string;
  email?: string; 
  phone?: string; 
}

export interface NursePatientQueueItem {
  id: string;
  name: string;
  status: 'Waiting for Triage' | 'Ready for Vitals' | 'Waiting for Doctor' | 'With Doctor' | 'Discharged';
  arrivalTime: string;
}

export interface NurseAlert {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp?: string;
}

export interface NurseShiftSchedule {
  today: string;
  tomorrow?: string;
  notes?: string;
}

export interface SupplyItem {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  reorderPoint: number;
  status: 'In Stock' | 'Low Stock' | 'Critical' | 'Out of Stock';
}

export interface Nurse {
    id: string;
    name: string;
    email: string;
    department: string;
    shift: string;
}

export interface Receptionist {
    id: string;
    name: string;
    email: string;
    employeeId: string;
}

// Combined user type for Manager user management
export type UserRole = 'Patient' | 'Doctor' | 'Nurse' | 'Receptionist' | 'Manager';

export interface ManagedUser {
  id: string;
  name: string;
  role: UserRole;
  email: string; 
  status: 'Active' | 'Inactive'; 
  lastLogin?: string; 
  password?: string; 
}

