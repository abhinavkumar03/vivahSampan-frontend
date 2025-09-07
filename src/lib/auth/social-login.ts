import { TokenService } from './token-service';

// Social login configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

interface SocialLoginResponse {
  success: boolean;
  error?: string;
  token?: string;
}

export class SocialLoginService {
  static async initializeGoogleLogin(): Promise<void> {
    // Load Google SDK
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);
  }

  static async initializeFacebookLogin(): Promise<void> {
    // Load Facebook SDK
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    document.body.appendChild(script);

    window.fbAsyncInit = function() {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
    };
  }

  static async handleGoogleLogin(): Promise<SocialLoginResponse> {
    try {
      // Initialize Google Sign-In
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response: any) => {
          if (response.error) return {
            success: false,
            error: response.error
          };

          // Send token to backend
          const result = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.access_token })
          });

          const data = await result.json();
          if (data.access_token) {
            TokenService.setToken(data.access_token);
            return { success: true, token: data.access_token };
          }

          return {
            success: false,
            error: 'Failed to authenticate with Google'
          };
        }
      });

      client.requestAccessToken();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to initialize Google login'
      };
    }
  }

  static async handleFacebookLogin(): Promise<SocialLoginResponse> {
    return new Promise((resolve) => {
      FB.login(async function(response) {
        if (response.authResponse) {
          try {
            // Send token to backend
            const result = await fetch('/api/auth/facebook', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                token: response.authResponse.accessToken 
              })
            });

            const data = await result.json();
            if (data.access_token) {
              TokenService.setToken(data.access_token);
              resolve({ success: true, token: data.access_token });
            } else {
              resolve({
                success: false,
                error: 'Failed to authenticate with backend'
              });
            }
          } catch (error) {
            resolve({
              success: false,
              error: 'Failed to process Facebook login'
            });
          }
        } else {
          resolve({
            success: false,
            error: 'Facebook login cancelled or failed'
          });
        }
      }, { scope: 'email,public_profile' });
    });
  }
}
