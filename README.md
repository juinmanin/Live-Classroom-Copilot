<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Live Classroom Copilot

> **Zero-install, zero-config AI classroom assistant** — just open your browser and start.

A real-time AI-powered pedagogical assistant that analyzes classroom engagement through a teacher's smartphone camera. Built with WebRTC for peer-to-peer communication and Google Gemini for multimodal AI analysis.

## User Journey

1. **Visit** — Teacher opens the service URL on their laptop/PC.
2. **Scan** — A QR code appears on screen. The teacher scans it with their smartphone (mobile page opens automatically).
3. **Place** — The teacher positions the phone facing the students.
4. **Analyze** — Real-time AI-generated insights appear on the laptop dashboard as the class progresses.

## Key Features

- **Zero Installation** — No apps to download. Works entirely in the browser.
- **QR-Based Zero-Config** — Any teacher can set up in under 10 seconds.
- **WebRTC P2P Streaming** — Secure, firewall-friendly peer-to-peer video from phone to laptop via PeerJS with STUN servers.
- **Privacy-First** — Video frames are blurred before AI analysis. No video is stored on any server (volatile analysis).
- **Gemini AI Analysis** — Classroom frames are analyzed by Google Gemini Flash for engagement, cognitive load, mood, and pedagogical suggestions.
- **Demo Mode** — Try the full experience without an API key using simulated AI responses.
- **Multilingual** — Supports English, Korean, Japanese, Chinese, Spanish, French, and Hindi.

## Cloud Architecture

| Layer | Service | Role |
|-------|---------|------|
| **Frontend** | Vercel / Netlify | Renders the UI and provides the mobile connection gateway |
| **P2P Communication** | PeerJS + STUN | WebRTC-based peer-to-peer video streaming between phone and laptop |
| **AI Analysis** | Google Gemini Flash API | Sub-second multimodal classroom analysis directly from the cloud |
| **Data** | In-memory only | All analysis is volatile — no video or data is persisted on servers |

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Set `GEMINI_API_KEY` in `.env.local` for real AI analysis:
   ```bash
   echo "GEMINI_API_KEY=your_key_here" > .env.local
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

> **Note:** Without an API key, the app runs in **Demo Mode** with simulated AI analysis.

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project)

Set the `GEMINI_API_KEY` environment variable in your Vercel project settings.

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Set the `GEMINI_API_KEY` environment variable in your Netlify site settings.

## Tech Stack

- **React 18** + **TypeScript** — UI framework
- **Vite** — Build tool
- **PeerJS** — WebRTC peer-to-peer connections
- **Google Gemini API** (`@google/genai`) — Multimodal AI analysis
- **Recharts** — Real-time data visualization
- **Tailwind CSS** — Styling
