
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
  doctorName: string; // Added to associate appointment with a doctor for filtering
  doctorId: string; // Added to associate appointment with a doctor for filtering
  time: string;
  reason: string;
  date: string; 
  status: 'Scheduled' | 'Checked-in' | 'Completed' | 'Cancelled' | 'Pending Confirmation';
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

// Combined user type for Admin user management
export type UserRole = 'Patient' | 'Doctor' | 'Nurse' | 'Receptionist' | 'Admin';

export interface ManagedUser {
  id: string;
  name: string;
  role: UserRole;
  email: string; // Made email mandatory for managed users
  status: 'Active' | 'Inactive'; 
  lastLogin?: string; 
  password?: string; // Only for creation, not typically stored/displayed
}
