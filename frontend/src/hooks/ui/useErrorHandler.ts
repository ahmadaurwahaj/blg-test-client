import { useMemo } from 'react';

export type ErrorType = 'rate_limit' | 'network' | 'validation' | 'server' | 'unknown';

interface ErrorInfo {
  message: string;
  type: ErrorType;
  statusCode?: number;
  retryable: boolean;
  userMessage: string;
  actionLabel?: string;
}


export function useErrorHandler(error: string | null, statusCode: number | null): ErrorInfo | null {
  return useMemo(() => {
    if (!error) return null;

    return parseError(error, statusCode ?? undefined);
  }, [error, statusCode]);
}


function parseError(message: string, statusCode?: number): ErrorInfo {

  if (statusCode === 429) {
    return {
      message,
      type: 'rate_limit',
      statusCode,
      retryable: false,
      userMessage: 'You\'ve used all 3 free analyses. Each IP address gets 3 lifetime requests.',
      actionLabel: 'Contact Sales'
    };
  }

  if (statusCode === 400) {
    return {
      message,
      type: 'validation',
      statusCode,
      retryable: false,
      userMessage: 'Invalid URL. Please check the format and try again.',
      actionLabel: 'Go Back'
    };
  }


  if (statusCode === 500) {
    return {
      message,
      type: 'server',
      statusCode,
      retryable: true,
      userMessage: 'Server error. Our team has been notified. Please try again in a few minutes.',
      actionLabel: 'Try Again'
    };
  }


  if (
    message.toLowerCase().includes('network') ||
    message.toLowerCase().includes('connection') ||
    message.toLowerCase().includes('fetch')
  ) {
    return {
      message,
      type: 'network',
      statusCode,
      retryable: true,
      userMessage: 'Connection failed. Please check your internet connection and try again.',
      actionLabel: 'Retry'
    };
  }


  return {
    message,
    type: 'unknown',
    statusCode,
    retryable: true,
    userMessage: message || 'An unexpected error occurred. Please try again.',
    actionLabel: 'Try Again'
  };
}
