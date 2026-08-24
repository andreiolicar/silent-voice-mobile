export type LiveSessionPhase =
  | 'idle'
  | 'listening'
  | 'decoding'
  | 'candidate'
  | 'validating'
  | 'confirmed'
  | 'speaking'
  | 'needsRetry'
  | 'error';

export type ValidationLayerState =
  'waiting' | 'validating' | 'approved' | 'rejected' | 'unavailable';

export type ValidationLayer = {
  id: 'neuromuscular' | 'mechanical' | 'visual' | 'contextual' | 'decision';
  label: string;
  state: ValidationLayerState;
};

export type ContextTranscriptEntry = {
  id: string;
  timestamp: number;
  text: string;
};

export type ConfirmedUtterance = {
  id: string;
  timestamp: number;
  text: string;
};

export type LiveSessionState = {
  phase: LiveSessionPhase;
  candidate?: string;
  confidence?: number;
  validationLayers: ValidationLayer[];
  contextWindow: ContextTranscriptEntry[];
  recentConfirmed: ConfirmedUtterance[];
};
