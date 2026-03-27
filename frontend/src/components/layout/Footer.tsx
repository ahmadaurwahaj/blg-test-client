export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-white mb-1">Free LLM Visibility Analysis Tool</p>
            <p className="text-xs">
              Analyze how ChatGPT and Gemini recommend your brand
            </p>
          </div>
        
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs">
          <p>© 2026 Ahmad Wahaj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
