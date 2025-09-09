// src/lib/api.ts
import ky from 'ky';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', // Nest API URL
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const postJson = <T>(url: string, json?: any, jwt?: string) =>
  api.post(url, { 
    json,
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined 
  }).json<T>();

export const getJson = <T>(url: string, jwt?: string) =>
  api.get(url, {
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined
  }).json<T>();

export default api;

// --- AUTH ---
export const sendOtp = (payload: { email?: string; phone?: string; mode: 'login' | 'signup' }) =>
  postJson<{ success: boolean; message: string }>('auth/send-otp', payload);

export const verifyOtp = (payload: { email?: string; phone?: string; otp: string; mode: 'login' | 'signup'; name?: string }) =>
  postJson<{ success: boolean; message: string; access_token?: string }>('auth/verify-otp', payload);

export const loginOtp = (email: string, otp: string) =>
  postJson<{ access_token: string }>('auth/login-otp', { email, otp });

export const loginSocial = (provider: string, token: string) =>
  postJson<{ access_token: string }>('auth/login-social', { provider, token });

export const validateToken = (token: string) =>
  postJson<any>('auth/validate', { token });

export const logout = (jwt: string) =>
  api.post('auth/logout', { headers: { Authorization: `Bearer ${jwt}` } }).json<{ success: boolean }>();

// --- AUTHORIZATION ---
export const checkAccess = (userId: string | number, resourceId: string | number, jwt: string) =>
  api.get(`auth/authorize/${userId}/${resourceId}`, { headers: { Authorization: `Bearer ${jwt}` } }).json<{ result: string }>();

// --- USER ---
export const createUser = (data: any, jwt?: string) =>
  api.post('user', { json: data, headers: jwt ? { Authorization: `Bearer ${jwt}` } : {} }).json<any>();

export const listUsers = (jwt: string) =>
  api.get('users', { headers: { Authorization: `Bearer ${jwt}` } }).json<any[]>();

export const getUser = (id: string | number, jwt: string) =>
  api.get(`users/${id}`, { headers: { Authorization: `Bearer ${jwt}` } }).json<any>();

export const sendVerificationOtp = (type: 'email' | 'phone', jwt: string) =>
  postJson<{ success: boolean; message: string }>('user/verify/send-otp', { type }, jwt);

export const verifyContact = (payload: { email?: string; phone?: string; otp: string }, jwt: string) =>
  postJson<{ success: boolean; message: string }>('user/verify/confirm', payload, jwt);

export const searchUsers = (query: any, jwt: string) =>
  postJson<any[]>('users/search', query);

export const updateUser = (id: string | number, data: any, jwt: string) =>
  api.put(`users/${id}`, { json: data, headers: { Authorization: `Bearer ${jwt}` } }).json<any>();

export const deleteUser = (id: string | number, jwt: string) =>
  api.delete(`users/${id}`, { headers: { Authorization: `Bearer ${jwt}` } }).json<any>();

// --- VENDOR ---
export const createVendor = (data: any, jwt?: string) =>
  api.post('vendor', { json: data, headers: jwt ? { Authorization: `Bearer ${jwt}` } : {} }).json<any>();

export const getVendor = (id: string | number, jwt: string) =>
  api.get(`vendor/${id}`, { headers: { Authorization: `Bearer ${jwt}` } }).json<any>();

// --- MEDIA ---
export const uploadMedia = (data: any, jwt?: string) =>
  api.post('media/upload', { json: data, headers: jwt ? { Authorization: `Bearer ${jwt}` } : {} }).json<any>();
