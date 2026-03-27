import { Search, Bot, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { URLInputForm } from "@/components/analysis/URLInputForm"
import DotGrid from "../components/DotGrid"
import { OpenAILogo } from "@/components/common/OpenAILogo"
import { GeminiLogo } from "@/components/common/GeminiLogo"

interface LandingPageProps {
  onAnalyze: (url: string) => void
  isLoading?: boolean
}

export function LandingPage({
  onAnalyze,
  isLoading = false,
}: LandingPageProps) {
  return (
    <div>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-b from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0">
          <DotGrid
            dotSize={2}
            gap={15}
            baseColor="#475569"
            activeColor="#33d17a"
            proximity={120}
            speedTrigger={100}
            resistance={750}
            shockRadius={250}
            shockStrength={5}
          />
        </div>

        <div className="relative z-10 container mx-auto w-full px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Free LLM Visibility Tool
              </h1>

              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Check how visible your brand is when people ask AI tools like
                ChatGPT and Gemini for recommendations.
              </p>
            </div>

            <div className="mb-8 flex items-center justify-center gap-8">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <OpenAILogo className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">ChatGPT</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <GeminiLogo className="h-6 w-6" />
                </div>
                <span className="font-medium">Gemini</span>
              </div>
            </div>

            <div className="mb-6">
              <URLInputForm onSubmit={onAnalyze} isLoading={isLoading} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>100% Free Tool</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>Actionable Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="flex min-h-screen items-center bg-white py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                How It Works
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              <Card className="relative rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 to-white p-8 transition-all duration-300 hover:shadow-xl">
                <div className="mb-8 text-8xl font-bold text-slate-300">01</div>

                <div className="-mt-12 space-y-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                      <Search className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Enter Your Website
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">
                    Simply enter your website URL. We'll{" "}
                    <span className="font-semibold text-slate-900">
                      analyze your content
                    </span>{" "}
                    to understand your business domain and automatically{" "}
                    <span className="font-semibold text-slate-900">
                      generate 5 AI prompts
                    </span>{" "}
                    representing different buying journey stages that potential
                    customers might ask.
                  </p>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                        <OpenAILogo className="h-5 w-5" />
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                        <Bot className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex h-8 items-center rounded-lg border border-slate-200 bg-slate-100 px-3 text-xs text-slate-500">
                        yourbusiness.com
                      </div>
                      <button className="h-10 w-full rounded-lg bg-primary text-sm font-medium text-white transition-colors">
                        Analyze Visibility
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-around">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                        <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="relative rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 to-white p-8 transition-all duration-300 hover:shadow-xl">
                <div className="mb-8 text-8xl font-bold text-slate-300">02</div>

                <div className="-mt-12 space-y-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                      <Bot className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Query ChatGPT & Gemini
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">
                    We send each generated prompt to{" "}
                    <span className="font-semibold text-slate-900">
                      ChatGPT and Gemini
                    </span>
                    , analyzing their responses to calculate your{" "}
                    <span className="font-semibold text-slate-900">
                      visibility score
                    </span>
                    , track{" "}
                    <span className="font-semibold text-slate-900">
                      brand mentions
                    </span>
                    , and identify{" "}
                    <span className="font-semibold text-slate-900">
                      citation sources
                    </span>{" "}
                    where LLMs get their information.
                  </p>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                        <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                        <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                      </div>
                      <span className="ml-2 text-xs text-slate-400">
                        Analyzing prompts...
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="text-xs text-slate-600">
                          Awareness Stage
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-primary">
                          Querying
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="text-xs text-slate-600">
                          Consideration Stage
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-primary">
                          Analyzing
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="text-xs text-slate-600">
                          Decision Stage
                        </span>
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                          Pending
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="text-xs text-slate-600">
                          Problem-focused
                        </span>
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                          Pending
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="text-xs text-slate-600">
                          Solution-focused
                        </span>
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="relative rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 to-white p-8 transition-all duration-300 hover:shadow-xl">
                <div className="mb-8 text-8xl font-bold text-slate-300">03</div>

                <div className="-mt-12 space-y-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                      <FileText className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Get Detailed Report
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">
                    View your comprehensive report with{" "}
                    <span className="font-semibold text-slate-900">
                      visibility scores
                    </span>
                    ,{" "}
                    <span className="font-semibold text-slate-900">
                      brand mention rankings
                    </span>
                    ,{" "}
                    <span className="font-semibold text-slate-900">
                      citation sources
                    </span>
                    , and{" "}
                    <span className="font-semibold text-slate-900">
                      actionable recommendations
                    </span>{" "}
                    like creating articles, engaging on Reddit, or updating
                    Wikipedia.
                  </p>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="mb-1 text-xs text-slate-500">
                          Overall Visibility
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-slate-900">
                            45
                          </span>
                          <span className="text-sm text-slate-400">%</span>
                        </div>
                      </div>
                      <div className="relative h-16 w-16">
                        <svg className="h-16 w-16 -rotate-90 transform">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#f1f5f9"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#f97316"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray="176"
                            strokeDashoffset="88"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Brand Mentions</span>
                        <span className="font-medium text-slate-900">
                          Rank #3
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-20 truncate text-slate-500">
                            Competitor A
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-4/5 rounded-full bg-emerald-500"></div>
                          </div>
                          <span className="w-8 text-right text-slate-400">
                            12
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-20 truncate text-slate-500">
                            Competitor B
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-3/5 rounded-full bg-blue-500"></div>
                          </div>
                          <span className="w-8 text-right text-slate-400">
                            8
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-20 truncate font-medium text-slate-500">
                            Your Brand
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-2/5 rounded-full bg-orange-500"></div>
                          </div>
                          <span className="w-8 text-right text-slate-400">
                            5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500">
                Analysis typically takes 1-5 minutes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
