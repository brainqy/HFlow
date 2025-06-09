
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

export interface VisitingDoctorProfile {
  id: string;
  name: string;
  specialty: string;
  email: string;
  assignmentPeriod?: string; // e.g., "Aug 15 - Aug 30, 2024"
}

export interface Service {
  id: string;
  name: string;
  iconName: string;
  description: string;
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
  doctorId: string; // Can be permanent or visiting doctor ID
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Checked-in' | 'Completed' | 'Cancelled' | 'Pending Confirmation';
  reminderSent?: boolean;
  age?: number;
  gender?: string;
  address?: string;
}

export interface MedicalRecordItem {
  id: string;
  date: string;
  type: 'diagnosis' | 'medication' | 'allergy' | 'procedure' | 'note';
  description: string;
  doctor?: string; // Name of the doctor who made the entry
  recordedBy?: string; // Could be ID of doctor/visiting doctor
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
  patientId: string;
  patientName: string;
  doctorName: string;
  doctorId: string; // Can be permanent or visiting doctor ID
  time: string;
  reason: string;
  date: string;
  status: 'Scheduled' | 'Checked-in' | 'Completed' | 'Cancelled' | 'Pending Confirmation';
  reminderSent?: boolean;
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

export type UserRole = 'Patient' | 'Doctor' | 'Nurse' | 'Receptionist' | 'Manager' | 'Visiting Doctor';

export interface ManagedUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  status: 'Active' | 'Inactive';
  lastLogin?: string;
  password?: string;
  specialty?: string; // For Doctor and Visiting Doctor roles
  assignmentPeriod?: string; // For Visiting Doctor role
}

export type AnnouncementDisplayLocation = 
  | 'homepage' 
  | 'patient_portal' 
  | 'doctor_portal' 
  | 'nurse_portal'
  | 'receptionist_portal'
  | 'manager_portal'
  | 'visiting_doctor_portal' // Added
  | 'all_portals';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  displayLocations: AnnouncementDisplayLocation[];
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImageUrl?: string;
  dataAiHint?: string;
  videoUrl?: string;
  videoPlaceholderImageUrl?: string;
  rating?: number; 
}

export interface TrustSignal {
  id: string;
  type: 'partner' | 'certification' | 'featured';
  name: string;
  imageUrl: string;
  dataAiHint: string;
  url?: string;
}

export interface HomepageWidgetSetting {
  id: string; 
  name: string; 
  isVisible: boolean;
}

export interface HeroSlideItem {
  id: string;
  imageUrl: string;
  altText: string;
  dataAiHint: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}
