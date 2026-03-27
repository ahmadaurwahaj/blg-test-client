import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import LoadingGif from '@/assets/Loading.gif';
import AnimationGif from '@/assets/animation.gif';
import DotGrid from '@/components/DotGrid';

interface Step {
  id: string;
  label: string;
  description: string;
  duration: number;
}

interface AnalysisLoaderProps {
  url: string;
  onComplete?: () => void;
}

export function AnalysisLoader({ url, onComplete }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const steps: Step[] = [
    {
      id: 'analyzing',
      label: 'Analyzing website',
      description: 'Scanning your website content and structure...',
      duration: 2000,
    },
    {
      id: 'generating',
      label: 'Generating prompts',
      description: 'Creating 5 AI prompts across buying journey stages...',
      duration: 2500,
    },
    {
      id: 'querying-openai',
      label: 'Querying ChatGPT',
      description: 'Testing prompts with OpenAI ChatGPT...',
      duration: 3000,
    },
    {
      id: 'querying-gemini',
      label: 'Querying Gemini',
      description: 'Testing prompts with Google Gemini...',
      duration: 3000,
    },
    {
      id: 'calculating',
      label: 'Calculating scores',
      description: 'Analyzing brand mentions and citations...',
      duration: 2000,
    },
  ];

  const facts = [
    {
      title: 'Did you know?',
      text: 'AI models like ChatGPT and Gemini are trained on billions of web pages. Your visibility depends on how well your content is structured and cited across the web.',
    },
    {
      title: 'Citation matters',
      text: 'LLMs prioritize content from authoritative sources like Wikipedia, academic papers, and well-established websites when generating responses.',
    },
    {
      title: 'Structured data wins',
      text: 'Websites with proper schema markup and structured content are 3x more likely to be cited by AI models compared to unstructured pages.',
    },
    {
      title: 'Freshness counts',
      text: 'AI models favor recently updated content. Regular updates to your website can significantly improve your chances of being mentioned in AI responses.',
    },
    {
      title: 'Context is key',
      text: 'The way you frame your content matters. Clear, concise explanations with relevant keywords help AI models understand and reference your expertise.',
    },
    {
      title: 'Backlinks boost visibility',
      text: 'Being cited by other reputable websites increases your authority score, making AI models more likely to recommend your brand in their responses.',
    },
  ];

  useEffect(() => {
    let stepTimer: ReturnType<typeof setTimeout>;
    let progressTimer: ReturnType<typeof setTimeout>;

    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    const progressPerMs = 100 / totalDuration;


    const startTime = Date.now();
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed * progressPerMs), 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        progressTimer = setTimeout(animateProgress, 50);
      }
    };

    animateProgress();


    const progressSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => {
          stepTimer = setTimeout(() => {
            setCompletedSteps(prev => [...prev, i]);
            resolve(null);
          }, steps[i].duration);
        });
      }
      

      if (onComplete) {
        setTimeout(onComplete, 500);
      }
    };

    progressSteps();

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(progressTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 3000); // Change fact every 3 seconds

    return () => clearInterval(factInterval);
  }, [facts.length]);

  const getStepStatus = (index: number) => {
    if (completedSteps.includes(index)) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <DotGrid
          dotSize={2}
          gap={24}
          baseColor="#475569"
          activeColor="#33d17a"
          proximity={120}
          speedTrigger={100}
          shockRadius={200}
          shockStrength={4}
        />
      </div>


      <div className="relative z-10 w-full max-w-2xl">
        <Card className="p-8 md:p-12 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img src={LoadingGif} alt="Loading" className="w-24 h-24" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Analyzing Your Website
            </h2>
            <p className="text-slate-600 mb-2">{url}</p>
            <p className="text-sm text-slate-500">
              This usually takes 30-60 seconds
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">
                {steps[currentStep]?.label}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="space-y-2">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              
              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    status === 'active'
                      ? 'bg-slate-50 border-slate-200'
                      : status === 'completed'
                      ? 'bg-white border-slate-100'
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                    {status === 'completed' ? (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : status === 'active' ? (
                      <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold ${
                          status === 'active'
                            ? 'text-slate-900'
                            : status === 'completed'
                            ? 'text-slate-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </h3>
                    </div>
                    <p
                      className={`text-sm ${
                        status === 'pending' ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 p-4  rounded-lg min-h-[80px] transition-all duration-500">
            <div className="flex items-start gap-4">
              <img src={AnimationGif} alt="AI Animation" className="w-16 h-16 shrink-0" />
              <p className="text-sm text-gray-600 flex-1">
                <span className="font-semibold">{facts[currentFactIndex].title}</span> {facts[currentFactIndex].text}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
