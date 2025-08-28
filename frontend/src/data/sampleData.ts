import { Incident, Report, Notification } from '../types';

export const sampleIncidents: Incident[] = [
  {
    id: '1',
    title: 'Wrong Dose Administration - Insulin',
    description: 'Patient received 20 units of insulin instead of prescribed 10 units. Error caught during shift handover.',
    type: 'incident',
    severity: 'moderate_harm',
    status: 'investigating',
    location: 'Medical Ward 3A',
    reportedBy: 'Sarah Johnson, RN',
    reportedAt: '2024-01-15T10:30:00Z',
    assignedTo: 'Pharmacy Safety Team',
    category: 'wrong_dose',
    tags: ['insulin', 'dosing-error', 'diabetes'],
    medicationName: 'Insulin Glargine',
    medicationClass: 'Antidiabetic',
    patientAge: 67,
    patientGender: 'male',
    harmLevel: 'moderate_harm',
    contributingFactors: ['Similar packaging', 'Workload pressure', 'Inadequate double-check'],
    preventability: 'preventable'
  },
  {
    id: '2',
    title: 'Near Miss - Penicillin Allergy',
    description: 'Penicillin was prepared for patient with documented allergy. Caught before administration by bedside nurse.',
    type: 'near_miss',
    severity: 'no_harm',
    status: 'resolved',
    location: 'Emergency Department',
    reportedBy: 'Michael Chen, RN',
    reportedAt: '2024-01-14T14:15:00Z',
    assignedTo: 'Clinical Pharmacist',
    category: 'prescribing_error',
    tags: ['allergy', 'penicillin', 'near-miss'],
    medicationName: 'Penicillin G',
    medicationClass: 'Antibiotic',
    patientAge: 45,
    patientGender: 'female',
    harmLevel: 'no_harm',
    contributingFactors: ['Allergy alert not visible', 'System override'],
    preventability: 'preventable'
  },
  {
    id: '3',
    title: 'Medication Omission - Warfarin',
    description: 'Patient missed evening dose of warfarin due to medication not being available on ward.',
    type: 'incident',
    severity: 'minor_harm',
    status: 'closed',
    location: 'Cardiology Unit',
    reportedBy: 'Lisa Rodriguez, PharmD',
    reportedAt: '2024-01-13T09:45:00Z',
    assignedTo: 'Supply Chain Manager',
    category: 'medication_omission',
    tags: ['warfarin', 'supply-issue', 'anticoagulant'],
    medicationName: 'Warfarin Sodium',
    medicationClass: 'Anticoagulant',
    patientAge: 72,
    patientGender: 'male',
    harmLevel: 'minor_harm',
    contributingFactors: ['Stock shortage', 'Communication breakdown'],
    preventability: 'probably_preventable'
  },
  {
    id: '4',
    title: 'Wrong Patient - Metformin',
    description: 'Metformin administered to wrong patient in shared room. Error discovered during medication reconciliation.',
    type: 'incident',
    severity: 'minor_harm',
    status: 'closed',
    location: 'Internal Medicine Ward',
    reportedBy: 'David Kim, RN',
    reportedAt: '2024-01-12T12:20:00Z',
    category: 'wrong_patient',
    tags: ['metformin', 'patient-identification', 'diabetes'],
    medicationName: 'Metformin HCl',
    medicationClass: 'Antidiabetic',
    patientAge: 58,
    patientGender: 'female',
    harmLevel: 'minor_harm',
    contributingFactors: ['Similar patient names', 'Inadequate patient identification'],
    preventability: 'preventable'
  },
  {
    id: '5',
    title: 'Adverse Drug Reaction - Morphine',
    description: 'Patient developed respiratory depression after morphine administration. Naloxone administered successfully.',
    type: 'incident',
    severity: 'severe_harm',
    status: 'open',
    location: 'Post-Surgical Unit',
    reportedBy: 'Jennifer Walsh, RN',
    reportedAt: '2024-01-11T16:10:00Z',
    assignedTo: 'Clinical Safety Officer',
    category: 'adverse_drug_reaction',
    tags: ['morphine', 'respiratory-depression', 'opioid'],
    medicationName: 'Morphine Sulfate',
    medicationClass: 'Opioid Analgesic',
    patientAge: 34,
    patientGender: 'male',
    harmLevel: 'severe_harm',
    contributingFactors: ['Patient sensitivity', 'Inadequate monitoring'],
    preventability: 'probably_not_preventable'
  },
  {
    id: '6',
    title: 'Wrong Route - IV instead of PO',
    description: 'Medication intended for oral administration was given intravenously due to unclear prescription.',
    type: 'incident',
    severity: 'moderate_harm',
    status: 'investigating',
    location: 'ICU',
    reportedBy: 'Robert Taylor, PharmD',
    reportedAt: '2024-01-10T08:30:00Z',
    assignedTo: 'Medical Director',
    category: 'wrong_route',
    tags: ['route-error', 'prescription-clarity'],
    medicationName: 'Potassium Chloride',
    medicationClass: 'Electrolyte',
    patientAge: 29,
    patientGender: 'female',
    harmLevel: 'moderate_harm',
    contributingFactors: ['Unclear prescription', 'Communication failure'],
    preventability: 'preventable'
  }
];

export const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Medication Safety Report - January 2024',
    type: 'monthly',
    generatedAt: '2024-01-31T23:59:00Z',
    generatedBy: 'System',
    data: {
      totalIncidents: 12,
      nearMisses: 8,
      resolvedIncidents: 15,
      averageResolutionTime: '3.2 days',
      topMedicationClasses: ['Antidiabetics', 'Antibiotics', 'Opioids'],
      harmDistribution: { no_harm: 8, minor_harm: 6, moderate_harm: 4, severe_harm: 2, death: 0 }
    }
  },
  {
    id: '2',
    title: 'Quarterly Medication Trend Analysis - Q4 2023',
    type: 'quarterly',
    generatedAt: '2024-01-05T12:00:00Z',
    generatedBy: 'Clinical Safety Team',
    data: {
      trendAnalysis: 'Downward trend in medication incidents',
      recommendations: ['Enhanced barcode scanning', 'Improved allergy alerts', 'Staff training on high-risk medications']
    }
  }
];

export const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'High-Risk Medication Alert',
    message: 'New incident involving insulin reported. Please review dosing protocols.',
    type: 'warning',
    createdAt: '2024-01-15T11:00:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Monthly Safety Report Available',
    message: 'Your monthly medication safety report for January 2024 is now available.',
    type: 'info',
    createdAt: '2024-01-14T16:30:00Z',
    read: false
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Medication database maintenance scheduled for tonight 2:00 AM - 4:00 AM.',
    type: 'info',
    createdAt: '2024-01-13T10:00:00Z',
    read: true
  },
  {
    id: '4',
    title: 'Critical Incident Alert',
    message: 'Severe adverse drug reaction reported in Post-Surgical Unit. Immediate review required.',
    type: 'error',
    createdAt: '2024-01-11T16:15:00Z',
    read: false
  }
];