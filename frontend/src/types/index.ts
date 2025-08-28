export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  type: 'incident' | 'near_miss';
  severity: 'no_harm' | 'minor_harm' | 'moderate_harm' | 'severe_harm' | 'death';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  location: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo?: string;
  category: 'medication_error' | 'adverse_drug_reaction' | 'medication_omission' | 'wrong_dose' | 'wrong_drug' | 'wrong_patient' | 'wrong_route' | 'wrong_time' | 'prescribing_error' | 'dispensing_error' | 'administration_error';
  tags: string[];
  medicationName?: string;
  medicationClass?: string;
  patientAge?: number;
  patientGender?: 'male' | 'female' | 'other';
  harmLevel: 'no_harm' | 'minor_harm' | 'moderate_harm' | 'severe_harm' | 'death';
  contributingFactors: string[];
  preventability: 'preventable' | 'probably_preventable' | 'probably_not_preventable' | 'not_preventable';
}

export interface Report {
  id: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'custom';
  generatedAt: string;
  generatedBy: string;
  data: any;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: string;
  read: boolean;
}