🔗 TinyLink — Modern URL Shortener (Next.js + Tailwind + PostgreSQL/Neon)

TinyLink is a modern, production-ready URL shortener built with Next.js, Tailwind CSS, and a PostgreSQL (Neon) database.

It supports creating short links, deleting them, redirecting users, and viewing stats — all inside a clean dashboard.

✨ Features

🚀 Next.js Pages Router

🎨 Tailwind CSS UI

🗄️ PostgreSQL (Neon)

🔗 Create short URLs

🧹 Delete URLs

📊 Track clicks & last clicked

🔀 Auto redirect /abc123

📈 Stats page /code/:code


Project Structure
tinylink/
├─ package.json
├─ next.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ tailwind.css
├─ .env.example
├─ migrations/
│  └─ 001_create_links.sql
├─ lib/
│  ├─ db.js
│  └─ validation.js
├─ pages/
│  ├─ _app.js
│  ├─ index.js
│  ├─ healthz.js
│  ├─ [code].js
│  ├─ code/
│  │  └─ [code].js
│  └─ api/
│     ├─ links/
│     │  ├─ index.js
│     │  └─ [code].js
│     └─ _healthz.js
├─ components/
│  ├─ AddLinkForm.js
│  ├─ LinksTable.js
│  └─ Layout.js
├─ styles/
│  └─ globals.css


🛠️ Tech Stack
Tool          	Purpose
Next.js	        Fullstack app + APIs
Tailwind CSS    UI styling
PostgreSQL    	Database
Neon.tech     	Serverless PostgreSQL
SWR	            Client-side data fetching


Installation
1️⃣ Clone the repo
git clone https://github.com/your-username/tinylink.git
cd tinylink

2️⃣ Install dependencies
npm install

3️⃣ Create .env
cp .env.example .env

4️⃣ Add your Neon PostgreSQL connection string

Get this from neon.tech → Project → Connection String:

DATABASE_URL=postgres://user:password@host:5432/dbname
NEXT_PUBLIC_BASE_URL=http://localhost:3000

🗄️ Database Setup (PostgreSQL)

Run this in your Neon SQL editor:

CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  target TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

▶️ Start Development Server
npm run dev


🚀API Endpoints
Method    	Endpoint          	Description
GET       	/api/links         	Fetch all links
POST      	/api/links	        Create new short link
GET       	/api/links/:code	  Fetch one link
DELETE	    /api/links/:code	  Delete link
GET	        /:code	            Public redirect
GET	        /code/:code       	Stats page
GET	        /healthz	          Health check

🚀 Deployment (Vercel + Neon)
Step 1 — Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/tinylink.git
git push -u origin main

Step 2 — Deploy on Vercel

Import GitHub repo

Add environment variables:

DATABASE_URL=postgres://...
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app

Step 3 — Done 🎉

Your URL shortener is live.
