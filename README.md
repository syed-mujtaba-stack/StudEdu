# StudEdu - AI-Powered Learning Platform

![StudEdu Logo](client/public/logo-animated.svg)

> Empowering learners worldwide with accessible, high-quality education powered by AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)](https://web.dev/progressive-web-apps/)

## 🚀 Features

### 🎓 Comprehensive Learning Platform
- **Interactive Courses** - Rich course content from industry experts
- **Progress Tracking** - Monitor your learning journey with detailed analytics
- **Quizzes & Assessments** - Test your knowledge with interactive quizzes
- **Certificates** - Earn certificates upon course completion
- **Responsive Design** - Seamless experience across all devices

### 🤖 AI-Powered Tools (Groq API)
- **AI Tutor** - Get personalized help 24/7 with Llama 3.3 70B
- **Quiz Generator** - Auto-generate custom quizzes on any topic
- **Smart Summarizer** - Summarize content in multiple formats (bullets, paragraphs, concepts)
- **Notes Generator** - Create well-structured study notes with markdown export
- **Real-time Streaming** - Fast AI responses with Server-Sent Events

### 📱 Progressive Web App (PWA)
- **Installable** - Add to home screen on mobile and desktop
- **Offline Support** - Access cached content without internet
- **Fast Loading** - Service worker caching for instant loads
- **App-like Experience** - Full-screen, standalone mode
- **Auto-updates** - Seamless background updates

### 🎨 Modern UI/UX
- **Dark/Light Mode** - Theme support with system detection
- **Animated Logo** - Beautiful SVG animation
- **Smooth Animations** - Polished transitions throughout
- **Accessible** - WCAG compliant components
- **Mobile-first** - Optimized for touch interfaces

### 🔐 Authentication
- **Email/Password** - Traditional authentication
- **Google OAuth** - Quick sign-in with Google (ready for production)
- **Session Management** - Secure token-based authentication

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **Wouter** for routing
- **TanStack Query** for data management
- **Tailwind CSS** + **shadcn/ui** components
- **Vite PWA** for progressive web app features

### Backend
- **FastAPI** (Python) for AI services
- **Groq API** for AI inference
- **Express.js** for main backend
- **Supabase** for logging (optional)

### AI Models (via Groq)
- **Llama 3.3 70B Versatile** - Advanced AI tutor
- **Llama 3.1 8B Instant** - Fast summarization

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Service Workers** - Offline caching
- **Workbox** - PWA tooling

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.12+
- **Groq API key** ([Get one free](https://console.groq.com/keys))

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/StudEdu-Platform.git
cd StudEdu-Platform

# Install all dependencies
npm install

# Install AI backend dependencies
cd ai-backend
pip install -r requirements.txt
cd ..
```

### Environment Setup

Create `ai-backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
SUPABASE_URL=your_supabase_url (optional for backend logging)
SUPABASE_KEY=your_supabase_key (optional for backend logging)
RATE_LIMIT_PER_MINUTE=20
```

### Frontend Environment (.env)

Create a `.env` file in the root `StudEdu-Platform` directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*(Get these keys from your Supabase Dashboard -> Settings -> API)*


### Development

Run both servers concurrently:

```bash
# Terminal 1: AI Backend (Port 8000)
cd ai-backend
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend Dev Server (Port 5001)
npm run dev:client
```

Visit **http://localhost:5001** 🎉

### Production Build

```bash
# Build everything
npm run build

# The built files will be in dist/
# - dist/public/ - Frontend
# - dist/index.cjs - Backend
```

## 📁 Project Structure

```
StudEdu-Platform/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ai/          # AI feature components
│   │   │   ├── layout/      # Layout components
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── pages/           # Route pages (Login, Dashboard, Course, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities (supabase.ts, utils.ts)
│   │   └── pwa.ts           # PWA install handling
│   ├── public/              # Static assets
│   │   ├── logo-animated.svg # Animated app logo
│   │   └── manifest.json    # PWA manifest
│   └── index.html           # HTML entry point
├── ai-backend/               # FastAPI AI services
│   ├── routes/              # API endpoints
│   │   ├── tutor.py         # AI Tutor chat
│   │   ├── quiz.py          # Quiz generator
│   │   ├── summarizer.py    # Content summarizer
│   │   └── notes.py         # Notes generator
│   ├── services/            # Business logic
│   │   └── supabase_logger.py
│   ├── middleware/          # Rate limiting, etc.
│   ├── config.py            # App configuration
│   ├── main.py              # FastAPI app entry
│   └── requirements.txt     # Python dependencies
├── server.ts                # Express backend
├── shared/                  # Shared types and schemas
├── .github/                 # GitHub Actions & templates
│   ├── workflows/
│   │   └── ci.yml          # CI/CD pipeline
│   └── ISSUE_TEMPLATE/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── SECURITY.md
```

## 🎯 Key Features Explained

### AI Tutor
- Real-time streaming responses
- Context-aware conversations
- History tracking
- Powered by Llama 3.3 70B

### Quiz Generator
- Configurable difficulty levels
- Custom number of questions
- Topic-focused generation
- Instant answer validation
- Copy-to-clipboard support

### Summarizer
Three output formats:
- **Bullets** - Concise key points
- **Paragraph** - Flowing narrative
- **Concepts** - Definitions & explanations

### Notes Generator
- Markdown-formatted output
- Adjustable detail levels
- Example inclusion toggle
- Summary sections
- One-click download

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Visit the app in Chrome or Edge
2. Click the install icon in the address bar
3. Click "Install" when prompted

### Mobile (Android)
1. Open the app in Chrome
2. Tap "Add to Home Screen" from the menu
3. Confirm installation

### Mobile (iOS)
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

## 🔐 Authentication
 
 Production-ready authentication powered by **Supabase Auth**:
 
 1. **Email/Password** - Secure sign-up and login with email verification
 2. **Google OAuth** - One-click sign-in integration
 3. **Password Recovery** - Forgot password and reset functionality
 4. **Session Management** - Persisted sessions with secure token handling


## 📄 Legal & Documentation

- [Terms of Service](/terms) - Usage terms and conditions
- [Privacy Policy](/privacy) - Data handling and privacy
- [Cookie Policy](/cookies) - Cookie usage details
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute
- [Security Policy](SECURITY.md) - Vulnerability reporting

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Coding guidelines
- Commit message format
- Pull request process

## 🧪 Testing

```bash
# Frontend tests
npm test

# Backend tests
cd ai-backend
pytest

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- [Groq](https://groq.com/) - Blazing-fast AI inference
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide](https://lucide.dev/) - Icon set
- [Vite PWA](https://vite-pwa-org.netlify.app/) - PWA plugin

## 📧 Contact

- **Website**: [studedu.com](https://studedu.com)
- **Email**: support@studedu.com
- **Twitter**: [@StudEdu](https://twitter.com/StudEdu)
- **GitHub**: [StudEdu-Platform](https://github.com/yourusername/StudEdu-Platform)

## 🗺️ Roadmap

### Completed ✅
- [x] AI-powered learning tools
- [x] PWA support with offline mode
- [x] Responsive design
- [x] Google OAuth integration
- [x] Service worker caching
- [x] Blog with dynamic content
- [x] Legal pages (Terms, Privacy, Cookies)

### Upcoming 🚧
- [ ] Real-time collaboration features
- [ ] Mobile apps (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Live instructor sessions
- [ ] Community forums
- [ ] Gamification system
- [ ] Course marketplace

## 💡 Environment Variables

### AI Backend (.env)
```env
GROQ_API_KEY=           # Required - Your Groq API key
SUPABASE_URL=           # Optional - Supabase project URL
SUPABASE_KEY=           # Optional - Supabase anon key
RATE_LIMIT_PER_MINUTE=20 # Optional - API rate limit
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change the port in vite.config.ts or use a different port
npm run dev:client -- --port 5002
```

### Service Worker Not Updating
```bash
# Clear browser cache and unregister SW
# Chrome: DevTools → Application → Service Workers → Unregister
```

### AI Backend Connection Issues
```bash
# Verify backend is running on port 8000
curl http://localhost:8000/api/ai/health
```

---

**Made with ❤️ by the StudEdu Team**

*Empowering learners worldwide since 2025*
