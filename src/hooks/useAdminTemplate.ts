'use client';

import { useEffect } from 'react';

export function useAdminTemplate() {
  useEffect(() => {
    // Load admin template JavaScript files
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    // Essential scripts for admin template
    const essentialScripts = [
      '/assets/vendor/libs/jquery/jquery.js',
      '/assets/vendor/libs/popper/popper.js',
      '/assets/vendor/libs/bootstrap/bootstrap.js',
      '/assets/vendor/libs/node-waves/node-waves.js',
      '/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
      '/assets/js/config.js',
      '/assets/js/main.js',
      '/assets/js/ui-menu.js',
      '/assets/js/ui-navbar.js'
    ];

    // Load scripts sequentially
    const loadScripts = async () => {
      try {
        for (const script of essentialScripts) {
          await loadScript(script);
          // Small delay between scripts
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Initialize admin template after all scripts are loaded
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            // Set global variables
            window.isRtl = false;
            window.isDarkStyle = false;
            
            // Initialize Waves
            if (typeof window.Waves !== 'undefined') {
              window.Waves.init();
            }
            
            // Initialize menu
            if (typeof window.Helpers !== 'undefined') {
              window.Helpers.init();
            }
          }
        }, 500);
      } catch (error) {
        console.error('Error loading admin template scripts:', error);
      }
    };

    loadScripts();

    // Cleanup function
    return () => {
      // Remove scripts when component unmounts
      essentialScripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);
}

// Extend Window interface for admin template globals
declare global {
  interface Window {
    isRtl: boolean;
    isDarkStyle: boolean;
    Waves: any;
    Helpers: any;
    config: any;
    dashboardsAnalytics: any;
  }
}
