# CRYX — The InfoSec Club, MNIT Jaipur

> **Securing the digital frontier through community, hands-on labs, and collaborative security research.**

Welcome to the official web platform of **CRYX**, the cybersecurity and information security club of **Malaviya National Institute of Technology (MNIT) Jaipur**. 

The CRYX platform serves as the digital hub for the student security community—showcasing club initiatives, sharing real-time cybersecurity news feeds, curating structured learning roadmaps, organizing weekly security labs, and managing club events and member telemetry.

🌐 **Live Application:** [https://cryx-iota.vercel.app](https://cryx-iota.vercel.app)

---

## Table of Contents

- [Project Preview](#project-preview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture and Project Structure](#architecture-and-project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Local Setup](#installation-and-local-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [Development Guidelines](#development-guidelines)
- [License](#license)
- [Acknowledgements and Contact](#acknowledgements-and-contact)

---

## Project Preview

<!-- Screenshots and visual demonstrations will be placed in docs/screenshots/ -->
> [!NOTE]
> *UI screenshots and media walkthroughs can be added to the `docs/screenshots/` directory.*

The CRYX interface features a terminal-inspired dark cybersecurity aesthetic, interactive binary animations, custom neon accents, and security telemetry components tailored for InfoSec enthusiasts.

---

## Key Features

- **Cybersecurity Club Identity & Terminal Aesthetic:** Immersive dark-mode design with glowing scanlines, binary particle backdrops, and interactive terminal headers.
- **Authentication & OAuth Integration:** Secure user onboarding supporting email/password authentication as well as Google OAuth callback handling backed by Supabase Auth.
- **User Profile & Telemetry Management:** Personalized member profiles, dynamic avatar uploads, and social links (LinkedIn, Instagram) stored with Supabase Storage.
- **Role-Based Access Control (RBAC):** Guarded routes distinguishing standard authenticated members (`UserProtect`) and administrative club officers (`AdminProtect`).
- **Cybersecurity News Hub:** Real-time information and threat intelligence feeds fetched via an Express backend utilizing RSS parser services.
- **Event Coordination & Lab Access:** Dedicated views for upcoming club workshops, capture-the-flag (CTF) announcements, and weekly hands-on cybersecurity labs.
- **Structured Learning Roadmap:** Interactive cybersecurity learning pathways guiding students across core domains like penetration testing, digital forensics, and network defense.
- **Administrative Management:** Officer forms for publishing upcoming events, registering club members, and authoring lab challenges.

---

## Technology Stack

### Frontend
- **Framework & Build:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React Redux
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Visuals & Animations:** [Motion (Framer Motion)](https://motion.dev/), [Three.js](https://threejs.org/) , Lucide Icons

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Server Framework:** [Express.js](https://expressjs.com/)
- **Data Ingestion:** [RSS-Parser](https://www.npmjs.com/package/rss-parser)
- **Middleware:** CORS

### Database & Cloud Services
- **Backend-as-a-Service:** [Supabase](https://supabase.com/)
  - **Database:** PostgreSQL with Row Level Security (RLS)
  - **Authentication:** Supabase Auth (Email + Google OAuth PKCE)
  - **Storage:** Supabase Storage Buckets (`userimage`)

### Development Tooling
- Concurrently (orchestrating frontend and backend concurrently)
- Nodemon (backend live reloading)
- ESLint (code linting and formatting)

---

## Architecture and Project Structure

The repository is organized into distinct frontend and backend directories to cleanly separate client UI presentation from backend API services.

```
CRYX/
├── backend/                  # Express.js REST API & RSS ingestion server
│   ├── controllers/          # API endpoint logic (news, feeds)
│   ├── routers/              # Express routing definitions
│   ├── server.js             # Server entry point & CORS configuration
│   └── package.json          # Backend dependencies and scripts
├── frontand/                 # React client application (retains repository naming)
│   ├── public/               # Public static assets
│   ├── src/                  # Application source code
│   │   ├── components/       # Reusable UI widgets, guards, terminal elements
│   │   ├── Pages/            # View pages (Home, Labs, Roadmap, Resources)
│   │   ├── store/            # Redux slices and global store configuration
│   │   ├── conf/             # Environment configuration mapping
│   │   ├── App.jsx           # Root layout and session listener
│   │   ├── index.css         # Design tokens and styling entry
│   │   └── main.jsx          # React DOM root and router definitions
│   ├── Supabase/             # Supabase client, database, and storage wrappers
│   ├── index.html            # Vite HTML template
│   ├── vite.config.js        # Vite bundler configuration
│   └── package.json          # Frontend dependencies and dev scripts
├── .gitignore                # Git exclusion patterns
└── README.md                 # Project documentation
```

> **Note on directory naming:** The frontend folder is named `frontand/` directly within the repository structure.

---

## Prerequisites

Ensure you have the following installed on your machine before running the application:

- **[Node.js](https://nodejs.org/)** (v18.x or higher recommended)
- **[npm](https://www.npmjs.com/)** (bundled with Node.js)
- **[Git](https://git-scm.com/)**
- A **[Supabase](https://supabase.com/)** account and project (for authentication, database tables, and storage buckets)

---

## Installation and Local Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username-or-org>/CRYX.git
cd CRYX
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontand/` directory using the reference in the [Environment Variables](#environment-variables) section below.

```bash
# On Linux / macOS
cp frontand/.env.example frontand/.env

# On Windows (PowerShell)
Copy-Item frontand/.env.example frontand/.env
```
*(If an `.env.example` is not present, manually create `frontand/.env` with your Supabase credentials).*

### 3. Install Dependencies

Install dependencies for both the frontend and backend applications:

```bash
# Install frontend dependencies
cd frontand
npm install

# Install backend dependencies
cd ../backend
npm install
cd ..
```

---

## Environment Variables

### Frontend (`frontand/.env`)

The frontend application requires connectivity to Supabase and the Express backend API. Configure these keys in `frontand/.env`:

| Variable | Description | Required |
| :--- | :--- | :---: |
| `VITE_APP_SUPABASE_PROJECT_URL` | The HTTPS URL of your Supabase project (e.g. `https://xyzcompany.supabase.co`) | Yes |
| `VITE_APP_SUPABASE_PUBLISHABLE_KEY` | Public Anon/Publishable API Key for client-side Supabase requests | Yes |
| `VITE_APP_DATABASE_URL` | Base project / database URL reference used in Supabase setup | Yes |
| `VITE_APP_RENDER_API` | Address of the backend API service (use `http://localhost:5000` for local testing) | Yes |

> [!CAUTION]
> **Never commit your `.env` file.** Keep secret keys out of client-side code. Do not expose privileged Supabase `service_role` keys in `frontand/.env`.

### Backend (`backend/.env` - Optional)

| Variable | Description | Required |
| :--- | :--- | :---: |
| `PORT` | Listening port for the Express application (defaults to `5000`) | Optional |
| `RENDER_EXTERNAL_URL` | Deployed URL used by the internal keep-alive ping script when hosted on Render | Optional |

---

## Available Scripts

### Frontend (`frontand/`)

From the `frontand/` folder, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server for the frontend. |
| `npm run server` | Starts the backend server using Nodemon from the frontend context. |
| `npm start` | Uses `concurrently` to launch **both** the frontend client and the backend server simultaneously. |
| `npm run build` | Compiles and bundles production-ready frontend assets into `frontand/dist/`. |
| `npm run preview` | Spins up a local preview server of the production build. |
| `npm run lint` | Runs ESLint to check for syntax issues and code style warnings. |

### Backend (`backend/`)

From the `backend/` directory:

| Command | Action |
| :--- | :--- |
| `npm start` | Executes `node server.js` to start the Express server on port `5000`. |

---

## Usage

### Running Locally

The easiest way to run the entire stack locally is using the root concurrent command in `frontand/`:

```bash
cd frontand
npm start
```

Alternatively, run each service in separate terminal windows:

**Terminal 1 (Backend API):**
```bash
cd backend
npm start
```
*Backend runs at `http://localhost:5000`.*

**Terminal 2 (Frontend Client):**
```bash
cd frontand
npm run dev
```
*Frontend runs at `http://localhost:5173` (or the port indicated in your console).*

Open your browser and navigate to `http://localhost:5173`.

---

## Deployment

The frontend and backend can be hosted independently:

### Frontend
- **Live Deployment:** [https://cryx-iota.vercel.app](https://cryx-iota.vercel.app)
- **Platforms:** [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Cloudflare Pages](https://pages.cloudflare.com/).
- **Root Directory:** `frontand`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** Provide all `VITE_APP_*` values in the hosting dashboard. Ensure your production site URL (`https://cryx-iota.vercel.app`) is added to your Supabase project's **Authentication -> URL Configuration -> Redirect URLs**.

### Backend
- **Platforms:** [Render](https://render.com/), [Railway](https://railway.app/), or any Node.js container environment.
- **Root Directory:** `backend`
- **Build / Start Command:** `npm start`
- **CORS Configuration:** Update `cors({ origin: [...] })` in `backend/server.js` to include your production frontend domain.

---

## Security Considerations

As a cybersecurity club platform, security best practices must be respected at all times:

- **Environment Hygiene:** Ensure `.env` and sensitive configurations are ignored by Git. Verify `.gitignore` before every commit.
- **Row Level Security (RLS):** Ensure RLS is enabled on all Supabase tables (`userprofile`, `memberprofile`, etc.). Write strict policies verifying `auth.uid() = id` so users can only modify their own telemetry.
- **Client Key Scoping:** Use only the Supabase `anon` / publishable key in frontend configuration. The `service_role` key must never be bundled into client-side code.
- **Input Sanitization:** Validate and sanitize all form fields and user-submitted links on both frontend and backend before database storage or DOM rendering.
- **CORS Policies:** Restrict backend CORS origins strictly to permitted domains in production.
- **Dependency Audits:** Regularly execute `npm audit` to identify and patch vulnerabilities across project dependencies.

---

## Contributing

We welcome contributions from CRYX club members and the MNIT Jaipur student community!

1. **Fork the Repository** to your own GitHub account.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/cyber-news-ticker
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add real-time cyber news ticker component"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/cyber-news-ticker
   ```
5. **Open a Pull Request** against the main repository branch with a clear summary of your updates.

---

## Development Guidelines

- Respect the established directory naming convention (`frontand/` and `backend/`).
- Follow consistent component naming and maintain dark/cyberpunk aesthetic guidelines.
- Never commit user credentials, database passwords, or private API keys.
- Keep commits descriptive and scoped to specific features or bug fixes.

---

## License

This project's license has not yet been explicitly specified. If you wish to reuse, redistribute, or contribute code outside of club activities, please verify permissions with the **CRYX** club coordinators and project maintainers.

---

## Acknowledgements and Contact

- **Club:** [CRYX — The InfoSec Club](https://cryx-iota.vercel.app/)
- **Institution:** [Malaviya National Institute of Technology (MNIT) Jaipur](https://www.mnit.ac.in/)
- **Community:** Thanks to all CRYX student coordinators, contributors, and faculty advisors advancing cybersecurity education.

For official inquiries, announcements, or club collaboration, please reach out via official CRYX student club communication channels at MNIT Jaipur.
