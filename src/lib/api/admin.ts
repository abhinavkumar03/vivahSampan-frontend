import { ApiClient } from './client';

export interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalEvents: number;
  totalRevenue: number;
  userGrowth: number;
  vendorGrowth: number;
  revenueGrowth: number;
}

export interface RecentActivity {
  id: string;
  type: 'user_registered' | 'vendor_added' | 'event_created' | 'payment_received';
  description: string;
  timestamp: string;
  userId?: string;
  vendorId?: string;
  eventId?: string;
}

export interface TopVendor {
  id: string;
  name: string;
  category: string;
  revenue: number;
  rating: number;
  bookings: number;
}

export class AdminAPI {
  constructor(private client: ApiClient) {}

  async getDashboardStats(): Promise<DashboardStats> {
    return this.client.get('admin/dashboard/stats');
  }

  async getRecentActivity(params?: {
    limit?: number;
    type?: string;
  }): Promise<RecentActivity[]> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.type) queryParams.append('type', params.type);

    const query = queryParams.toString();
    return this.client.get(`admin/activity${query ? `?${query}` : ''}`);
  }

  async getTopVendors(params?: {
    limit?: number;
    period?: 'week' | 'month' | 'year';
  }): Promise<TopVendor[]> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.period) queryParams.append('period', params.period);

    const query = queryParams.toString();
    return this.client.get(`admin/vendors/top${query ? `?${query}` : ''}`);
  }

  async getUserStats(): Promise<{
    total: number;
    active: number;
    pending: number;
    blocked: number;
    growth: number;
  }> {
    return this.client.get('admin/users/stats');
  }

  async getVendorStats(): Promise<{
    total: number;
    active: number;
    pending: number;
    suspended: number;
    growth: number;
  }> {
    return this.client.get('admin/vendors/stats');
  }

  async getRevenueStats(params?: {
    period?: 'week' | 'month' | 'year';
  }): Promise<{
    total: number;
    growth: number;
    breakdown: {
      commission: number;
      subscription: number;
      advertising: number;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.append('period', params.period);

    const query = queryParams.toString();
    return this.client.get(`admin/revenue/stats${query ? `?${query}` : ''}`);
  }

  async getEventStats(): Promise<{
    total: number;
    completed: number;
    upcoming: number;
    cancelled: number;
  }> {
    return this.client.get('admin/events/stats');
  }

  async getSystemHealth(): Promise<{
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    responseTime: number;
    errorRate: number;
    lastBackup: string;
  }> {
    return this.client.get('admin/system/health');
  }

  async getReports(params?: {
    type: 'users' | 'vendors' | 'events' | 'revenue';
    period: 'week' | 'month' | 'year';
    format?: 'json' | 'csv' | 'pdf';
  }): Promise<any> {
    return this.client.post('admin/reports', params);
  }

  async exportData(params: {
    type: 'users' | 'vendors' | 'events' | 'transactions';
    format: 'csv' | 'xlsx';
    filters?: Record<string, any>;
  }): Promise<Blob> {
    const response = await fetch(`${this.client['baseURL']}/admin/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.client['getAuthHeaders'](),
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }

  async getSettings(): Promise<Record<string, any>> {
    return this.client.get('admin/settings');
  }

  async updateSettings(settings: Record<string, any>): Promise<{ success: boolean }> {
    return this.client.put('admin/settings', settings);
  }

  async sendBulkNotification(data: {
    type: 'email' | 'sms' | 'push';
    recipients: string[];
    subject?: string;
    message: string;
  }): Promise<{ success: boolean; sent: number; failed: number }> {
    return this.client.post('admin/notifications/bulk', data);
  }
}
