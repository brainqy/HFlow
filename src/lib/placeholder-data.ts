
import type { Doctor, Service, BlogPost, MedicalRecordItem, Medication, DoctorAppointment, DoctorPatient, NursePatientQueueItem, NurseAlert, NurseShiftSchedule, SupplyItem, Nurse, Receptionist, AvailabilitySlot, ManagedUser, Announcement, AnnouncementDisplayLocation, Testimonial, TrustSignal, HomepageWidgetSetting, HeroSlideItem } from '@/types';
import { HeartPulse, Brain, Bone, Activity, Stethoscope, Syringe, Pill, Microscope, Baby, CalendarDays, ShieldCheck, Zap, ActivitySquare as GastroenterologyIcon, Users as PaediatricsIcon } from 'lucide-react';

export let placeholderDoctors: Doctor[] = [
  {
    id: 'emily-carter',
    name: 'Dr. Emily Carter',
    email: 'emily.carter@healthflow.clinic',
    specialty: 'Cardiologist',
    bio: 'Dr. Emily Carter is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She is passionate about preventive care and patient education.',
    education: ['MD, Stanford University School of Medicine', 'Residency, Johns Hopkins Hospital', 'Fellowship in Cardiology, Mayo Clinic'],
    experience: ['Attending Cardiologist, City General Hospital (10 years)', 'Chief of Cardiology, HealthFlow Clinic (5 years)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'female doctor smiling',
    availability: [
      { day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', maxPatients: 4 },
      { day: 'Monday', startTime: '10:00 AM', endTime: '11:00 AM', maxPatients: 4 },
      { day: 'Monday', startTime: '11:00 AM', endTime: '12:00 PM', maxPatients: 4 },
      { day: 'Monday', startTime: '02:00 PM', endTime: '03:00 PM', maxPatients: 3 },
      { day: 'Monday', startTime: '03:00 PM', endTime: '04:00 PM', maxPatients: 3 },
      { day: 'Monday', startTime: '04:00 PM', endTime: '05:00 PM', maxPatients: 3 },
      { day: 'Wednesday', startTime: '09:00 AM', endTime: '10:00 AM', maxPatients: 5 },
      { day: 'Wednesday', startTime: '10:00 AM', endTime: '11:00 AM', maxPatients: 5 },
      { day: 'Wednesday', startTime: '11:00 AM', endTime: '12:00 PM', maxPatients: 5 },
      { day: 'Wednesday', startTime: '12:00 PM', endTime: '01:00 PM', maxPatients: 2 },
      { day: 'Friday', startTime: '02:00 PM', endTime: '03:00 PM', maxPatients: 4 },
      { day: 'Friday', startTime: '03:00 PM', endTime: '04:00 PM', maxPatients: 4 },
      { day: 'Friday', startTime: '04:00 PM', endTime: '05:00 PM', maxPatients: 4 },
    ],
  },
  {
    id: 'james-lee',
    name: 'Dr. James Lee',
    email: 'james.lee@healthflow.clinic',
    specialty: 'Neurologist',
    bio: 'Dr. James Lee specializes in neurological disorders, including epilepsy, stroke, and Alzheimer\'s disease. He is known for his compassionate approach and dedication to research.',
    education: ['MD, Harvard Medical School', 'Residency in Neurology, Massachusetts General Hospital'],
    experience: ['Neurologist, Boston Medical Center (8 years)', 'Senior Neurologist, HealthFlow Clinic (current)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'male doctor friendly',
     availability: [
      { day: 'Tuesday', startTime: '10:00 AM', endTime: '11:00 AM', maxPatients: 3 },
      { day: 'Tuesday', startTime: '11:00 AM', endTime: '12:00 PM', maxPatients: 3 },
      { day: 'Tuesday', startTime: '12:00 PM', endTime: '01:00 PM', maxPatients: 3 },
      { day: 'Tuesday', startTime: '03:00 PM', endTime: '04:00 PM', maxPatients: 2 },
      { day: 'Tuesday', startTime: '04:00 PM', endTime: '05:00 PM', maxPatients: 2 },
      { day: 'Tuesday', startTime: '05:00 PM', endTime: '06:00 PM', maxPatients: 2 },
      { day: 'Thursday', startTime: '09:00 AM', endTime: '10:00 AM', maxPatients: 4 },
      { day: 'Thursday', startTime: '10:00 AM', endTime: '11:00 AM', maxPatients: 4 },
      { day: 'Thursday', startTime: '11:00 AM', endTime: '12:00 PM', maxPatients: 4 },
    ],
  },
  {
    id: 'sarah-green',
    name: 'Dr. Sarah Green',
    email: 'sarah.green@healthflow.clinic',
    specialty: 'Orthopedic Surgeon',
    bio: 'Dr. Sarah Green is an accomplished orthopedic surgeon with expertise in sports medicine and joint replacement. She helps patients regain mobility and improve their quality of life.',
    education: ['MD, Yale School of Medicine', 'Residency in Orthopedic Surgery, UCSF Medical Center'],
    experience: ['Orthopedic Surgeon, Sports Medicine Clinic (7 years)', 'Consultant Orthopedic Surgeon, HealthFlow Clinic (current)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'female surgeon confident',
    availability: [
      { day: 'Monday', startTime: '10:00 AM', endTime: '11:00 AM', maxPatients: 2 },
      { day: 'Monday', startTime: '11:00 AM', endTime: '12:00 PM', maxPatients: 2 },
      { day: 'Monday', startTime: '12:00 PM', endTime: '01:00 PM', maxPatients: 2 },
      { day: 'Wednesday', startTime: '02:00 PM', endTime: '03:00 PM', maxPatients: 3 },
      { day: 'Wednesday', startTime: '03:00 PM', endTime: '04:00 PM', maxPatients: 3 },
      { day: 'Wednesday', startTime: '04:00 PM', endTime: '05:00 PM', maxPatients: 3 },
      { day: 'Wednesday', startTime: '05:00 PM', endTime: '06:00 PM', maxPatients: 3 },
      { day: 'Thursday', startTime: '01:00 PM', endTime: '02:00 PM', maxPatients: 4 },
      { day: 'Thursday', startTime: '02:00 PM', endTime: '03:00 PM', maxPatients: 4 },
      { day: 'Thursday', startTime: '03:00 PM', endTime: '04:00 PM', maxPatients: 4 },
    ],
  },
   {
    id: 'michael-brown',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@healthflow.clinic',
    specialty: 'Pediatrician',
    bio: 'Dr. Michael Brown is a dedicated pediatrician with a focus on child development and immunizations. He enjoys working with families to ensure children grow up healthy and happy.',
    education: ['MD, Duke University School of Medicine', 'Residency in Pediatrics, Children\'s Hospital of Philadelphia'],
    experience: ['Pediatrician, Community Health Clinic (6 years)', 'Pediatrician, HealthFlow Clinic (current)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'male doctor children',
    availability: [
      { day: 'Monday', startTime: '08:00 AM', endTime: '12:00 PM', maxPatients: 10 },
      { day: 'Tuesday', startTime: '01:00 PM', endTime: '05:00 PM', maxPatients: 8 },
      { day: 'Wednesday', startTime: '08:00 AM', endTime: '12:00 PM', maxPatients: 10 },
      { day: 'Friday', startTime: '08:00 AM', endTime: '12:00 PM', maxPatients: 10 },
    ],
  },
  {
    id: 'jessica-davis',
    name: 'Dr. Jessica Davis',
    email: 'jessica.davis@healthflow.clinic',
    specialty: 'Dermatologist',
    bio: 'Dr. Jessica Davis specializes in medical and cosmetic dermatology. She is committed to providing excellent skin care and helping patients achieve healthy skin.',
    education: ['MD, Columbia University Vagelos College of Physicians and Surgeons', 'Residency in Dermatology, NewYork-Presbyterian Hospital'],
    experience: ['Dermatologist, NYC Skin & Laser Center (4 years)', 'Dermatologist, HealthFlow Clinic (current)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'female doctor skin',
    availability: [
      { day: 'Tuesday', startTime: '09:00 AM', endTime: '01:00 PM', maxPatients: 6 },
      { day: 'Thursday', startTime: '09:00 AM', endTime: '01:00 PM', maxPatients: 6 },
      { day: 'Friday', startTime: '01:00 PM', endTime: '05:00 PM', maxPatients: 7 },
    ],
  },
];

export let placeholderServices: Service[] = [
  { id: 'general-checkups', name: 'General Checkups', iconName: 'Stethoscope', description: 'Routine health examinations and preventive care for all ages.', details: 'Our general checkups include a thorough physical examination, review of medical history, vital signs check, and age-appropriate screenings. We focus on preventive care to help you maintain optimal health.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'doctor patient consultation' },
  { id: 'vaccinations', name: 'Vaccinations', iconName: 'Syringe', description: 'Comprehensive immunization services for children and adults.', details: 'We offer a full range of vaccines for infants, children, adolescents, and adults, including flu shots, travel vaccinations, and routine immunizations, following CDC guidelines.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'nurse giving injection' },
  { id: 'chronic-disease', name: 'Chronic Disease Management', iconName: 'Activity', description: 'Ongoing care and support for managing chronic conditions like diabetes and hypertension.', details: 'Our team provides personalized care plans for managing chronic diseases, focusing on lifestyle modifications, medication management, and regular monitoring to improve your quality of life.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'blood pressure check' },
  { id: 'cardiology', name: 'Cardiology', iconName: 'HeartPulse', description: 'Specialized heart care, including ECG, stress tests, and consultations.', details: 'Our cardiology department offers advanced diagnostic services and treatment for various heart conditions. We emphasize early detection and management of cardiovascular diseases.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'heart monitor screen' },
  { id: 'orthopedics', name: 'Orthopedics', iconName: 'Bone', description: 'Diagnosis and treatment of musculoskeletal injuries and conditions.', details: 'From sports injuries to arthritis, our orthopedic specialists provide comprehensive care, including non-surgical treatments, physical therapy referrals, and surgical interventions when necessary.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'knee x-ray' },
  { id: 'neurology', name: 'Neurology', iconName: 'Brain', description: 'Care for disorders of the nervous system, including migraines and neuropathy.', details: 'Our neurologists are experts in diagnosing and treating a wide range of neurological conditions. We utilize advanced diagnostic tools and develop individualized treatment plans.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'brain activity chart' },
  { id: 'pediatrics', name: 'Pediatrics', iconName: 'PaediatricsIcon', description: 'Comprehensive healthcare for infants, children, and adolescents.', details: 'Our pediatric team provides compassionate and comprehensive care for your child from birth through adolescence, including well-child visits, immunizations, and sick care.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'child doctor' },
  { id: 'lab-services', name: 'Lab Services', iconName: 'Microscope', description: 'On-site laboratory for quick and accurate diagnostic testing.', details: 'Our CLIA-certified laboratory offers a wide range of tests, providing fast and reliable results to aid in diagnosis and treatment planning.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'lab tests' },
  { id: 'pharmacy', name: 'Pharmacy Services', iconName: 'Pill', description: 'Convenient on-site pharmacy for prescriptions and medication counseling.', details: 'Our on-site pharmacy makes it easy to get your prescriptions filled quickly. Our pharmacists are also available for medication counseling and to answer any questions.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'pharmacy counter' },
  { id: 'ivf', name: 'IVF', iconName: 'Baby', description: 'Advanced In Vitro Fertilization services and fertility treatments.', details: 'Our fertility specialists offer comprehensive IVF treatments and support to help you achieve your dream of parenthood.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'fertility clinic' },
  { id: 'oncology', name: 'Oncology', iconName: 'ShieldCheck', description: 'Comprehensive cancer care including diagnosis, treatment, and support.', details: 'Our oncology department provides multidisciplinary cancer care, from early detection and diagnosis to advanced treatments and survivorship programs.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'cancer care team' },
  { id: 'gastroenterology', name: 'Gastroenterology', iconName: 'GastroenterologyIcon', description: 'Diagnosis and treatment of digestive system disorders.', details: 'Expert care for conditions affecting the esophagus, stomach, intestines, liver, and pancreas, including endoscopy services.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'digestive system diagram' },
  { id: 'general-surgery', name: 'General Surgery', iconName: 'Syringe', description: 'Wide range of surgical procedures by experienced surgeons.', details: 'Our general surgeons perform various procedures, from minimally invasive to complex operations, with a focus on patient safety and optimal outcomes.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'operating room' },
  { id: 'nephrology', name: 'Nephrology', iconName: 'Zap', description: 'Specialized care for kidney diseases and related conditions.', details: 'Comprehensive diagnosis and management of kidney disorders, including dialysis support and transplant referrals.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'kidney health' },
  { id: 'critical-care', name: 'Critical Care', iconName: 'Ambulance', description: 'Intensive care for critically ill patients.', details: 'Our critical care unit is equipped with advanced technology and staffed by specialists to provide life-saving care.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'icu monitor' },
];

export let placeholderBlogPosts: BlogPost[] = [
  {
    slug: 'healthy-eating-tips',
    title: 'Top 10 Healthy Eating Tips for a Vibrant Life',
    date: '2024-07-15',
    author: 'Dr. Emily Carter',
    excerpt: 'Discover simple yet effective strategies to improve your diet and boost your overall health and energy levels.',
    content: '<p>Maintaining a healthy diet is crucial for overall well-being. Here are ten practical tips to help you eat healthier:</p><ol><li>Eat a variety of fruits and vegetables daily.</li><li>Choose whole grains over refined grains.</li><li>Incorporate lean proteins into your meals.</li><li>Limit processed foods and sugary drinks.</li><li>Stay hydrated by drinking plenty of water.</li><li>Practice mindful eating.</li><li>Control portion sizes.</li><li>Don\'t skip breakfast.</li><li>Plan your meals ahead of time.</li><li>Read food labels carefully.</li></ol><p>By making small, consistent changes, you can significantly improve your health.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'healthy food plate',
    tags: ['nutrition', 'healthy lifestyle', 'diet'],
  },
  {
    slug: 'importance-of-sleep',
    title: 'The Vital Role of Sleep in Your Health',
    date: '2024-07-10',
    author: 'Dr. James Lee',
    excerpt: 'Understand why quality sleep is essential for physical and mental health, and learn tips for better sleep hygiene.',
    content: '<p>Quality sleep is as important as a healthy diet and regular exercise. During sleep, your body works to support healthy brain function and maintain your physical health. Here’s why sleep is vital:</p><ul><li><strong>Cognitive Function:</strong> Sleep helps improve concentration, productivity, and performance.</li><li><strong>Physical Health:</strong> It plays a role in healing and repair of your heart and blood vessels.</li><li><strong>Emotional Well-being:</strong> Good sleep can help regulate mood and reduce stress.</li></ul><p>Tips for better sleep include maintaining a regular sleep schedule, creating a restful environment, and limiting caffeine and screen time before bed.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'person sleeping peacefully',
    tags: ['sleep', 'mental health', 'wellness'],
  },
  {
    slug: 'benefits-of-exercise',
    title: 'Unlock the Benefits of Regular Exercise',
    date: '2024-07-05',
    author: 'Dr. Sarah Green',
    excerpt: 'Explore the numerous physical and mental benefits of incorporating regular physical activity into your routine.',
    content: '<p>Regular exercise is one of the most important things you can do for your health. It offers a wide range of benefits:</p><ul><li><strong>Weight Management:</strong> Helps control weight by burning calories.</li><li><strong>Disease Prevention:</strong> Reduces the risk of chronic diseases like heart disease, diabetes, and some cancers.</li><li><strong>Improved Mood:</strong> Releases endorphins, which can improve mood and reduce feelings of depression and anxiety.</li><li><strong>Increased Energy Levels:</strong> Boosts stamina and reduces fatigue.</li><li><strong>Better Sleep:</strong> Can help you fall asleep faster and deepen your sleep.</li></ul><p>Aim for at least 150 minutes of moderate-intensity aerobic exercise or 75 minutes of vigorous-intensity exercise per week, along with muscle-strengthening activities.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'person jogging park',
    tags: ['exercise', 'fitness', 'healthy lifestyle'],
  },
  {
    slug: 'managing-stress-effectively',
    title: 'Effective Strategies for Managing Stress',
    date: '2024-06-28',
    author: 'Dr. Emily Carter',
    excerpt: 'Learn practical techniques to cope with stress and improve your mental resilience in today\'s fast-paced world.',
    content: '<p>Stress is a normal part of life, but chronic stress can take a toll on your health. Effective stress management techniques include:</p><ul><li>Regular physical activity.</li><li>Mindfulness and meditation.</li><li>Adequate sleep.</li><li>Spending time in nature.</li><li>Connecting with loved ones.</li><li>Setting realistic goals and priorities.</li></ul><p>Finding what works for you is key to building resilience.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'person meditating calm',
    tags: ['stress management', 'mental health', 'wellness'],
  },
  {
    slug: 'hydration-importance',
    title: 'Why Hydration is Key to Your Well-being',
    date: '2024-06-20',
    author: 'Dr. James Lee',
    excerpt: 'Discover the crucial role water plays in your body and simple tips to ensure you stay properly hydrated throughout the day.',
    content: '<p>Water is essential for life. Proper hydration supports numerous bodily functions, including:</p><ul><li>Regulating body temperature.</li><li>Transporting nutrients and oxygen to cells.</li><li>Flushing out waste products.</li><li>Lubricating joints.</li><li>Improving skin health.</li></ul><p>Aim to drink water consistently throughout the day. Carry a water bottle as a reminder.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'glass water fresh',
    tags: ['hydration', 'health tips', 'nutrition'],
  },
];

export let placeholderMedicalHistory: MedicalRecordItem[] = [
  { id: '1', date: '2024-05-10', type: 'diagnosis', description: 'Hypertension Stage 1', doctor: 'Dr. Emily Carter' },
  { id: '2', date: '2024-05-10', type: 'medication', description: 'Lisinopril 10mg daily', doctor: 'Dr. Emily Carter' },
  { id: '3', date: '2023-11-20', type: 'procedure', description: 'Annual Physical Exam', doctor: 'Dr. Emily Carter' },
  { id: '4', date: '2023-08-15', type: 'allergy', description: 'Penicillin - causes rash, hives', doctor: 'Dr. James Lee' },
  { id: '5', date: '2023-02-01', type: 'diagnosis', description: 'Seasonal Affective Disorder', doctor: 'Dr. James Lee' },
  { id: '6', date: '2022-09-05', type: 'note', description: 'Patient reports occasional migraines, advised lifestyle changes.', doctor: 'Dr. James Lee'},
  { id: '7', date: '2024-01-10', type: 'allergy', description: 'Peanuts - anaphylaxis', doctor: 'Dr. Emily Carter' },
  { id: '8', date: '2023-06-22', type: 'medication', description: 'Ibuprofen 200mg PRN for pain', doctor: 'Dr. Sarah Green' },
  { id: '9', date: '2023-03-17', type: 'allergy', description: 'Latex - contact dermatitis', doctor: 'Dr. Michael Brown' },
  { id: '10', date: '2024-03-01', type: 'allergy', description: 'Dust Mites - mild respiratory symptoms', doctor: 'Dr. Michael Brown' },
  { id: '11', date: '2022-10-15', type: 'allergy', description: 'Shellfish - severe reaction, carries EpiPen', doctor: 'Dr. Emily Carter' },
  { id: '12', date: '2024-07-01', type: 'allergy', description: 'Ragweed Pollen - seasonal allergic rhinitis', doctor: 'Dr. James Lee' },
  { id: '13', date: '2023-09-10', type: 'allergy', description: 'Aspirin - gastrointestinal upset', doctor: 'Dr. Sarah Green' },
];

export let placeholderMedications: Medication[] = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-05-10', prescribedBy: 'Dr. Emily Carter', refillsRemaining: 5 },
  { id: '2', name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily for 7 days', startDate: '2024-06-01', endDate: '2024-06-07', prescribedBy: 'Dr. Sarah Green', refillsRemaining: 0 },
  { id: '3', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-01-15', prescribedBy: 'Dr. Emily Carter', refillsRemaining: 3 },
  { id: '4', name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily', startDate: '2023-02-01', prescribedBy: 'Dr. James Lee', refillsRemaining: 12 },
];

export const getFutureDate = (days: number) => new Date(new Date().setDate(new Date().getDate() + days)).toISOString().split('T')[0];
export const getPastDate = (days: number) => new Date(new Date().setDate(new Date().getDate() - days)).toISOString().split('T')[0];
export const getTodayDate = () => new Date().toISOString().split('T')[0];

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, ''); 
}

export let placeholderDoctorPatients: DoctorPatient[] = [
  { id: 'dp1', name: 'Alice Wonderland', lastVisit: getPastDate(30), email: 'alice.wonderland@example.com', phone: '555-0101' },
  { id: 'dp2', name: 'Bob The Builder', lastVisit: getPastDate(120), email: 'bob.builder@example.com', phone: '555-0102' },
  { id: 'dp3', name: 'Charlie Brown', lastVisit: getPastDate(45), email: 'charlie.brown@example.com', phone: '555-0103' },
  { id: 'dp4', name: 'Diana Prince', lastVisit: getTodayDate(), email: 'diana.prince@example.com', phone: '555-0104' },
  { id: 'dp5', name: 'Edward Scissorhands', lastVisit: getPastDate(40), email: 'edward.s@example.com', phone: '555-0105' },
  { id: 'dp6', name: 'Fiona Gallagher', lastVisit: getPastDate(50), email: 'fiona.g@example.com', phone: '555-0106' },
  { id: 'dp7', name: 'Garry Poter', lastVisit: getPastDate(60), email: 'garry.poter@example.com', phone: '555-0107' },
  { id: 'dp8', name: 'Hermione Granger', lastVisit: getPastDate(70), email: 'hermione.granger@example.com', phone: '555-0108' },
  { id: 'dp9', name: 'Jane Doe (Patient Portal User)', lastVisit: getPastDate(15), email: 'patient@example.com', phone: '555-0109'},
  { id: 'dp10', name: 'John Smith', lastVisit: getPastDate(100), email: 'john.smith@example.com', phone: '555-0110'},
  { id: 'dp11', name: 'Ivy Smith', lastVisit: getPastDate(25), email: 'ivy.smith@example.com', phone: '555-0111'},
  { id: 'dp12', name: 'Jack Frost', lastVisit: getPastDate(35), email: 'jack.frost@example.com', phone: '555-0112'},
  { id: 'dp13', name: 'George Jetson', lastVisit: getPastDate(55), email: 'george.jetson@example.com', phone: '555-0113'},
  { id: 'dp14', name: 'Hannah Montana', lastVisit: getPastDate(65), email: 'hannah.montana@example.com', phone: '555-0114'},
  { id: 'dp15', name: 'Laura Croft', lastVisit: getPastDate(20), email: 'laura.croft@example.com', phone: '555-0115'},
  { id: 'dp16', name: 'Peter Parker', lastVisit: getPastDate(80), email: 'peter.parker@example.com', phone: '555-0116'},
];

const patientIdMap = new Map(placeholderDoctorPatients.map(p => [p.name, p.id]));

export let placeholderDoctorAppointments: DoctorAppointment[] = [
  { id: 'da1', patientId: patientIdMap.get('Alice Wonderland') || 'dp1', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(30), time: '10:00 AM', reason: 'Follow-up for hypertension', status: 'Completed', reminderSent: true },
  { id: 'da1-upcoming', patientId: patientIdMap.get('Alice Wonderland') || 'dp1', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getFutureDate(20), time: '10:00 AM', reason: 'Routine Check-up', status: 'Scheduled', reminderSent: false },
  { id: 'da2', patientId: patientIdMap.get('Bob The Builder') || 'dp2', patientName: 'Bob The Builder', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(3), time: '11:30 AM', reason: 'Annual physical', status: 'Scheduled', reminderSent: true },
  { id: 'da3', patientId: patientIdMap.get('Charlie Brown') || 'dp3', patientName: 'Charlie Brown', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getFutureDate(21), time: '02:00 PM', reason: 'Migraine consultation', status: 'Pending Confirmation', reminderSent: false },
  { id: 'da4', patientId: patientIdMap.get('Diana Prince') || 'dp4', patientName: 'Diana Prince', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getTodayDate(), time: '03:00 PM', reason: 'Medication review', status: 'Checked-in', reminderSent: true },
  { id: 'da5', patientId: patientIdMap.get('Edward Scissorhands') || 'dp5', patientName: 'Edward Scissorhands', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getPastDate(40), time: '09:00 AM', reason: 'Initial consultation', status: 'Completed', reminderSent: true },
  { id: 'da5-upcoming', patientId: patientIdMap.get('Edward Scissorhands') || 'dp5', patientName: 'Edward Scissorhands', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(5), time: '09:00 AM', reason: 'Follow-up', status: 'Scheduled', reminderSent: false },
  { id: 'da6', patientId: patientIdMap.get('Fiona Gallagher') || 'dp6', patientName: 'Fiona Gallagher', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getPastDate(50), time: '10:30 AM', reason: 'Lab results review', status: 'Completed', reminderSent: true },
  { id: 'da7', patientId: patientIdMap.get('Garry Poter') || 'dp7', patientName: 'Garry Poter', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getFutureDate(1), time: '09:00 AM', reason: 'Consultation', status: 'Scheduled', reminderSent: false },
  { id: 'da8', patientId: patientIdMap.get('Hermione Granger') || 'dp8', patientName: 'Hermione Granger', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getTodayDate(), time: '10:00 AM', reason: 'Neurological exam', status: 'Scheduled', reminderSent: true },
  { id: 'da9', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getFutureDate(7), time: '11:00 AM', reason: 'Regular check-up', status: 'Scheduled', reminderSent: false },
  { id: 'da10', patientId: patientIdMap.get('John Smith') || 'dp10', patientName: 'John Smith', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(14), time: '02:30 PM', reason: 'Follow-up on test results', status: 'Scheduled', reminderSent: true },
  { id: 'da11', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getPastDate(60), time: '03:30 PM', reason: 'Post-op check', status: 'Completed', reminderSent: true },
  { id: 'da12', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(25), time: '09:30 AM', reason: 'Follow-up consultation', status: 'Scheduled', reminderSent: false },
  { id: 'da13', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(15), time: '02:00 PM', reason: 'ECG results review', status: 'Completed', reminderSent: true },
  { id: 'da14', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(120), time: '10:00 AM', reason: 'Annual Wellness Visit', status: 'Completed', reminderSent: true },
  { id: 'da15', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getFutureDate(40), time: '04:00 PM', reason: 'Physical Therapy Referral', status: 'Pending Confirmation', reminderSent: false },
];

export let placeholderAnnouncements: Announcement[] = [
  {
    id: 'welcome-new-patients',
    title: 'Welcome New Patients!',
    content: 'HealthFlow is pleased to welcome all new patients to our clinic. Explore our services and book your first appointment online.',
    displayLocations: ['homepage', 'all_portals'],
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), 
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)), 
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: 'doctor-portal-update',
    title: 'Doctor Portal Maintenance Scheduled',
    content: 'The Doctor Portal will undergo scheduled maintenance on Sunday from 2 AM to 4 AM. Access may be intermittent.',
    displayLocations: ['doctor_portal'],
    startDate: new Date(new Date().setDate(new Date().getDate() - 1)), 
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)), 
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'flu-shot-clinic',
    title: 'Flu Shot Clinic - Now Open!',
    content: 'Our annual flu shot clinic is now open. Protect yourself and your family this season. Walk-ins welcome or book an appointment.',
    displayLocations: ['homepage', 'patient_portal', 'receptionist_portal'],
    startDate: new Date(), 
    endDate: new Date(new Date().setDate(new Date().getDate() + 60)), 
    createdAt: new Date(),
  },
  {
    id: 'system-wide-policy-update',
    title: 'Important: New Privacy Policy Update',
    content: 'Please review our updated privacy policy, effective next month. Available in all portals under "Clinic Policies".',
    displayLocations: ['all_portals'],
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    createdAt: new Date(),
  },
  {
    id: 'manager-dashboard-tip',
    title: 'Manager Tip: Utilize the New Reports Feature',
    content: 'The new reporting tools in the Manager Portal are now live. Generate insights on user activity and service usage.',
    displayLocations: ['manager_portal'],
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    createdAt: new Date(),
  },
  {
    id: 'nurse-reminder-ppe',
    title: 'Nurse Reminder: PPE Guidelines Update',
    content: 'Please review the updated PPE guidelines posted in the break room and available in the Nurse Portal resources section.',
    displayLocations: ['nurse_portal'],
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    createdAt: new Date(),
  }
];

export let placeholderTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "HealthFlow has transformed how I manage my health. The doctors are attentive, and the portal makes everything so easy!",
    authorName: "Sarah Miller",
    authorRole: "Patient",
    authorImageUrl: "https://placehold.co/100x100.png",
    dataAiHint: "happy patient",
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote: "Booking appointments is a breeze, and I always feel well-cared for. Highly recommend HealthFlow to everyone.",
    authorName: "John B.",
    authorRole: "Patient",
    authorImageUrl: "https://placehold.co/100x100.png",
    dataAiHint: "satisfied person",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    videoPlaceholderImageUrl: "https://placehold.co/600x400.png",
    rating: 5,
  },
  {
    id: 'testimonial-3',
    quote: "The team at HealthFlow is professional and compassionate. They truly prioritize patient well-being.",
    authorName: "Alice W.",
    authorRole: "Long-time Patient",
    authorImageUrl: "https://placehold.co/100x100.png",
    dataAiHint: "smiling woman",
    rating: 4,
  },
  {
    id: 'testimonial-4',
    quote: "I appreciate the modern approach and the easy access to my medical information through their portal.",
    authorName: "David K.",
    authorRole: "Patient",
    authorImageUrl: "https://placehold.co/100x100.png",
    dataAiHint: "content man",
    videoUrl: "#", 
    videoPlaceholderImageUrl: "https://placehold.co/600x300.png", 
    rating: 4,
  },
  {
    id: 'testimonial-5',
    quote: "Excellent care and very efficient service. The new clinic facilities are top-notch. Five stars!",
    authorName: "Maria G.",
    authorRole: "New Patient",
    authorImageUrl: "https://placehold.co/100x100.png",
    dataAiHint: "pleased woman",
    rating: 5,
  },
];

export let placeholderTrustSignals: TrustSignal[] = [
  { id: 'ts-partner-1', type: 'partner', name: 'American Medical Association', imageUrl: 'https://placehold.co/150x80.png', dataAiHint: 'medical association logo', url: '#' },
  { id: 'ts-partner-2', type: 'partner', name: 'National Health Service', imageUrl: 'https://placehold.co/150x80.png', dataAiHint: 'health service logo', url: '#' },
  { id: 'ts-partner-3', type: 'partner', name: 'Wellness Tech Inc.', imageUrl: 'https://placehold.co/150x80.png', dataAiHint: 'tech company logo', url: '#' },
  { id: 'ts-cert-1', type: 'certification', name: 'HIPAA Compliant', imageUrl: 'https://placehold.co/120x120.png', dataAiHint: 'HIPAA badge', url: '#' },
  { id: 'ts-cert-2', type: 'certification', name: 'ISO 9001 Certified', imageUrl: 'https://placehold.co/120x120.png', dataAiHint: 'ISO badge quality', url: '#' },
  { id: 'ts-cert-3', type: 'certification', name: 'Best Clinic Award 2023', imageUrl: 'https://placehold.co/120x120.png', dataAiHint: 'award seal', url: '#' },
  { id: 'ts-featured-1', type: 'featured', name: 'Health Today Magazine', imageUrl: 'https://placehold.co/200x60.png', dataAiHint: 'magazine logo health', url: '#' },
  { id: 'ts-featured-2', type: 'featured', name: 'TechHealth Conference', imageUrl: 'https://placehold.co/200x60.png', dataAiHint: 'conference logo tech', url: '#' },
  { id: 'ts-featured-3', type: 'featured', name: 'Local News Channel 7', imageUrl: 'https://placehold.co/200x60.png', dataAiHint: 'news channel logo', url: '#' },
];

export let placeholderNursePatientQueue: NursePatientQueueItem[] = [
  { id: 'nq1', name: 'Edward Scissorhands', status: 'Waiting for Triage', arrivalTime: '09:15 AM' },
  { id: 'nq2', name: 'Fiona Gallagher', status: 'Ready for Vitals', arrivalTime: '09:30 AM' },
  { id: 'nq3', name: 'George Jetson', status: 'Waiting for Doctor', arrivalTime: '08:45 AM' },
  { id: 'nq4', name: 'Hannah Montana', status: 'Ready for Vitals', arrivalTime: '09:50 AM' },
];

export let placeholderNurseAlerts: NurseAlert[] = [
  { id: 'na1', message: 'Low stock of 10cc syringes in treatment room 2.', severity: 'medium', timestamp: '2024-08-14 10:05 AM' },
  { id: 'na2', message: 'Patient in Room 5 reports increased pain.', severity: 'high', timestamp: '2024-08-14 11:30 AM' },
];

export let placeholderNurseSchedule: NurseShiftSchedule = {
  today: '08:00 AM - 04:00 PM (Charge Nurse)',
  tomorrow: '12:00 PM - 08:00 PM',
  notes: 'Staff meeting at 3:30 PM today regarding new charting system.'
};

export let placeholderNurses: Nurse[] = [
    { id: 'nurse-1', name: 'Nurse Alex Miller', email: 'alex.miller@healthflow.clinic', department: 'General Ward', shift: 'Day Shift (7 AM - 7 PM)' },
    { id: 'nurse-2', name: 'Nurse Jordan Lee', email: 'jordan.lee@healthflow.clinic', department: 'Emergency', shift: 'Night Shift (7 PM - 7 AM)' },
];

export let placeholderReceptionists: Receptionist[] = [
    { id: 'recep-1', name: 'Sarah Bell', email: 'receptionist@example.com', employeeId: 'REC001' },
    { id: 'recep-2', name: 'Michael Chen', email: 'michael.chen@healthflow.clinic', employeeId: 'REC002' },
];

export let placeholderManagerUsers: ManagedUser[] = [
    { id: 'manager-1', name: 'Manager User', role: 'Manager', email: 'manager@healthflow.clinic', status: 'Active', lastLogin: new Date().toLocaleDateString() }
];

export let placeholderSupplyItems: SupplyItem[] = [
  { id: 's1', name: '10cc Syringes', category: 'Medical Consumables', stockLevel: 50, reorderPoint: 20, status: 'In Stock' },
  { id: 's2', name: 'Gauze Pads (4x4)', category: 'Wound Care', stockLevel: 15, reorderPoint: 30, status: 'Low Stock' },
  { id: 's3', name: 'Alcohol Swabs', category: 'Medical Consumables', stockLevel: 200, reorderPoint: 100, status: 'In Stock' },
  { id: 's4', name: 'Disposable Gloves (M)', category: 'PPE', stockLevel: 35, reorderPoint: 50, status: 'Low Stock' },
  { id: 's5', name: 'Saline Solution (500ml)', category: 'IV Fluids', stockLevel: 10, reorderPoint: 5, status: 'Critical' },
  { id: 's6', name: 'Band-Aids (Assorted)', category: 'Wound Care', stockLevel: 150, reorderPoint: 50, status: 'In Stock'},
  { id: 's7', name: 'Thermometer Probe Covers', category: 'Medical Consumables', stockLevel: 75, reorderPoint: 100, status: 'Low Stock'},
];

export let allClinicAppointments: DoctorAppointment[] = [
  { id: 'ac1', patientId: patientIdMap.get('Alice Wonderland') || 'dp1', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(30), time: '10:00 AM', reason: 'Follow-up for hypertension', status: 'Completed', reminderSent: true },
  { id: 'ac1-upcoming', patientId: patientIdMap.get('Alice Wonderland') || 'dp1', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getFutureDate(20), time: '10:00 AM', reason: 'Routine Check-up', status: 'Scheduled', reminderSent: false },
  { id: 'ac2', patientId: patientIdMap.get('Bob The Builder') || 'dp2', patientName: 'Bob The Builder', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(3), time: '11:30 AM', reason: 'Annual physical', status: 'Scheduled', reminderSent: true },
  { id: 'ac3', patientId: patientIdMap.get('Charlie Brown') || 'dp3', patientName: 'Charlie Brown', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getFutureDate(21), time: '02:00 PM', reason: 'Migraine consultation', status: 'Pending Confirmation', reminderSent: false },
  { id: 'ac4', patientId: patientIdMap.get('Diana Prince') || 'dp4', patientName: 'Diana Prince', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getTodayDate(), time: '03:00 PM', reason: 'Medication review', status: 'Checked-in', reminderSent: true },
  { id: 'ac5', patientId: patientIdMap.get('Edward Scissorhands') || 'dp5', patientName: 'Edward Scissorhands', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getPastDate(40), time: '09:00 AM', reason: 'Initial consultation', status: 'Completed', reminderSent: true },
  { id: 'ac5-upcoming', patientId: patientIdMap.get('Edward Scissorhands') || 'dp5', patientName: 'Edward Scissorhands', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(5), time: '09:00 AM', reason: 'Follow-up', status: 'Scheduled', reminderSent: false },
  { id: 'ac6', patientId: patientIdMap.get('Fiona Gallagher') || 'dp6', patientName: 'Fiona Gallagher', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getPastDate(50), time: '10:30 AM', reason: 'Lab results review', status: 'Completed', reminderSent: true },
  { id: 'ac7', patientId: patientIdMap.get('Garry Poter') || 'dp7', patientName: 'Garry Poter', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getFutureDate(1), time: '09:00 AM', reason: 'Consultation', status: 'Scheduled', reminderSent: false },
  { id: 'ac8', patientId: patientIdMap.get('Hermione Granger') || 'dp8', patientName: 'Hermione Granger', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getTodayDate(), time: '10:00 AM', reason: 'Neurological exam', status: 'Scheduled', reminderSent: true },
  { id: 'ac9', patientId: patientIdMap.get('Ivy Smith') || 'dp11', patientName: 'Ivy Smith', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getTodayDate(), time: '09:30 AM', reason: 'Chest pain evaluation', status: 'Scheduled', reminderSent: false },
  { id: 'ac10', patientId: patientIdMap.get('Jack Frost') || 'dp12', patientName: 'Jack Frost', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getFutureDate(4), time: '02:30 PM', reason: 'Knee injury follow-up', status: 'Scheduled', reminderSent: true },
  { id: 'ac11', patientId: patientIdMap.get('Alice Wonderland') || 'dp1', patientName: 'Alice Wonderland', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getPastDate(90), time: '11:00 AM', reason: 'Sports injury check', status: 'Completed', reminderSent: true },
  { id: 'ac12', patientId: patientIdMap.get('Bob The Builder') || 'dp2', patientName: 'Bob The Builder', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(10), time: '02:00 PM', reason: 'Heart check', status: 'Completed', reminderSent: true },
  { id: 'ac13', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getFutureDate(7), time: '11:00 AM', reason: 'Regular check-up', status: 'Scheduled', reminderSent: false },
  { id: 'ac14', patientId: patientIdMap.get('John Smith') || 'dp10', patientName: 'John Smith', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(14), time: '02:30 PM', reason: 'Follow-up on test results', status: 'Scheduled', reminderSent: true },
  { id: 'ac15', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getPastDate(60), time: '03:30 PM', reason: 'Post-op check', status: 'Completed', reminderSent: true },
  { id: 'ac16', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. James Lee', doctorId: 'james-lee', date: getFutureDate(25), time: '09:30 AM', reason: 'Follow-up consultation', status: 'Scheduled', reminderSent: false },
  { id: 'ac17', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(15), time: '02:00 PM', reason: 'ECG results review', status: 'Completed', reminderSent: true },
  { id: 'ac18', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getPastDate(120), time: '10:00 AM', reason: 'Annual Wellness Visit', status: 'Completed', reminderSent: true },
  { id: 'ac19', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Sarah Green', doctorId: 'sarah-green', date: getFutureDate(40), time: '04:00 PM', reason: 'Physical Therapy Referral', status: 'Pending Confirmation', reminderSent: false },
  { id: 'ac20', patientId: patientIdMap.get('Jane Doe (Patient Portal User)') || 'dp9', patientName: 'Jane Doe (Patient Portal User)', doctorName: 'Dr. Emily Carter', doctorId: 'emily-carter', date: getTodayDate(), time: '04:30 PM', reason: 'Blood Pressure Check', status: 'Scheduled', reminderSent: true },
];

export let homepageWidgetSettings: HomepageWidgetSetting[] = [
  { id: 'announcements', name: 'Announcements Section', isVisible: true },
  { id: 'promoBanner', name: 'Promotional Banner', isVisible: true },
  { id: 'services', name: 'Our Services Section', isVisible: true },
  { id: 'specializedServices', name: 'Specialized Services Grid', isVisible: true },
  { id: 'whyChooseUs', name: 'Why Choose HealthFlow Section', isVisible: true },
  { id: 'whyChooseOurHospital', name: 'Why Choose Our Hospital Section', isVisible: true },
  { id: 'testimonials', name: 'Testimonials Section', isVisible: true },
  { id: 'trustSignals', name: 'Trust Signals Section', isVisible: true },
  { id: 'meetOurDoctors', name: 'Meet Our Doctors Section', isVisible: true },
  { id: 'blogPreview', name: 'Blog Preview Section', isVisible: true },
];

export let heroSlides: HeroSlideItem[] = [
  {
    id: 'hero1',
    imageUrl: '/meet-doctor-img.webp', // Corrected path for the first slide
    altText: 'Clean and modern hospital corridor',
    dataAiHint: 'modern hospital interior',
    title: 'Your Health, Our Priority',
    subtitle: 'Experience compassionate and expert healthcare at HealthFlow. We are dedicated to providing top-quality medical services to our community.',
    ctaText: 'Book an Appointment',
    ctaLink: '/appointments',
  },
  {
    id: 'hero2',
    imageUrl: '/banner2.jpg',
    altText: 'Team of dedicated medical professionals',
    dataAiHint: 'doctors team smiling',
    title: 'Expert Care, Advanced Technology',
    subtitle: 'Our skilled team uses cutting-edge technology to deliver the best possible outcomes.',
    ctaText: 'Discover Our Services',
    ctaLink: '/services',
  },
  {
    id: 'hero3',
    imageUrl: '/banner3.jpg',
    altText: 'Patient focused healthcare environment',
    dataAiHint: 'doctor patient interaction',
    title: 'A Community of Wellness',
    subtitle: 'Join us on your journey to better health and a more vibrant life.',
    ctaText: 'Learn About Us',
    ctaLink: '/about',
  },
];

    

    


