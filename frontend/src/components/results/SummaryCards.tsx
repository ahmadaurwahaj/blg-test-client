import { TrendingUp, MessageSquare, Building2, Link, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { APIAnalysisResponse, CombinedAPIResponse } from '@/types';

interface SummaryCardsProps {
  apiResponse: APIAnalysisResponse;
  comparison?: CombinedAPIResponse['comparison'] | null;
  targetBrand: string;
}

export function SummaryCards({ apiResponse, targetBrand }: SummaryCardsProps) {
  const getTrendColor = (value: number) => {
    if (value >= 60) return 'text-emerald-600 dark:text-emerald-400';
    if (value >= 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendBgColor = (value: number) => {
    if (value >= 60) return 'bg-emerald-500';
    if (value >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const targetBrandRank = apiResponse.brandRanking.findIndex(b => b.name === targetBrand) + 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Visibility Score</h3>
          <div className={`p-3 rounded-lg ${getTrendBgColor(apiResponse.visibilityScore)}`}>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className={`text-4xl font-bold ${getTrendColor(apiResponse.visibilityScore)}`}>
            {apiResponse.visibilityScore.toFixed(1)}%
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overall brand visibility
          </p>
        </div>
      </Card>

      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Market Share</h3>
          <div className="p-3 rounded-lg bg-blue-500">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            {apiResponse.marketShare.toFixed(1)}%
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Of all brand mentions
          </p>
        </div>
      </Card>

      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Brand Ranking</h3>
          <div className="p-3 rounded-lg bg-purple-500">
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            #{targetBrandRank}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Out of {apiResponse.brandRanking.length} brands
          </p>
        </div>
      </Card>


      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Prompts Analyzed</h3>
          <div className="p-3 rounded-lg bg-cyan-500">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{apiResponse.totalPrompts}</div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Across buying journey</p>
        </div>
      </Card>

      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Brand Mentions</h3>
          <div className="p-3 rounded-lg bg-emerald-500">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{apiResponse.promptsWithBrand}</div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Prompts mentioning your brand
          </p>
        </div>
      </Card>


      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Citation Sources</h3>
          <div className="p-3 rounded-lg bg-pink-500">
            <Link className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{apiResponse.citationDomains.length}</div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Unique domains cited</p>
        </div>
      </Card>
    </div>
  );
}
