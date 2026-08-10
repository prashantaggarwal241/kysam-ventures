import { apiPost } from './apiClient';
import type { EnquiryCreateRequest, EnquiryResponse } from '../types/api.types';

export function submitEnquiry(data: EnquiryCreateRequest): Promise<EnquiryResponse> {
  return apiPost<EnquiryResponse>('/enquiries', data);
}
