import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { TooltipProvider } from '@/components/ui/tooltip';

type AppState = 'landing' | 'analyzing' | 'results';

export function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [analyzingUrl, setAnalyzingUrl] = useState('');

  const handleAnalyze = (url: string) => {
    console.log('Analyzing URL:', url);
    setAnalyzingUrl(url);
    setAppState('analyzing');
  };

  const handleAnalysisComplete = () => {
    console.log('Analysis complete');
    setAppState('results');
    // TODO: Navigate to results page
  };

  return (
    <TooltipProvider>
      {appState === 'analyzing' ? (
        <AnalysisPage url={analyzingUrl} onComplete={handleAnalysisComplete} />
      ) : (
        <AppLayout>
          <LandingPage onAnalyze={handleAnalyze} isLoading={false} />
        </AppLayout>
      )}
    </TooltipProvider>
  );
}

export default App;
