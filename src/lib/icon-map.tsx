
import { HeartPulse, Brain, Bone, Activity, Stethoscope, Syringe, Pill, Microscope, Baby, ShieldCheck, Ambulance, HelpingHand, Thermometer, TestTube2, Ear, Eye, Smile, PersonStanding, Zap, Users as PaediatricsIcon, ActivitySquare as GastroenterologyIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const serviceIconMap: Record<string, LucideIcon> = {
  Stethoscope, // General Checkups
  Syringe, // Vaccinations, General Surgery (as placeholder)
  Activity, // Chronic Disease Management
  HeartPulse, // Cardiology, Cardiac Surgery
  Bone, // Orthopedics, Spine Surgery
  Brain, // Neurology, Neurosurgery
  Baby, // Pediatrics, IVF, Obstetrics & Gynaecology
  Microscope, // Lab Services, Haematology
  Pill, // Pharmacy Services
  ShieldCheck, // Oncology, Critical Care (alternative)
  Ambulance, // Critical Care
  HelpingHand, // Placeholder
  Thermometer, // Placeholder
  TestTube2, // Haematology (alternative)
  Ear, // Placeholder for ENT
  Eye, // Placeholder for Ophthalmology
  Smile, // Placeholder for Dentistry
  PersonStanding, // Placeholder for Physiotherapy
  Zap, // Generic/Fallback (Endocrinology, Nephrology, Urology, Kidney/Liver Transplant)
  PaediatricsIcon, // Explicit for Paediatrics for clarity if Baby is too generic
  GastroenterologyIcon, // Explicit for Gastroenterology
};

export const serviceIconList: string[] = Object.keys(serviceIconMap).sort();

export const getServiceIcon = (iconName?: string): LucideIcon => {
  if (iconName && serviceIconMap[iconName]) {
    return serviceIconMap[iconName];
  }
  return Zap; // Default icon if not found or not provided, changed from Activity to Zap
};

export const defaultServiceIconName = 'Zap'; // Changed default to Zap for more neutrality
