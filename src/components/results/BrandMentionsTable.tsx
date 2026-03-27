import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { APIBrandRanking } from '@/types';

interface BrandMentionsTableProps {
  brandRanking: APIBrandRanking[];
  targetBrand: string;
  visibilityScore: number;
}

export function BrandMentionsTable({ brandRanking, targetBrand, visibilityScore }: BrandMentionsTableProps) {
  const [showAll, setShowAll] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  
  const targetBrandRank = brandRanking.findIndex(b => b.name === targetBrand) + 1;

  const displayedBrands = showAll ? brandRanking : brandRanking.slice(0, 5);
  const maxMentions = Math.max(...brandRanking.map(b => b.mentions));

  const colorPalette = [
    '#f97316', // orange-500 (target brand)
    '#10b981', // emerald-500
    '#3b82f6', // blue-500
    '#a855f7', // purple-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#14b8a6', // teal-500
    '#f43f5e', // rose-500
    '#6366f1', // indigo-500
    '#84cc16', // lime-500
    '#22c55e', // green-500
    '#eab308', // yellow-500
    '#fb923c', // orange-400
    '#38bdf8', // sky-500
    '#c084fc', // purple-400
    '#fb7185', // rose-400
    '#4ade80', // green-400
  ];

  const tailwindColors = [
    'bg-orange-500',
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-red-500',
    'bg-violet-500',
    'bg-teal-500',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-orange-400',
    'bg-sky-500',
    'bg-purple-400',
    'bg-rose-400',
    'bg-green-400',
  ];


  const getBrandColorHex = (brandName: string) => {
    const index = brandRanking.findIndex(b => b.name === brandName);
    return colorPalette[index % colorPalette.length];
  };

  const getBrandColor = (brandName: string) => {
    const index = brandRanking.findIndex(b => b.name === brandName);
    return tailwindColors[index % tailwindColors.length];
  };


  const circumference = 2 * Math.PI * 54;
  

  let currentOffset = 0;
  
  const segments = brandRanking.map((brand) => {
    const percentage = brand.share;
    const segmentLength = (percentage / 100) * circumference;
    const segment = {
      brand: brand.name,
      color: getBrandColorHex(brand.name),
      dashArray: `${segmentLength} ${circumference}`,
      dashOffset: -currentOffset
    };
    currentOffset += segmentLength;
    return segment;
  });

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
        

        <div className="relative w-32 h-32 group">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {segments.map((segment, index) => (
              <circle
                key={index}
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={segment.color}
                strokeWidth="12"
                strokeLinecap="butt"
                strokeDasharray={segment.dashArray}
                strokeDashoffset={segment.dashOffset}
                style={{ 
                  transition: 'stroke-dasharray 0.6s ease-in-out, stroke-dashoffset 0.6s ease-in-out',
                  cursor: 'pointer',
                  opacity: hoveredBrand === null || hoveredBrand === segment.brand ? 1 : 0.5
                }}
                onMouseEnter={() => setHoveredBrand(segment.brand)}
                onMouseLeave={() => setHoveredBrand(null)}
              />
            ))}
          </svg>
          

          {hoveredBrand && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <div className="bg-slate-900 dark:bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg text-center min-w-[120px]">
                <div className="text-xs font-medium mb-1 truncate max-w-[150px]">
                  {hoveredBrand === targetBrand ? 'Your Brand' : hoveredBrand}
                </div>
                <div className="text-lg font-bold">
                  {brandRanking.find(b => b.name === hoveredBrand)?.share.toFixed(1)}%
                </div>
              </div>
            </div>
          )}
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
          {displayedBrands.map((brand) => {
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
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show All {brandRanking.length} Brands
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  );
}
