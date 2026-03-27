
export type BuyingStage = 'awareness' | 'consideration' | 'decision' | 'problem' | 'solution';
export type LLMProvider = 'openai' | 'gemini' | 'chatgpt';
export type RecommendationType = 'article' | 'reddit' | 'medium' | 'wikipedia';
export type Priority = 'high' | 'medium' | 'low';
export type LLMView = 'combined' | 'gemini' | 'chatgpt';

export type SSEEventType = 'progress' | 'result' | 'error';
export type AnalysisStage = string; 


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


export interface LLMAnalysisData {
  llm: 'gemini' | 'chatgpt';
  visibilityScore: number;
  marketShare: number;
  totalPrompts: number;
  promptsWithBrand: number;
  brandRanking: APIBrandRanking[];
  citationDomains: APICitationDomain[];
  perPromptResults: APIPromptResult[];
}

export interface CombinedAPIResponse {
  overallVisibilityScore: number;
  comparison: {
    gemini: { visibilityScore: number; marketShare: number };
    chatgpt: { visibilityScore: number; marketShare: number };
  };
  totalPromptsAnalyzed: number;
  gemini: LLMAnalysisData;
  chatgpt: LLMAnalysisData;
  combinedBrandRanking: APIBrandRanking[];
  combinedCitationDomains: APICitationDomain[];
}


export interface SSEProgressEvent {
  type: 'progress';
  stage: AnalysisStage;
}

export interface SSEResultEvent {
  type: 'result';
  data: CombinedAPIResponse;
}

export interface SSEErrorEvent {
  type: 'error';
  message: string;
}

export type SSEEvent = SSEProgressEvent | SSEResultEvent | SSEErrorEvent;


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
