// Core types for the LLM Visibility Analysis Tool

export type BuyingStage = 'awareness' | 'consideration' | 'decision' | 'problem' | 'solution';
export type LLMProvider = 'openai' | 'gemini';
export type RecommendationType = 'article' | 'reddit' | 'medium' | 'wikipedia';
export type Priority = 'high' | 'medium' | 'low';

export interface AnalysisRequest {
  url: string;
  normalizedUrl: string;
  timestamp: Date;
}

export interface GeneratedPrompt {
  id: string;
  stage: BuyingStage;
  text: string;
  description: string;
}

export interface BrandMention {
  name: string;
  count: number;
  percentage: number;
  isTarget: boolean;
}

export interface Citation {
  domain: string;
  url: string;
  title?: string;
  count: number;
}

export interface LLMResponse {
  llm: LLMProvider;
  promptId: string;
  response: string;
  brands: BrandMention[];
  citations: Citation[];
  visibilityScore: number;
}

export interface Recommendation {
  type: RecommendationType;
  title: string;
  description: string;
  priority: Priority;
  basedOn: string[];
}

export interface AnalysisSummary {
  overallVisibility: number;
  openAIVisibility: number;
  geminiVisibility: number;
  totalPrompts: number;
  totalBrands: number;
  totalCitations: number;
}

export interface AnalysisResults {
  targetBrand: string;
  targetUrl: string;
  prompts: GeneratedPrompt[];
  openAIResults: LLMResponse[];
  geminiResults: LLMResponse[];
  summary: AnalysisSummary;
  recommendations: Recommendation[];
}
