import { useState, useCallback } from 'react';

interface URLValidationResult {
  url: string;
  normalizedUrl: string;
  isValid: boolean;
  error: string | null;
  setUrl: (url: string) => void;
  validate: () => string | null;
  reset: () => void;
}

export function useURLValidation(): URLValidationResult {
  const [url, setUrl] = useState('');
  const [normalizedUrl, setNormalizedUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizeURL = useCallback((inputUrl: string): string => {
    let normalized = inputUrl.trim().toLowerCase();
    

    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    

    try {
      const urlObj = new URL(normalized);
      return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch {
      return normalized.replace(/\/$/, '');
    }
  }, []);

  const validate = useCallback((): string | null => {
    if (!url.trim()) {
      setError('Please enter a website URL');
      setIsValid(false);
      return null;
    }

    try {
      const normalized = normalizeURL(url);
      const urlObj = new URL(normalized);
      
 
      if (!urlObj.hostname.includes('.')) {
        setError('Please enter a valid domain (e.g., example.com)');
        setIsValid(false);
        return null;
      }

      setNormalizedUrl(normalized);
      setError(null);
      setIsValid(true);
      return normalized;
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      setIsValid(false);
      return null;
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
