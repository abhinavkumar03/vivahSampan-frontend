import { TokenService } from '../auth/token-service';
import { ApiClient } from './client';
import { AuthResponse, OtpRequest, OtpVerifyRequest, SocialLoginRequest } from '@/types/api';

export class AuthAPI {
  constructor(private client: ApiClient) {}

  async validateToken(token: string): Promise<{ valid: boolean; user?: any }> {
    return this.client.post('/auth/validate-token', { token });
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    return this.client.post('/auth/refresh-token', { token });
  }

  async logout(): Promise<{ success: boolean }> {
    const token = TokenService.getToken();
    return this.client.post('/auth/logout', { token });
  }

  async login(data: { identifier: string; otp?: string; mode: 'email' | 'mobile' }): Promise<AuthResponse> {
    return this.client.post('/auth/login', data);
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'USER' | 'ADMIN';
  }): Promise<AuthResponse> {
    return this.client.post('/auth/register', data);
  }

  async sendOtp(data: OtpRequest): Promise<{ success: boolean; message: string }> {
    return this.client.post('/auth/send-otp', data);
  }

  async verifyOtp(data: OtpVerifyRequest): Promise<{ success: boolean; message: string }> {
    return this.client.post('/auth/verify-otp', data);
  }

  async socialLogin(data: SocialLoginRequest): Promise<AuthResponse> {
    return this.client.post('/auth/social-login', data);
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    return this.client.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
    return this.client.post('/auth/reset-password', { token, password });
  }
}
