import ky from 'ky';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export const api = ky.create({
  prefixUrl: API_BASE,
  credentials: 'include', // if your Spring Boot sets HttpOnly cookies
  hooks: {
    beforeRequest: [
      request => {
        // Example: attach bearer token later if you store it in localStorage (not recommended) or cookies
        // const token = localStorage.getItem('token');
        // if (token) request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});

// Easy wrappers
export const postJson = <T>(url: string, json: unknown) =>
  api.post(url, { json }).json<T>();
export const getJson = <T>(url: string) =>
  api.get(url).json<T>();
