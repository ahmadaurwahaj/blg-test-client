# LLM Visibility Analysis Tool

This is a React app that checks how visible your brand is in AI tools like ChatGPT and Gemini. You just enter a URL and it shows you the results.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

Once it is running, open your browser and go to `http://localhost:5173/free-tools/llm-analysis`.

## Building for Production

```bash
npm run build
```

The built files will go into the `dist` folder. The app is set up to run at `/free-tools/llm-analysis/`.

## Pages

The app has three pages:

- **Landing page** where you enter the URL you want to check
- **Analysis page** that shows a loading screen while it fetches results
- **Results page** where you can see all the visibility data

The app is hosted at `/free-tools/llm-analysis`.
