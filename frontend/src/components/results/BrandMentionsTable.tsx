import { Card } from '@/components/ui/card';
import type { APIBrandRanking } from '@/types';

interface BrandMentionsTableProps {
  brandRanking: APIBrandRanking[];
  targetBrand: string;
}

export function BrandMentionsTable({ brandRanking, targetBrand }: BrandMentionsTableProps) {
  const targetBrandData = brandRanking.find(b => b.name === targetBrand);
  const targetBrandRank = brandRanking.findIndex(b => b.name === targetBrand) + 1;
  const visibilityScore = targetBrandData?.share || 0;

  const topBrands = brandRanking.slice(0, 5);
  const maxMentions = Math.max(...topBrands.map(b => b.mentions));

  const getBrandColor = (brandName: string) => {
    if (brandName === targetBrand) return 'bg-orange-500';
    const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500'];
    const index = brandRanking.findIndex(b => b.name === brandName);
    return colors[index % colors.length];
  };

  return (
    <Card className="p-8 dark:bg-slate-900 dark:border-slate-800">

      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Overall Visibility</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-slate-900 dark:text-slate-100">
              {visibilityScore.toFixed(0)}
            </span>
            <span className="text-2xl text-slate-400 dark:text-slate-500">%</span>
          </div>
        </div>
        

        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-200 dark:text-slate-800"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              className="text-orange-500"
              strokeDasharray={`${(visibilityScore / 100) * 339.292} 339.292`}
              style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
            />
          </svg>
        </div>
      </div>


      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Brand Mentions</h4>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Rank #{targetBrandRank}
          </span>
        </div>


        <div className="space-y-4">
          {topBrands.map((brand) => {
            const isTarget = brand.name === targetBrand;
            return (
              <div key={brand.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isTarget ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {isTarget ? 'Your Brand' : brand.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                      {brand.mentions}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-600">
                      {brand.share.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full ${getBrandColor(brand.name)} rounded-full transition-all duration-500`}
                    style={{ width: `${(brand.mentions / maxMentions) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {brandRanking.length > 5 && (
        <div className="pt-4 border-t dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            +{brandRanking.length - 5} more brands mentioned
          </p>
        </div>
      )}
    </Card>
  );
}
