

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
           
            <span className="text-lg font-semibold text-white">LLM Visibility</span>
          </div>
          
          {/* Optional: Add navigation or CTA */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors"
            >
              How it works
            </button>
            
          </nav>
        </div>
      </div>
    </header>
  );
}
