import { useState, useMemo, useCallback } from 'react';
import type { CombinedAPIResponse, APIAnalysisResponse, LLMView, LLMAnalysisData } from '@/types';

interface UseLLMComparisonReturn {
  selectedView: LLMView;
  viewData: APIAnalysisResponse | null;
  comparison: CombinedAPIResponse['comparison'] | null;
  switchView: (view: LLMView) => void;
}


export function useLLMComparison(
  combinedData: CombinedAPIResponse | null
): UseLLMComparisonReturn {
  const [selectedView, setSelectedView] = useState<LLMView>('combined');

  const viewData = useMemo((): APIAnalysisResponse | null => {
    if (!combinedData) return null;

    switch (selectedView) {
      case 'gemini':
        return transformLLMData(combinedData.gemini);
      
      case 'chatgpt':
        return transformLLMData(combinedData.chatgpt);
      
      case 'combined':
      default:
        return {
          visibilityScore: combinedData.overallVisibilityScore,
          marketShare: calculateCombinedMarketShare(combinedData),
          totalPrompts: combinedData.totalPromptsAnalyzed,
          promptsWithBrand:
            combinedData.gemini.promptsWithBrand +
            combinedData.chatgpt.promptsWithBrand,
          brandRanking: combinedData.combinedBrandRanking,
          citationDomains: combinedData.combinedCitationDomains,
          perPromptResults: [
            ...combinedData.gemini.perPromptResults,
            ...combinedData.chatgpt.perPromptResults
          ]
        };
    }
  }, [combinedData, selectedView]);

  const comparison = useMemo(() => {
    return combinedData?.comparison || null;
  }, [combinedData]);

  const switchView = useCallback((view: LLMView) => {
    setSelectedView(view);
  }, []);

  return {
    selectedView,
    viewData,
    comparison,
    switchView
  };
}


function transformLLMData(llmData: LLMAnalysisData): APIAnalysisResponse {
  return {
    visibilityScore: llmData.visibilityScore,
    marketShare: llmData.marketShare,
    totalPrompts: llmData.totalPrompts,
    promptsWithBrand: llmData.promptsWithBrand,
    brandRanking: llmData.brandRanking,
    citationDomains: llmData.citationDomains,
    perPromptResults: llmData.perPromptResults
  };
}


function calculateCombinedMarketShare(data: CombinedAPIResponse): number {
  return (data.gemini.marketShare + data.chatgpt.marketShare) / 2;
}
