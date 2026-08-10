import { apiGet } from './apiClient';
import type { Company } from '../types/api.types';

export function getCompany(): Promise<Company> {
  return apiGet<Company>('/company');
}
