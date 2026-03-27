import {  Search, Bot, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { URLInputForm } from '@/components/analysis/URLInputForm';
import DotGrid from '../components/DotGrid';
import { OpenAILogo } from '@/components/common/OpenAILogo';
import { GeminiLogo } from '@/components/common/GeminiLogo';

interface LandingPageProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
}

export function LandingPage({ onAnalyze, isLoading = false }: LandingPageProps) {
  return (
    <div>
      {/* Hero Section - Dark Background with DotGrid */}
      <section className="relative bg-linear-to-b from-slate-900 to-slate-800 text-white overflow-hidden min-h-screen flex items-center">
        {/* DotGrid Background */}
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

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 w-full">
          <div className="mx-auto max-w-4xl">
            {/* Title */}
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Free LLM Visibility Tool
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Enter your website URL and we will analyze all the technical issues you need to fix in order to improve your chances of being cited by LLMs.
              </p>
            </div>

            {/* AI Provider Logos */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <OpenAILogo className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">ChatGPT</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <GeminiLogo className="w-6 h-6" />
                </div>
                <span className="font-medium">Gemini</span>
              </div>
            </div>

            {/* URL Input Form */}
            <div className="mb-6">
              <URLInputForm onSubmit={onAnalyze} isLoading={isLoading} />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>100% Free Tool</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Actionable Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Light Background */}
      <section id="how-it-works" className="bg-white py-16 md:py-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                How It Works
              </h2>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Step 1 */}
              <Card className="relative p-8 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300">
                {/* Large Number */}
                <div className="text-8xl font-bold text-slate-300 mb-8">01</div>
                
                <div className="space-y-4 -mt-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Enter Your Website</h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Simply enter your website URL. We'll <span className="font-semibold text-slate-900">analyze your content</span> to understand your business domain and automatically <span className="font-semibold text-slate-900">generate 5 AI prompts</span> representing different buying journey stages that potential customers might ask.
                  </p>

                  {/* Visual Mockup */}
                  <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-200">
                        <OpenAILogo className="w-5 h-5" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-8 bg-slate-100 rounded-lg flex items-center px-3 text-xs text-slate-500 border border-slate-200">
                        yourbusiness.com
                      </div>
                      <button className="w-full h-10 bg-primary text-white rounded-lg font-medium text-sm transition-colors">
                        Analyze Visibility
                      </button>
                    </div>
                    <div className="flex items-center justify-around mt-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2 */}
              <Card className="relative p-8 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300">
                {/* Large Number */}
                <div className="text-8xl font-bold text-slate-300 mb-8">02</div>
                
                <div className="space-y-4 -mt-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Query ChatGPT & Gemini</h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We send each generated prompt to <span className="font-semibold text-slate-900">ChatGPT and Gemini</span>, analyzing their responses to calculate your <span className="font-semibold text-slate-900">visibility score</span>, track <span className="font-semibold text-slate-900">brand mentions</span>, and identify <span className="font-semibold text-slate-900">citation sources</span> where LLMs get their information.
                  </p>

                  {/* Visual Mockup */}
                  <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      </div>
                      <span className="text-xs text-slate-400 ml-2">Analyzing prompts...</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-600">Awareness Stage</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-primary rounded-full font-medium">Querying</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-600">Consideration Stage</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-primary rounded-full font-medium">Analyzing</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-600">Decision Stage</span>
                        <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full font-medium">Pending</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-600">Problem-focused</span>
                        <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full font-medium">Pending</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-600">Solution-focused</span>
                        <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full font-medium">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3 */}
              <Card className="relative p-8 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300">
                {/* Large Number */}
                <div className="text-8xl font-bold text-slate-300 mb-8">03</div>
                
                <div className="space-y-4 -mt-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Get Detailed Report</h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    View your comprehensive report with <span className="font-semibold text-slate-900">visibility scores</span>, <span className="font-semibold text-slate-900">brand mention rankings</span>, <span className="font-semibold text-slate-900">citation sources</span>, and <span className="font-semibold text-slate-900">actionable recommendations</span> like creating articles, engaging on Reddit, or updating Wikipedia.
                  </p>

                  {/* Visual Mockup */}
                  <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Overall Visibility</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-slate-900">45</span>
                          <span className="text-sm text-slate-400">%</span>
                        </div>
                      </div>
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="none" />
                          <circle cx="32" cy="32" r="28" stroke="#f97316" strokeWidth="6" fill="none"
                            strokeDasharray="176" strokeDashoffset="88" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-slate-600">Brand Mentions</span>
                        <span className="font-medium text-slate-900">Rank #3</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 w-20 truncate">Competitor A</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-slate-400 w-8 text-right">12</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 w-20 truncate">Competitor B</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-3/5 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-slate-400 w-8 text-right">8</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 w-20 truncate font-medium">Your Brand</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-2/5 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-slate-400 w-8 text-right">5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500">
                Analysis typically takes 30-60 seconds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
