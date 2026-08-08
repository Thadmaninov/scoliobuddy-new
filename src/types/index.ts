export type SpineRegion = 'cervical' | 'thoracic' | 'lumbar';

export interface Measurement {
  id: string;
  date: string;
  angle: number;
  /**
   * Human-readable label captured at save time. Kept for records written
   * before `locationKey` existed — prefer `locationKey` when present so the
   * label follows the active language.
   */
  location: string;
  locationKey?: SpineRegion;
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
