export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: number;
  name: string;
  category: string;
  profile: {
    bio: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: number;
  vendorId: number;
  type: string;
  url: string;
  metadata: {
    caption?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest extends OtpRequest {
  otp: string;
}

export interface SocialLoginRequest {
  provider: 'google' | 'facebook';
  token: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'USER' | 'ADMIN';
}

export interface CreateVendorRequest {
  name: string;
  category: string;
  profile: {
    bio: string;
    [key: string]: any;
  };
}

export interface CreateMediaRequest {
  vendorId: number;
  type: string;
  url: string;
  metadata: {
    caption?: string;
    [key: string]: any;
  };
}
