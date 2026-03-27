import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import LoadingGif from "@/assets/Loading.gif"
import AnimationGif from "@/assets/animation.gif"
import DotGrid from "@/components/DotGrid"
import { useProgressTracking } from "@/hooks/ui/useProgressTracking"
import type { AnalysisStage } from "@/types"

interface AnalysisLoaderProps {
  url: string
  currentStage: AnalysisStage | null
  progress: number
}

export function AnalysisLoader({
  url,
  currentStage,
  progress,
}: AnalysisLoaderProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)

  const progressInfo = useProgressTracking(currentStage)

  const steps = [
    {
      id: "analyzing",
      label: "Analyzing website",
      description: "Scanning your website content and structure...",
      stageMatch: ["Crawling website", "Crawling done"],
    },
    {
      id: "generating",
      label: "Generating prompts",
      description: "Creating AI prompts across buying journey stages...",
      stageMatch: ["Generating relevant prompts", "Prompts generated"],
    },
    {
      id: "querying",
      label: "Querying AI models",
      description: "Testing prompts with ChatGPT and Gemini...",
      stageMatch: ["Querying Gemini & ChatGPT"],
    },
    {
      id: "calculating",
      label: "Calculating scores",
      description: "Analyzing brand mentions and citations...",
      stageMatch: ["Calculating scores"],
    },
  ]

  const facts = [
    {
      title: "Did you know?",
      text: "AI models like ChatGPT and Gemini are trained on billions of web pages. Your visibility depends on how well your content is structured and cited across the web.",
    },
    {
      title: "Citation matters",
      text: "LLMs prioritize content from authoritative sources like Wikipedia, academic papers, and well-established websites when generating responses.",
    },
    {
      title: "Structured data wins",
      text: "Websites with proper schema markup and structured content are 3x more likely to be cited by AI models compared to unstructured pages.",
    },
    {
      title: "Freshness counts",
      text: "AI models favor recently updated content. Regular updates to your website can significantly improve your chances of being mentioned in AI responses.",
    },
    {
      title: "Context is key",
      text: "The way you frame your content matters. Clear, concise explanations with relevant keywords help AI models understand and reference your expertise.",
    },
    {
      title: "Backlinks boost visibility",
      text: "Being cited by other reputable websites increases your authority score, making AI models more likely to recommend your brand in their responses.",
    },
  ]

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length)
    }, 3000)

    return () => clearInterval(factInterval)
  }, [facts.length])

  const getStepStatus = (step: (typeof steps)[0]) => {
    if (!currentStage) return "pending"

    const baseStage = currentStage.replace(/for prompt \d+\/\d+/, "").trim()

    if (step.stageMatch.some((match) => baseStage.includes(match))) {
      return "active"
    }

    const stepIndex = steps.indexOf(step)
    const progressThresholds = [20, 40, 95, 100]

    if (progress > progressThresholds[stepIndex]) {
      return "completed"
    }

    return "pending"
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-900 to-slate-800 p-4">
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
        <Card className="bg-white/90 p-8 backdrop-blur md:p-12">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center">
              <img src={LoadingGif} alt="Loading" className="h-24 w-24" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Analyzing Your Website
            </h2>
            <p className="mb-2 text-slate-600">{url}</p>
            <p className="text-sm text-slate-500">
              This usually takes 1-5 minutes
            </p>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {progressInfo.label}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            {progressInfo.promptProgress && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Testing prompt {progressInfo.promptProgress.current} of{" "}
                {progressInfo.promptProgress.total}
              </p>
            )}
          </div>

          <div className="space-y-2">
            {steps.map((step) => {
              const status = getStepStatus(step)

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 rounded-lg border p-4 transition-all duration-300 ${
                    status === "active"
                      ? "border-slate-200 bg-slate-50"
                      : status === "completed"
                        ? "border-slate-100 bg-white"
                        : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {status === "completed" ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    ) : status === "active" ? (
                      <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3
                        className={`font-semibold ${
                          status === "active"
                            ? "text-slate-900"
                            : status === "completed"
                              ? "text-slate-700"
                              : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </h3>
                    </div>
                    <p
                      className={`text-sm ${
                        status === "pending"
                          ? "text-slate-400"
                          : "text-slate-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 min-h-[80px] rounded-lg p-4 transition-all duration-500">
            <div className="flex items-start gap-4">
              <img
                src={AnimationGif}
                alt="AI Animation"
                className="h-16 w-16 shrink-0"
              />
              <p className="flex-1 text-sm text-gray-600">
                <span className="font-semibold">
                  {facts[currentFactIndex].title}
                </span>{" "}
                {facts[currentFactIndex].text}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
