import { API_CONFIG, PROGRESS_STAGES } from '@/config/api';
import type { CombinedAPIResponse, SSEEvent } from '@/types';



export function analyzeWebsite(
  url: string,
  onProgress: (stage: string, progress: number) => void,
  onComplete: (data: CombinedAPIResponse) => void,
  onError: (error: string, statusCode?: number) => void
): () => void {
  const apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.analyze}`;
  const controller = new AbortController();
  

  (async () => {
    let response: Response;
    
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });
    } catch (err: any) {
      if (!controller.signal.aborted) {
        onError('Could not reach the server. Is it running?');
      }
      return;
    }


    if (!response.ok) {
      try {
        const body = await response.json();
        const msg = Array.isArray(body.message)
          ? body.message.join(', ')
          : body.message;
        onError(msg || `Request failed (${response.status})`, response.status);
      } catch {
        onError(`Request failed (${response.status})`, response.status);
      }
      return;
    }


    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        

        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith('data: ')) continue;

          try {
            const event = JSON.parse(line.slice(6)) as SSEEvent;
            handleSSEEvent(event, onProgress, onComplete, onError);
          } catch (error) {
            console.error('Failed to parse SSE event:', error);
          }
        }
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        onError('Connection lost during analysis.');
      }
    }
  })();


  return () => {
    controller.abort();
  };
}


function handleSSEEvent(
  event: SSEEvent,
  onProgress: (stage: string, progress: number) => void,
  onComplete: (data: CombinedAPIResponse) => void,
  onError: (error: string, statusCode?: number) => void
): void {
  switch (event.type) {
    case 'progress':
      const progress = calculateProgress(event.stage);
      onProgress(event.stage, progress);
      break;
      
    case 'result':
      onComplete(event.data);
      break;
      
    case 'error':
      onError(event.message);
      break;
  }
}


function calculateProgress(stage: string): number {

  if (stage in PROGRESS_STAGES) {
    return PROGRESS_STAGES[stage as keyof typeof PROGRESS_STAGES];
  }

 
  const promptMatch = stage.match(/prompt (\d+)\/(\d+)/);
  if (promptMatch) {
    const current = parseInt(promptMatch[1]);
    const total = parseInt(promptMatch[2]);
    const baseProgress = 70; 
    const progressRange = 25; 
    const increment = progressRange / total;
    return Math.min(baseProgress + (current * increment), 95);
  }


  const baseStage = stage.replace(/for prompt \d+\/\d+/, '').trim();
  return PROGRESS_STAGES[baseStage as keyof typeof PROGRESS_STAGES] || 50;
}


export function parseErrorResponse(error: any): { message: string; statusCode?: number } {
  if (error.response) {
    return {
      message: error.response.data?.message || error.response.statusText,
      statusCode: error.response.status
    };
  }
  
  return {
    message: error.message || 'An unexpected error occurred'
  };
}
