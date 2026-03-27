import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useURLValidation } from '@/hooks/useURLValidation';

interface URLInputFormProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function URLInputForm({ onSubmit, isLoading = false }: URLInputFormProps) {
  const { url, normalizedUrl, error, setUrl, validate } = useURLValidation();
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(normalizedUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setShowPreview(false);
  };

  const handleInputBlur = () => {
    if (url.trim()) {
      const isValid = validate();
      setShowPreview(isValid);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter your website URL..."
          value={url}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={isLoading}
          className="h-14 flex-1 bg-white/95 backdrop-blur text-black dark:text-white text-base border-slate-300 focus:border-primary"
          aria-label="Website URL"
          aria-invalid={!!error}
          aria-describedby={error ? 'url-error' : undefined}
        />

        {showPreview && normalizedUrl && !error && (
          <p className="text-sm text-slate-300 pl-1">
            Will analyze: <span className="font-medium text-white">{normalizedUrl}</span>
          </p>
        )}

        {error && (
          <p id="url-error" className="text-sm text-red-400 pl-1" role="alert">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading || !url.trim()}
        className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Your Website...
          </>
        ) : (
          'Analyze Visibility'
        )}
      </Button>
    </form>
  );
}
