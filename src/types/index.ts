export interface Measurement {
  id: string;
  date: string;
  angle: number;
  location: string; // e.g., "Thoracic", "Lumbar"
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  profilePicture?: string;
  measurements: Measurement[];
  createdAt: string;
}
