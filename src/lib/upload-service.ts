// Types for file upload
export interface UploadProgress {
  progress: number;
  uploaded: boolean;
  error?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class FileUploadService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/quicktime'
  ];

  static validateFile(file: File): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'File type not supported' };
    }

    return { valid: true };
  }

  static async uploadFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload to your backend/cloud storage
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // Add any required headers (e.g., authorization)
          ...this.getAuthHeaders(),
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return {
        success: true,
        url: data.url
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  private static getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Helper method to create an image preview
  static createPreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Not an image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}
