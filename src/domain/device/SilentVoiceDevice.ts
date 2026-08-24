import type { DeviceConnectionState } from './device.types';

/** Boundary between application code and any physical or mock device adapter. */
export interface SilentVoiceDevice {
  getConnectionState(): DeviceConnectionState;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  startSession(): Promise<void>;
  stopSession(): Promise<void>;
}
