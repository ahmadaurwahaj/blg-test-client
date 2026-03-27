import { useMemo } from 'react';
import type { CombinedAPIResponse, AnalysisResults, APIPromptResult } from '@/types';


export function useDataTransform(
  apiData: CombinedAPIResponse | null,
  targetUrl: string
): AnalysisResults | null {
  return useMemo(() => {
    if (!apiData) return null;

    
    const targetBrand = extractBrandFromUrl(targetUrl);

    const targetBrandData = apiData.combinedBrandRanking.find(
      (b) => b.name.toLowerCase() === targetBrand.toLowerCase()
    );

    return {
      targetUrl,
      targetBrand: targetBrandData?.name || targetBrand,
      apiResponse: {
        visibilityScore: apiData.overallVisibilityScore,
        marketShare: targetBrandData?.share || 0,
        totalPrompts: apiData.totalPromptsAnalyzed,
        promptsWithBrand: countPromptsWithBrand(apiData, targetBrand),
        brandRanking: apiData.combinedBrandRanking,
        citationDomains: apiData.combinedCitationDomains,
        perPromptResults: mergePromptResults(apiData)
      }
    };
  }, [apiData, targetUrl]);
}


function extractBrandFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
  
    const domain = hostname.replace(/^www\./, '');
    

    const parts = domain.split('.');
    const brandPart = parts.length > 1 ? parts[parts.length - 2] : parts[0];

    return brandPart.charAt(0).toUpperCase() + brandPart.slice(1);
  } catch {
    return 'Your Brand';
  }
}


function countPromptsWithBrand(data: CombinedAPIResponse, _targetBrand: string): number {
  const geminiCount = data.gemini.promptsWithBrand;
  const chatgptCount = data.chatgpt.promptsWithBrand;
  return geminiCount + chatgptCount;
}


function mergePromptResults(data: CombinedAPIResponse): APIPromptResult[] {
  const allResults = [
    ...data.gemini.perPromptResults,
    ...data.chatgpt.perPromptResults
  ];


  const grouped = allResults.reduce((acc, result) => {
    if (!acc[result.query]) {
      acc[result.query] = result;
    } else {

      acc[result.query].citations = [
        ...acc[result.query].citations,
        ...result.citations
      ];
      acc[result.query].brands = mergeBrands(
        acc[result.query].brands,
        result.brands
      );
    }
    return acc;
  }, {} as Record<string, APIPromptResult>);

  return Object.values(grouped);
}


function mergeBrands(
  brands1: any[],
  brands2: any[]
): any[] {
  const brandMap = new Map();

  [...brands1, ...brands2].forEach((brand) => {
    if (brandMap.has(brand.name)) {
      const existing = brandMap.get(brand.name);
      existing.mentions += brand.mentions;
    } else {
      brandMap.set(brand.name, { ...brand });
    }
  });

  return Array.from(brandMap.values());
}
