import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { SummaryCards } from "@/components/results/SummaryCards"
import { VisibilityComparison } from "@/components/results/VisibilityComparison"
import { BrandMentionsTable } from "@/components/results/BrandMentionsTable"
import { CitationAnalysis } from "@/components/results/CitationAnalysis"
import type { AnalysisResults } from "@/types"

interface ResultsPageProps {
  results: AnalysisResults
  onBack?: () => void
}

export function ResultsPage({ results, onBack }: ResultsPageProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const { apiResponse } = results

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900 dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
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
              apiResponse={apiResponse}
              targetBrand={results.targetBrand}
            />
          </section>

          <section>
            <BrandMentionsTable
              brandRanking={apiResponse.brandRanking}
              targetBrand={results.targetBrand}
            />
          </section>

          <section>
            <VisibilityComparison
              perPromptResults={apiResponse.perPromptResults}
            />
          </section>

          <section>
            <CitationAnalysis citationDomains={apiResponse.citationDomains} />
          </section>
        </div>
      </div>
    </div>
  )
}
