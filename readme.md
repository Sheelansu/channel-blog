# 📺 Channel Blog

A full-stack blogging platform built with React, Hono, Cloudflare Workers, and Prisma. The project follows a shared package architecture, where common Zod schemas and TypeScript types are published as an npm package and reused across both the frontend and backend.

## 📁 Project Structure

```text
channel-blog/
├── frontend/   # React application
├── backend/    # Hono API on Cloudflare Workers
└── common/     # Shared npm package (Zod schemas & TS types)
```

## ✨ Features

- 🔐 User Authentication
- 📝 Create & Read Blogs
- 🌐 REST API
- ☁️ Cloudflare Workers Deployment
- ⚡ Edge Runtime with Hono
- 🗄️ Prisma ORM + Prisma Accelerate
- ✅ Shared Zod Validation
- 🏷️ Shared TypeScript Types
- 📦 Common Package Published to npm
- 📱 Responsive Frontend

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- JavaScript
- CSS / Tailwind CSS

### Backend
- Hono
- Cloudflare Workers
- Prisma ORM
- Prisma Accelerate
- Zod
- bcryptjs

### Shared Package
- TypeScript
- Zod
- npm

## 🚀 Getting Started

```bash
git clone <your-repository-url>
cd channel-blog
```

Install dependencies for each package:

```bash
cd frontend && npm install
cd ../backend && npm install
cd ../common && npm install
```

Run the frontend:

```bash
cd frontend
npm run dev
```

Run the backend:

```bash
cd backend
npm run dev
```

Deploy the backend:

```bash
npm run deploy
```

## 📦 Repositories

- **Frontend:** React application
- **Backend:** Hono API deployed on Cloudflare Workers
- **Common:** Shared npm package containing Zod schemas and TypeScript types

## 👨‍💻 Author

**Sheelansu**
