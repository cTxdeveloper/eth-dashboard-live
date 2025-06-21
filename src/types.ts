export type IconName = 'turtle' | 'walk' | 'rocket' | 'refresh' | 'sun' | 'moon' | 'warning';

export interface GasData {
  slow: number;
  average: number;
  fast: number;
}

export interface GasTiers {
  name: string;
  gwei: number;
  icon: IconName;
  description: string;
}