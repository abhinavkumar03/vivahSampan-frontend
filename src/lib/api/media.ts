import { ApiClient } from './client';
import { Media, CreateMediaRequest } from '@/types/api';

export class MediaAPI {
  constructor(private client: ApiClient) {}

  async uploadMedia(file: File, metadata?: {
    caption?: string;
    vendorId?: number;
    type?: string;
  }): Promise<Media> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
    }

    return this.client.uploadFile<Media>('media/upload', file);
  }

  async getMedia(params?: {
    page?: number;
    limit?: number;
    vendorId?: number;
    type?: string;
  }): Promise<{
    media: Media[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.vendorId) queryParams.append('vendorId', params.vendorId.toString());
    if (params?.type) queryParams.append('type', params.type);

    const query = queryParams.toString();
    return this.client.get(`media${query ? `?${query}` : ''}`);
  }

  async getMediaItem(id: string | number): Promise<Media> {
    return this.client.get(`media/${id}`);
  }

  async updateMedia(id: string | number, data: Partial<Media>): Promise<Media> {
    return this.client.put(`media/${id}`, data);
  }

  async deleteMedia(id: string | number): Promise<{ success: boolean }> {
    return this.client.delete(`media/${id}`);
  }

  async getVendorMedia(vendorId: string | number, params?: {
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<{
    media: Media[];
    total: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.type) queryParams.append('type', params.type);

    const query = queryParams.toString();
    return this.client.get(`vendors/${vendorId}/media${query ? `?${query}` : ''}`);
  }

  async uploadMultipleFiles(files: File[], metadata?: {
    vendorId?: number;
    type?: string;
  }): Promise<Media[]> {
    const uploadPromises = files.map(file => this.uploadMedia(file, metadata));
    return Promise.all(uploadPromises);
  }

  async getMediaTypes(): Promise<string[]> {
    return this.client.get('media/types');
  }

  async approveMedia(id: string | number): Promise<{ success: boolean }> {
    return this.client.patch(`media/${id}/approve`);
  }

  async rejectMedia(id: string | number, reason?: string): Promise<{ success: boolean }> {
    return this.client.patch(`media/${id}/reject`, { reason });
  }
}
