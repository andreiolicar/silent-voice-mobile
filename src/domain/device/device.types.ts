export const deviceConnectionStates = [
  'idle',
  'scanning',
  'discovered',
  'connecting',
  'connected',
  'disconnected',
  'failed',
] as const;

export type DeviceConnectionState = (typeof deviceConnectionStates)[number];

export const sessionStates = [
  'idle',
  'arming',
  'listening',
  'candidate',
  'validating',
  'confirmed',
  'rejected',
  'speaking',
  'error',
] as const;

export type SessionState = (typeof sessionStates)[number];
