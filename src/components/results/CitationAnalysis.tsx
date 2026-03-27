import { ExternalLink, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { APICitationDomain } from '@/types';

interface CitationAnalysisProps {
  citationDomains: APICitationDomain[];
}

export function CitationAnalysis({ citationDomains }: CitationAnalysisProps) {
  const maxCount = Math.max(...citationDomains.map(c => c.count), 1);

  return (
    <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Citation Sources</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Domains that AI models used as sources
        </p>
      </div>

      {citationDomains.length === 0 ? (
        <div className="text-center py-8">
          <Globe className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No citations found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {citationDomains.map((citation) => (
            <div 
              key={citation.domain} 
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {citation.domain}
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(citation.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 w-8 text-right">
                  {citation.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
