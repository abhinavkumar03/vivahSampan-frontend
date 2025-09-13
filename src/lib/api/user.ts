import { ApiClient } from './client';
import { User, CreateUserRequest } from '@/types/api';

export class UserAPI {
  constructor(private client: ApiClient) {}

  async createUser(data: CreateUserRequest): Promise<User> {
    return this.client.post('user', data);
  }

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);

    const query = queryParams.toString();
    return this.client.get(`users${query ? `?${query}` : ''}`);
  }

  async getUser(id: string | number): Promise<User> {
    return this.client.get(`users/${id}`);
  }

  async updateUser(id: string | number, data: Partial<User>): Promise<User> {
    return this.client.put(`users/${id}`, data);
  }

  async deleteUser(id: string | number): Promise<{ success: boolean }> {
    return this.client.delete(`users/${id}`);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.client.post('users/search', { query });
  }

  async getUserProfile(): Promise<User> {
    return this.client.get('user/profile');
  }

  async updateUserProfile(data: Partial<User>): Promise<User> {
    return this.client.put('user/profile', data);
  }

  async sendVerificationOtp(type: 'email' | 'phone'): Promise<{ success: boolean; message: string }> {
    return this.client.post('user/verify/send-otp', { type });
  }

  async verifyContact(payload: { email?: string; phone?: string; otp: string }): Promise<{ success: boolean; message: string }> {
    return this.client.post('user/verify/confirm', payload);
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ success: boolean; message: string }> {
    return this.client.post('user/change-password', data);
  }

  async deactivateUser(id: string | number): Promise<{ success: boolean }> {
    return this.client.patch(`users/${id}/deactivate`);
  }

  async activateUser(id: string | number): Promise<{ success: boolean }> {
    return this.client.patch(`users/${id}/activate`);
  }
}
