import { apiGet } from './apiClient';
import type { Expertise } from '../types/api.types';

export function getExpertise(): Promise<Expertise[]> {
  return apiGet<Expertise[]>('/expertise');
}
