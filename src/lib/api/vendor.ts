import { ApiClient } from './client';
import { Vendor, CreateVendorRequest } from '@/types/api';

export class VendorAPI {
  constructor(private client: ApiClient) {}

  async createVendor(data: CreateVendorRequest): Promise<Vendor> {
    return this.client.post('vendor', data);
  }

  async getVendors(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    location?: string;
  }): Promise<{
    vendors: Vendor[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.location) queryParams.append('location', params.location);

    const query = queryParams.toString();
    return this.client.get(`vendors${query ? `?${query}` : ''}`);
  }

  async getVendor(id: string | number): Promise<Vendor> {
    return this.client.get(`vendor/${id}`);
  }

  async updateVendor(id: string | number, data: Partial<Vendor>): Promise<Vendor> {
    return this.client.put(`vendor/${id}`, data);
  }

  async deleteVendor(id: string | number): Promise<{ success: boolean }> {
    return this.client.delete(`vendor/${id}`);
  }

  async searchVendors(query: string, filters?: {
    category?: string;
    location?: string;
    priceRange?: { min: number; max: number };
  }): Promise<Vendor[]> {
    return this.client.post('vendors/search', { query, filters });
  }

  async getVendorCategories(): Promise<string[]> {
    return this.client.get('vendors/categories');
  }

  async approveVendor(id: string | number): Promise<{ success: boolean }> {
    return this.client.patch(`vendor/${id}/approve`);
  }

  async rejectVendor(id: string | number, reason?: string): Promise<{ success: boolean }> {
    return this.client.patch(`vendor/${id}/reject`, { reason });
  }

  async suspendVendor(id: string | number, reason?: string): Promise<{ success: boolean }> {
    return this.client.patch(`vendor/${id}/suspend`, { reason });
  }

  async activateVendor(id: string | number): Promise<{ success: boolean }> {
    return this.client.patch(`vendor/${id}/activate`);
  }

  async getVendorReviews(id: string | number, params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    reviews: any[];
    total: number;
    averageRating: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return this.client.get(`vendor/${id}/reviews${query ? `?${query}` : ''}`);
  }

  async getVendorStats(id: string | number): Promise<{
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    completedEvents: number;
  }> {
    return this.client.get(`vendor/${id}/stats`);
  }
}
