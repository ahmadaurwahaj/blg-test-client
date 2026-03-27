import { AnalysisLoader } from '@/components/analysis/AnalysisLoader';
import type { AnalysisStage } from '@/types';

interface AnalysisPageProps {
  url: string;
  currentStage: AnalysisStage | null;
  progress: number;
}

export function AnalysisPage({ url, currentStage, progress }: AnalysisPageProps) {
  return <AnalysisLoader url={url} currentStage={currentStage} progress={progress} />;
}
