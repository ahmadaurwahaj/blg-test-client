import { useMemo } from 'react';
import type { AnalysisStage } from '@/types';

interface ProgressInfo {
  label: string;
  description: string;
  promptProgress: { current: number; total: number } | null;
}

const STAGE_MAPPING: Record<string, { label: string; description: string }> = {
  'Crawling website': {
    label: 'Analyzing website',
    description: 'Scanning your website content and structure...'
  },
  'Crawling done': {
    label: 'Website analyzed',
    description: 'Successfully extracted website information'
  },
  'Generating relevant prompts': {
    label: 'Generating prompts',
    description: 'Creating AI prompts across buying journey stages...'
  },
  'Prompts generated': {
    label: 'Prompts ready',
    description: 'Generated prompts for testing'
  },
  'Querying Gemini & ChatGPT': {
    label: 'Querying AI models',
    description: 'Testing prompts with ChatGPT and Gemini...'
  },
  'Calculating scores': {
    label: 'Calculating scores',
    description: 'Analyzing brand mentions and citations...'
  },
  'Analysis complete': {
    label: 'Complete',
    description: 'Analysis finished successfully'
  }
};


export function useProgressTracking(stage: AnalysisStage | null): ProgressInfo {
  return useMemo(() => {
    if (!stage) {
      return {
        label: 'Initializing...',
        description: 'Preparing analysis',
        promptProgress: null
      };
    }


    const promptMatch = stage.match(/prompt (\d+)\/(\d+)/);
    const promptProgress = promptMatch
      ? { current: parseInt(promptMatch[1]), total: parseInt(promptMatch[2]) }
      : null;


    const baseStage = stage.replace(/for prompt \d+\/\d+/, '').trim();
    const stageInfo = STAGE_MAPPING[baseStage] || {
      label: 'Processing',
      description: stage
    };

    return {
      ...stageInfo,
      promptProgress
    };
  }, [stage]);
}
