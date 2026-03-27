// Core types for the LLM Visibility Analysis Tool

export type BuyingStage = 'awareness' | 'consideration' | 'decision' | 'problem' | 'solution';
export type LLMProvider = 'openai' | 'gemini';
export type RecommendationType = 'article' | 'reddit' | 'medium' | 'wikipedia';
export type Priority = 'high' | 'medium' | 'low';

// API Response Types (matching backend API.md)
export interface APIAnalysisResponse {
  visibilityScore: number;
  marketShare: number;
  totalPrompts: number;
  promptsWithBrand: number;
  brandRanking: APIBrandRanking[];
  citationDomains: APICitationDomain[];
  perPromptResults: APIPromptResult[];
}

export interface APIBrandRanking {
  name: string;
  mentions: number;
  share: number;
}

export interface APICitationDomain {
  domain: string;
  count: number;
}

export interface APIPromptResult {
  query: string;
  stage: BuyingStage;
  response: string;
  citations: APICitation[];
  brands: APIBrandMention[];
  targetBrandFound: boolean;
  targetBrandMentions: number;
}

export interface APICitation {
  url: string;
  title: string;
  domain: string;
}

export interface APIBrandMention {
  name: string;
  mentions: number;
  context: string;
}

// Frontend Display Types
export interface AnalysisResults {
  targetUrl: string;
  targetBrand: string;
  apiResponse: APIAnalysisResponse;
}

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
