import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAnalysis } from '@/hooks/api/useAnalysis';
import { useDataTransform } from '@/hooks/data/useDataTransform';
import { useErrorHandler } from '@/hooks/ui/useErrorHandler';

type AppState = 'landing' | 'analyzing' | 'results' | 'error';

export function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [analyzingUrl, setAnalyzingUrl] = useState('');


  const {
    isAnalyzing,
    progress,
    currentStage,
    data,
    error,
    errorCode,
    startAnalysis,
    resetAnalysis
  } = useAnalysis();

  const transformedData = useDataTransform(data, analyzingUrl);
  const errorInfo = useErrorHandler(error, errorCode);

  const handleAnalyze = (url: string) => {
    console.log('Analyzing URL:', url);
    setAnalyzingUrl(url);
    setAppState('analyzing');
    startAnalysis(url);
  };

  const handleBack = () => {
    resetAnalysis();
    setAppState('landing');
    setAnalyzingUrl('');
  };

  const handleRetry = () => {
    if (analyzingUrl) {
      handleAnalyze(analyzingUrl);
    }
  };


  useEffect(() => {
    if (data && !error) {
      setAppState('results');
    } else if (error) {
      setAppState('error');
    }
  }, [data, error]);

  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route
            path="/free-tools/llm-analysis"
            element={
              appState === 'analyzing' ? (
                <AnalysisPage
                  url={analyzingUrl}
                  currentStage={currentStage}
                  progress={progress}
                />
              ) : appState === 'results' && transformedData ? (
                <ResultsPage
                  results={transformedData}
                  combinedData={data}
                  onBack={handleBack}
                />
              ) : appState === 'error' && errorInfo ? (
                <AppLayout>
                  <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                      <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {errorInfo.type === 'rate_limit'
                            ? 'Analysis Limit Reached'
                            : errorInfo.type === 'validation'
                            ? 'Invalid URL'
                            : errorInfo.type === 'network'
                            ? 'Connection Failed'
                            : 'Analysis Failed'}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                          {errorInfo.userMessage}
                        </p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={handleBack}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Go Back
                          </button>
                          {errorInfo.retryable && (
                            <button
                              onClick={handleRetry}
                              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
                            >
                              {errorInfo.actionLabel || 'Try Again'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AppLayout>
              ) : (
                <AppLayout>
                  <LandingPage onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
                </AppLayout>
              )
            }
          />
          <Route path="*" element={<Navigate to="/free-tools/llm-analysis" replace />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
