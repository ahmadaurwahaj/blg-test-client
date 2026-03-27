import { useState, useCallback, useRef } from 'react';
import { analyzeWebsite } from '@/services/api';
import type { CombinedAPIResponse, AnalysisStage } from '@/types';

interface UseAnalysisReturn {

  isAnalyzing: boolean;
  progress: number;
  currentStage: AnalysisStage | null;
  data: CombinedAPIResponse | null;
  error: string | null;
  errorCode: number | null;
  

  startAnalysis: (url: string) => void;
  cancelAnalysis: () => void;
  resetAnalysis: () => void;
}



export function useAnalysis(): UseAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<AnalysisStage | null>(null);
  const [data, setData] = useState<CombinedAPIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const startAnalysis = useCallback((url: string) => {
   
    setIsAnalyzing(true);
    setProgress(0);
    setCurrentStage(null);
    setData(null);
    setError(null);
    setErrorCode(null);

    const cleanup = analyzeWebsite(
      url,
  
      (stage: string, progressValue: number) => {
        setCurrentStage(stage);
        setProgress(progressValue);
      },

      (result: CombinedAPIResponse) => {
        setData(result);
        setIsAnalyzing(false);
        setProgress(100);
        setCurrentStage('Analysis complete');
      },
    
      (errorMessage: string, statusCode?: number) => {
        setError(errorMessage);
        setErrorCode(statusCode || null);
        setIsAnalyzing(false);
      }
    );

    cleanupRef.current = cleanup;
  }, []);

  const cancelAnalysis = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    setIsAnalyzing(false);
    setProgress(0);
    setCurrentStage(null);
  }, []);

  const resetAnalysis = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    setIsAnalyzing(false);
    setProgress(0);
    setCurrentStage(null);
    setData(null);
    setError(null);
    setErrorCode(null);
  }, []);

  return {
    isAnalyzing,
    progress,
    currentStage,
    data,
    error,
    errorCode,
    startAnalysis,
    cancelAnalysis,
    resetAnalysis
  };
}
