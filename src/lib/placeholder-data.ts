import type { Doctor, Service, BlogPost, MedicalRecordItem, Medication } from '@/types';
import { HeartPulse, Brain, Bone, Activity, Stethoscope, Syringe, Pill, Microscope, Baby } from 'lucide-react';

export const placeholderDoctors: Doctor[] = [
  {
    id: 'emily-carter',
    name: 'Dr. Emily Carter',
    specialty: 'Cardiologist',
    bio: 'Dr. Emily Carter is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She is passionate about preventive care and patient education.',
    education: ['MD, Stanford University School of Medicine', 'Residency, Johns Hopkins Hospital', 'Fellowship in Cardiology, Mayo Clinic'],
    experience: ['Attending Cardiologist, City General Hospital (10 years)', 'Chief of Cardiology, HealthFlow Clinic (5 years)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'female doctor smiling',
    availability: {
      Monday: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'],
      Wednesday: ['9:00 AM - 1:00 PM'],
      Friday: ['2:00 PM - 5:00 PM'],
    }
  },
  {
    id: 'james-lee',
    name: 'Dr. James Lee',
    specialty: 'Neurologist',
    bio: 'Dr. James Lee specializes in neurological disorders, including epilepsy, stroke, and Alzheimer\'s disease. He is known for his compassionate approach and dedication to research.',
    education: ['MD, Harvard Medical School', 'Residency in Neurology, Massachusetts General Hospital'],
    experience: ['Neurologist, Boston Medical Center (8 years)', 'Senior Neurologist, HealthFlow Clinic (current)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'male doctor friendly',
     availability: {
      Tuesday: ['10:00 AM - 1:00 PM', '3:00 PM - 6:00 PM'],
      Thursday: ['9:00 AM - 12:00 PM'],
    }
  },
  {
    id: 'sarah-green',
    name: 'Dr. Sarah Green',
    specialty: 'Orthopedic Surgeon',
    bio: 'Dr. Sarah Green is an accomplished orthopedic surgeon with expertise in sports medicine and joint replacement. She helps patients regain mobility and improve their quality of life.',
    education: ['MD, Yale School of Medicine', 'Residency in Orthopedic Surgery, UCSF Medical Center'],
    experience: ['Orthopedic Surgeon, Sports Medicine Clinic (7 years)', 'Consultant Orthopedic Surgeon, HealthFlow Clinic (current)'],
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'female surgeon confident',
    availability: {
      Monday: ['10:00 AM - 1:00 PM'],
      Wednesday: ['2:00 PM - 6:00 PM'],
      Thursday: ['1:00 PM - 4:00 PM'],
    }
  },
];

export const placeholderServices: Service[] = [
  { id: 'general-checkups', name: 'General Checkups', icon: Stethoscope, description: 'Routine health examinations and preventive care for all ages.', details: 'Our general checkups include a thorough physical examination, review of medical history, vital signs check, and age-appropriate screenings. We focus on preventive care to help you maintain optimal health.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'doctor patient consultation' },
  { id: 'vaccinations', name: 'Vaccinations', icon: Syringe, description: 'Comprehensive immunization services for children and adults.', details: 'We offer a full range of vaccines for infants, children, adolescents, and adults, including flu shots, travel vaccinations, and routine immunizations, following CDC guidelines.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'nurse giving injection' },
  { id: 'chronic-disease', name: 'Chronic Disease Management', icon: Activity, description: 'Ongoing care and support for managing chronic conditions like diabetes and hypertension.', details: 'Our team provides personalized care plans for managing chronic diseases, focusing on lifestyle modifications, medication management, and regular monitoring to improve your quality of life.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'blood pressure check' },
  { id: 'cardiology', name: 'Cardiology', icon: HeartPulse, description: 'Specialized heart care, including ECG, stress tests, and consultations.', details: 'Our cardiology department offers advanced diagnostic services and treatment for various heart conditions. We emphasize early detection and management of cardiovascular diseases.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'heart monitor screen' },
  { id: 'orthopedics', name: 'Orthopedics', icon: Bone, description: 'Diagnosis and treatment of musculoskeletal injuries and conditions.', details: 'From sports injuries to arthritis, our orthopedic specialists provide comprehensive care, including non-surgical treatments, physical therapy referrals, and surgical interventions when necessary.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'knee x-ray' },
  { id: 'neurology', name: 'Neurology', icon: Brain, description: 'Care for disorders of the nervous system, including migraines and neuropathy.', details: 'Our neurologists are experts in diagnosing and treating a wide range of neurological conditions. We utilize advanced diagnostic tools and develop individualized treatment plans.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'brain activity chart' },
];

export const placeholderBlogPosts: BlogPost[] = [
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
];

export const placeholderMedicalHistory: MedicalRecordItem[] = [
  { id: '1', date: '2024-05-10', type: 'diagnosis', description: 'Hypertension Stage 1', doctor: 'Dr. Emily Carter' },
  { id: '2', date: '2024-05-10', type: 'medication', description: 'Lisinopril 10mg daily', doctor: 'Dr. Emily Carter' },
  { id: '3', date: '2023-11-20', type: 'procedure', description: 'Annual Physical Exam', doctor: 'Dr. Emily Carter' },
  { id: '4', date: '2023-08-15', type: 'allergy', description: 'Penicillin - causes rash', doctor: 'Dr. James Lee' },
  { id: '5', date: '2023-02-01', type: 'diagnosis', description: 'Seasonal Affective Disorder', doctor: 'Dr. James Lee' },
  { id: '6', date: '2022-09-05', type: 'note', description: 'Patient reports occasional migraines, advised lifestyle changes.', doctor: 'Dr. James Lee'},
];

export const placeholderMedications: Medication[] = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-05-10', prescribedBy: 'Dr. Emily Carter', refillsRemaining: 5 },
  { id: '2', name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily for 7 days', startDate: '2024-06-01', endDate: '2024-06-07', prescribedBy: 'Dr. Sarah Green', refillsRemaining: 0 },
  { id: '3', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-01-15', prescribedBy: 'Dr. Emily Carter', refillsRemaining: 3 },
  { id: '4', name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily', startDate: '2023-02-01', prescribedBy: 'Dr. James Lee', refillsRemaining: 12 },
];

export const samplePatientNotes = `Patient Name: John Doe
DOB: 1985-03-15
Date of Visit: 2024-07-20
Chief Complaint: Persistent cough and fatigue for 2 weeks.
History of Present Illness: Patient reports a dry, hacking cough that worsens at night. Accompanied by general malaise and occasional shortness of breath on exertion. No fever reported.
Past Medical History: Hypertension, diagnosed 2022. Seasonal allergies.
Medications: Lisinopril 10mg daily. Loratadine 10mg as needed for allergies.
Physical Exam:
Vitals: BP 130/85, HR 78, RR 18, Temp 98.2°F, O2 Sat 97% on room air.
Lungs: Clear to auscultation bilaterally, no wheezes or rales. Mild pharyngeal erythema.
Assessment: Likely viral upper respiratory infection. Rule out bronchitis.
Plan:
1. Recommend rest and hydration.
2. OTC cough suppressant (dextromethorphan) as needed.
3. Follow up in 1 week if symptoms do not improve or worsen.
4. Consider chest X-ray if cough persists beyond 2 weeks or new symptoms develop.
Dr. Emily Carter`;

export const sampleLabResults = `Patient Name: John Doe
Lab Report Date: 2024-07-01
Test: Complete Blood Count (CBC)
WBC: 7.5 x 10^9/L (Normal: 4.0-11.0)
RBC: 4.8 x 10^12/L (Normal: 4.5-5.5)
Hemoglobin: 14.2 g/dL (Normal: 13.5-17.5)
Hematocrit: 42% (Normal: 40-50%)
Platelets: 250 x 10^9/L (Normal: 150-400)
Differential: Neutrophils 60%, Lymphocytes 30%, Monocytes 6%, Eosinophils 3%, Basophils 1% (All within normal limits)

Test: Basic Metabolic Panel (BMP)
Sodium: 140 mEq/L (Normal: 135-145)
Potassium: 4.2 mEq/L (Normal: 3.5-5.0)
Chloride: 102 mEq/L (Normal: 98-107)
BUN: 15 mg/dL (Normal: 7-20)
Creatinine: 0.9 mg/dL (Normal: 0.7-1.3)
Glucose: 95 mg/dL (Normal: 70-99)
Calcium: 9.5 mg/dL (Normal: 8.5-10.2)
Interpretation: All results within normal limits.
Lab Director: Dr. Testy McTestface`;

export const sampleConsultations = `Consultation Note 1:
Date: 2023-11-20
Consulting Physician: Dr. Emily Carter
Reason for Consult: Annual Physical Exam
Summary: Patient is a 39-year-old male presenting for routine checkup. Generally in good health. Blood pressure slightly elevated at 135/88 mmHg. Discussed lifestyle modifications including diet and exercise. Recommended monitoring BP at home. Lab work ordered.

Consultation Note 2:
Date: 2022-05-10
Consulting Physician: Dr. Emily Carter
Reason for Consult: Follow-up for elevated blood pressure.
Summary: Patient's home BP readings consistently >140/90. Diagnosed with Hypertension Stage 1. Initiated Lisinopril 10mg daily. Provided patient education on medication and importance of adherence. Follow-up in 3 months.`;
