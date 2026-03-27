export function GeminiLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L2 7v10l10 5 10-5V7L12 2z"
        fill="url(#gemini-gradient)"
        opacity="0.2"
      />
      <path
        d="M12 2L2 7l10 5 10-5L12 2z"
        fill="url(#gemini-gradient)"
      />
      <path
        d="M2 7v10l10 5V12L2 7z"
        fill="url(#gemini-gradient)"
        opacity="0.6"
      />
      <path
        d="M22 7v10l-10 5V12l10-5z"
        fill="url(#gemini-gradient)"
        opacity="0.8"
      />
    </svg>
  );
}
