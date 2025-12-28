// TokenService: Handles JWT token management
export class TokenService {
  private static readonly TOKEN_KEY = 'token';

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Basic token validation (check if expired)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}

// AuthHeaders: Utility for API headers
export const getAuthHeaders = () => {
  const token = TokenService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Error handling for auth-related errors
export const handleAuthError = (error: any) => {
  if (error.response?.status === 401) {
    TokenService.removeToken();
    window.location.href = '/login';
  }
  throw error;
};
