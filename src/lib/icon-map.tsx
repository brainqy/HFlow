
import { HeartPulse, Brain, Bone, Activity, Stethoscope, Syringe, Pill, Microscope, Baby, ShieldCheck, Ambulance, HelpingHand, Thermometer, TestTube2, Ear, Eye, Smile, PersonStanding, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const serviceIconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Syringe,
  Activity,
  HeartPulse,
  Bone,
  Brain,
  Baby,
  Microscope,
  Pill,
  ShieldCheck,
  Ambulance,
  HelpingHand,
  Thermometer,
  TestTube2,
  Ear,
  Eye,
  Smile,
  PersonStanding,
  Zap, // Generic icon
};

export const serviceIconList: string[] = Object.keys(serviceIconMap).sort();

export const getServiceIcon = (iconName?: string): LucideIcon => {
  if (iconName && serviceIconMap[iconName]) {
    return serviceIconMap[iconName];
  }
  return Activity; // Default icon if not found or not provided
};

export const defaultServiceIconName = 'Activity';
