export type GFXStatus = 
  | 'not_started'
  | 'queued'
  | 'generating'
  | 'completed'
  | 'failed'
  | 'needs_review'
  | 'approved'
  | 'rejected'
  | 'delivered';

export type SubStageStatus = 'completed' | 'in_progress' | 'pending';

export interface SubStage {
  name: string;
  status: SubStageStatus;
}

export interface Language {
  code: string;
  name: string;
  subStages: SubStage[];
  gfxStatus: GFXStatus;
  gfxCardUrl?: string;
  gfxPrompt?: string;
  errorMessage?: string;
}

export interface GFXCard {
  id: string;
  languageCode: string;
  languageName: string;
  status: GFXStatus;
  imageUrl: string; // Video URL for motion clip
  prompt: string;
  errorMessage?: string;
  generatedAt?: Date;
}

export interface Campaign {
  id: string;
  name: string;
  languages: Language[];
}
