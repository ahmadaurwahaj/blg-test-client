export const API_CONFIG = {
  baseUrl: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '120000'),
  endpoints: {
    analyze: '/analyze'
  }
} as const;

export const PROGRESS_STAGES = {
  'Crawling website': 10,
  'Crawling done': 20,
  'Generating relevant prompts': 30,
  'Prompts generated': 40,
  'Querying Gemini & ChatGPT': 70,
  'Calculating scores': 95
} as const;
