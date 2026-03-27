import { Check, X, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { APIPromptResult } from '@/types';

interface VisibilityComparisonProps {
  perPromptResults: APIPromptResult[];
}

export function VisibilityComparison({ perPromptResults }: VisibilityComparisonProps) {
  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'awareness':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'consideration':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800';
      case 'decision':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'problem':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
      case 'solution':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };


  const totalPrompts = perPromptResults.length;
  const promptsWithBrand = perPromptResults.filter(r => r.targetBrandFound).length;

  return (
    <Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Prompt Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click any prompt to see detailed AI response, brands mentioned, and citations
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {promptsWithBrand}/{totalPrompts}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              prompts with your brand
            </div>
          </div>
        </div>
      </div>

      <Accordion className="space-y-3">
        {perPromptResults.map((result, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border dark:border-slate-800 rounded-lg overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Badge className={`${getStageColor(result.stage)} shrink-0`}>
                    {result.stage}
                  </Badge>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {result.query}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
             
                  {result.targetBrandFound ? (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-md">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        {result.targetBrandMentions}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                      <X className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
                        Not found
                      </span>
                    </div>
                  )}
            
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{result.brands.length} brands</span>
                    <span>•</span>
                    <span>{result.citations.length} sources</span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
     
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    AI Response
                  </h4>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {result.response}
                    </p>
                  </div>
                </div>

       
                <div className="grid md:grid-cols-2 gap-4">
                  {result.brands.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Brands ({result.brands.length})
                      </h4>
                      <div className="space-y-2">
                        {result.brands.map((brand, brandIndex) => (
                          <div 
                            key={brandIndex}
                            className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {brand.name}
                              </span>
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {brand.mentions}×
                              </span>
                            </div>
                            {brand.context && (
                              <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                                "{brand.context}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.citations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Sources ({result.citations.length})
                      </h4>
                      <div className="space-y-2">
                        {result.citations.map((citation, citationIndex) => (
                          <a
                            key={citationIndex}
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-transparent hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary truncate transition-colors">
                                {citation.title}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {citation.domain}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
