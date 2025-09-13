'use client';

import { useEffect } from 'react';

interface ScriptLoaderProps {
  scripts: string[];
  onLoad?: () => void;
}

export default function ScriptLoader({ scripts, onLoad }: ScriptLoaderProps) {
  useEffect(() => {
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

    const loadAllScripts = async () => {
      try {
        for (const script of scripts) {
          await loadScript(script);
          // Small delay between scripts
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        if (onLoad) {
          onLoad();
        }
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadAllScripts();

    // Cleanup function
    return () => {
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [scripts, onLoad]);

  return null; // This component doesn't render anything
}
