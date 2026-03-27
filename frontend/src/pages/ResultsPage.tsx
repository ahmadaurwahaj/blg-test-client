import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { SummaryCards } from "@/components/results/SummaryCards"
import { VisibilityComparison } from "@/components/results/VisibilityComparison"
import { BrandMentionsTable } from "@/components/results/BrandMentionsTable"
import { CitationAnalysis } from "@/components/results/CitationAnalysis"
import { useLLMComparison } from "@/hooks/data/useLLMComparison"
import type { AnalysisResults, CombinedAPIResponse } from "@/types"

interface ResultsPageProps {
  results: AnalysisResults
  combinedData: CombinedAPIResponse | null
  onBack?: () => void
}

export function ResultsPage({ results, combinedData, onBack }: ResultsPageProps) {
  const { theme, setTheme } = useTheme()
  

  const { selectedView, viewData, comparison, switchView } = useLLMComparison(combinedData)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }


  const displayData = viewData || results.apiResponse

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900 dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 transition-opacity hover:opacity-80 cursor-pointer"
            >
              <span className="text-lg font-semibold text-white">
                LLM Visibility
              </span>
            </button>

            <nav className="flex items-center gap-6 text-sm text-slate-400">
              <div className="text-white">
                <span className="font-medium">Analysis Results</span>
                <span className="mx-2 text-slate-600">•</span>
                <span className="text-slate-400">{results.targetUrl}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
    
        {comparison && (
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-1 bg-white dark:bg-slate-900">
              <button
                onClick={() => switchView('combined')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedView === 'combined'
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Combined
              </button>
              <button
                onClick={() => switchView('gemini')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedView === 'gemini'
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Gemini
              </button>
              <button
                onClick={() => switchView('chatgpt')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedView === 'chatgpt'
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                ChatGPT
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <section>
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Your brand's visibility across AI language models
              </p>
            </div>
            <SummaryCards
              apiResponse={displayData}
              comparison={comparison}
              targetBrand={results.targetBrand}
            />
          </section>

          <section>
            <BrandMentionsTable
              brandRanking={displayData.brandRanking}
              targetBrand={results.targetBrand}
              visibilityScore={displayData.visibilityScore}
            />
          </section>

          <section>
            <VisibilityComparison
              perPromptResults={displayData.perPromptResults}
            />
          </section>

          <section>
            <CitationAnalysis citationDomains={displayData.citationDomains} />
          </section>
        </div>
      </div>
    </div>
  )
}
