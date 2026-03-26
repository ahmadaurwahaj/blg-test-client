import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { TooltipProvider } from '@/components/ui/tooltip';

export function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (url: string) => {
    console.log('Analyzing URL:', url);
    setIsAnalyzing(true);
    
    // Simulate analysis (will be replaced with actual API call)
    setTimeout(() => {
      setIsAnalyzing(false);
      // TODO: Navigate to results page
    }, 2000);
  };

  return (
    <TooltipProvider>
      <AppLayout>
        <LandingPage onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
      </AppLayout>
    </TooltipProvider>
  );
}

export default App;
