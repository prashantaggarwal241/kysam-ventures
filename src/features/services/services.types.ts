import type { Service } from '../../types/api.types';

export interface ServicesState {
  items: Service[];
  loading: boolean;
  error: string | null;
}
