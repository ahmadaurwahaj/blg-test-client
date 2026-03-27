import { useEffect, useState } from 'react';
import { Check, Loader2, Sparkles, FileText, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { OpenAILogo } from '@/components/common/OpenAILogo';
import { GeminiLogo } from '@/components/common/GeminiLogo';
import LoadingGif from '@/assets/Loading.gif';
import AnimationGif from '@/assets/animation.gif';
import DotGrid from '@/components/DotGrid';

interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
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
      icon: <Sparkles className="w-5 h-5" />,
      duration: 2000,
    },
    {
      id: 'generating',
      label: 'Generating prompts',
      description: 'Creating 5 AI prompts across buying journey stages...',
      icon: <FileText className="w-5 h-5" />,
      duration: 2500,
    },
    {
      id: 'querying-openai',
      label: 'Querying ChatGPT',
      description: 'Testing prompts with OpenAI ChatGPT...',
      icon: <OpenAILogo className="w-5 h-5" />,
      duration: 3000,
    },
    {
      id: 'querying-gemini',
      label: 'Querying Gemini',
      description: 'Testing prompts with Google Gemini...',
      icon: <GeminiLogo className="w-5 h-5" />,
      duration: 3000,
    },
    {
      id: 'calculating',
      label: 'Calculating scores',
      description: 'Analyzing brand mentions and citations...',
      icon: <BarChart3 className="w-5 h-5" />,
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

    // Progress animation
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

    // Step progression
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
      
      // Call onComplete after all steps
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

  // Fact rotation
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
      {/* DotGrid Background */}
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="p-8 md:p-12 bg-white/90 backdrop-blur">
          {/* Header */}
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

          {/* Progress Bar */}
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

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              
              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                    status === 'active'
                      ? 'bg-primary/15  border-primary/20'
                      : status === 'completed'
                      ? 'bg-gray-100'
                      : 'bg-gray-300  border-slate-200'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      status === 'active'
                        ? 'bg-primary text-white animate-pulse'
                        : status === 'completed'
                        ? 'bg-primary text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5 font-bold" />
                    ) : status === 'active' ? (
                      <div className="animate-spin">{step.icon}</div>
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold ${
                          status === 'active'
                            ? 'text-primary'
                            : status === 'completed'
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </h3>
                      {status === 'active' && (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      )}
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

          {/* Fun Facts */}
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
