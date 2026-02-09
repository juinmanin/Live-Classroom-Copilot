<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1fUQlsqt8_HTZwlyGvorGYHL9v4sl_tNE

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Package for Distribution

To create a ZIP file containing all source files for public distribution:

```bash
npm run package
```

This will create `release/live-classroom-copilot-source.zip` containing all necessary project files, excluding:
- `node_modules/`
- `dist/` build artifacts
- `.git/` repository data
- Log files and other temporary files

The ZIP file includes:
- All source code (components, services, utils)
- Configuration files (package.json, tsconfig.json, vite.config.ts, etc.)
- Documentation (README.md)
- Entry files (index.html, index.tsx, App.tsx)

