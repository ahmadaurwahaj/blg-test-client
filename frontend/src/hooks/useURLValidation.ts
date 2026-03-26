import { useState, useCallback } from 'react';

interface URLValidationResult {
  url: string;
  normalizedUrl: string;
  isValid: boolean;
  error: string | null;
  setUrl: (url: string) => void;
  validate: () => boolean;
  reset: () => void;
}

export function useURLValidation(): URLValidationResult {
  const [url, setUrl] = useState('');
  const [normalizedUrl, setNormalizedUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizeURL = useCallback((inputUrl: string): string => {
    let normalized = inputUrl.trim().toLowerCase();
    

    normalized = normalized.replace(/\/$/, '');
    

    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    
    return normalized;
  }, []);

  const validate = useCallback((): boolean => {
    if (!url.trim()) {
      setError('Please enter a website URL');
      setIsValid(false);
      return false;
    }

    try {
      const normalized = normalizeURL(url);
      const urlObj = new URL(normalized);
      
 
      if (!urlObj.hostname.includes('.')) {
        setError('Please enter a valid domain (e.g., example.com)');
        setIsValid(false);
        return false;
      }

      setNormalizedUrl(normalized);
      setError(null);
      setIsValid(true);
      return true;
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      setIsValid(false);
      return false;
    }
  }, [url, normalizeURL]);

  const reset = useCallback(() => {
    setUrl('');
    setNormalizedUrl('');
    setIsValid(false);
    setError(null);
  }, []);

  const handleSetUrl = useCallback((newUrl: string) => {
    setUrl(newUrl);
    setError(null);
    setIsValid(false);
  }, []);

  return {
    url,
    normalizedUrl,
    isValid,
    error,
    setUrl: handleSetUrl,
    validate,
    reset,
  };
}
