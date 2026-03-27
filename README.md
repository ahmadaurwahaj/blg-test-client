# LLM Visibility Analysis Tool

A React application for analyzing brand visibility in AI language models like ChatGPT and Gemini.

## Development

```bash
npm install
npm run dev
```

The application will be available at: `http://localhost:5173/free-tools/llm-analysis`

## Build

```bash
npm run build
```

The build output will be in the `dist` directory, configured for deployment at `/free-tools/llm-analysis/`.

## Routing

The application is hosted at `/free-tools/llm-analysis` and includes:
- Landing page with URL input form
- Analysis page with loading states
- Results page with detailed visibility metrics

## Project Structure

- `src/pages/` - Main page components (Landing, Analysis, Results)
- `src/components/` - Reusable UI components
- `src/lib/` - Utilities and helper functions
- `src/types/` - TypeScript type definitions

## Adding UI Components

To add shadcn/ui components:

```bash
npx shadcn@latest add button
```

Components will be placed in `src/components/ui/`.

## Using Components

```tsx
import { Button } from "@/components/ui/button"
```
