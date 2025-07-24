export interface DNAFormData {
  audioFile: File | null;
  sensitivity: 'low' | 'medium' | 'high';
  profile: {
    name: string;
    description: string;
    isPublic: boolean;
  };
  tags: string[];
  licenseType: 'free' | 'premium';
}