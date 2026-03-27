import { AnalysisLoader } from '@/components/analysis/AnalysisLoader';

interface AnalysisPageProps {
  url: string;
  onComplete: () => void;
}

export function AnalysisPage({ url, onComplete }: AnalysisPageProps) {
  return <AnalysisLoader url={url} onComplete={onComplete} />;
}
