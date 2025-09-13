// Centralized API Management
import { ApiClient } from './client';
import { AuthAPI } from './auth';
import { UserAPI } from './user';
import { VendorAPI } from './vendor';
import { MediaAPI } from './media';
import { AdminAPI } from './admin';

// Create main API client instance
const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Export individual API modules
export const authAPI = new AuthAPI(apiClient);
export const userAPI = new UserAPI(apiClient);
export const vendorAPI = new VendorAPI(apiClient);
export const mediaAPI = new MediaAPI(apiClient);
export const adminAPI = new AdminAPI(apiClient);

// Export the main client for custom requests
export { apiClient };

// Export all APIs as a single object for convenience
export const api = {
  auth: authAPI,
  user: userAPI,
  vendor: vendorAPI,
  media: mediaAPI,
  admin: adminAPI,
};

// Export types
export type { ApiClient } from './client';
export type { AuthAPI } from './auth';
export type { UserAPI } from './user';
export type { VendorAPI } from './vendor';
export type { MediaAPI } from './media';
export type { AdminAPI } from './admin';
