# Basic Task Manager (C# .NET 8 + React + TypeScript)

## Overview
A simple full-stack Task Manager with a .NET 8 Web API backend and a React + TypeScript frontend styled with TailwindCSS. Tasks are stored in-memory on the server and synced with localStorage on the client. Features include add, toggle complete, delete, and filter (All / Active / Completed).

## Tech Stack
- Backend: .NET 8 Web API (in-memory)
- Frontend: React + TypeScript + Vite
- UI: TailwindCSS
- API: Axios

## Monorepo Structure

```
backend/
  TaskManager.Api/
frontend/
  src/
```

## Prerequisites
- .NET SDK 8
- Node.js LTS (>=18)
- Git

On Windows (PowerShell):
```powershell
winget install --id Microsoft.DotNet.SDK.8 --source winget --accept-package-agreements --accept-source-agreements
winget install --id OpenJS.NodeJS.LTS --source winget --accept-package-agreements --accept-source-agreements
winget install --id Git.Git --source winget --accept-package-agreements --accept-source-agreements
```

## Getting Started

### 1) Backend
```powershell
cd backend/TaskManager.Api
# Restore & run
dotnet restore
dotnet run --urls http://localhost:5000
```
- API base: `http://localhost:5000/api`
- Endpoints:
  - GET `/tasks`
  - POST `/tasks` { description }
  - PUT `/tasks/{id}` { isCompleted }
  - DELETE `/tasks/{id}`

### 2) Frontend
```powershell
cd frontend
npm install
# Optional: set a custom API base
# echo VITE_API_BASE=http://localhost:5000 > .env.local
npm run dev
```
- Opens at `http://localhost:5173`

## Deployment
- Backend: Deploy to Render, Azure App Service, etc. Ensure CORS allows the frontend origin.
- Frontend: Deploy to Vercel/Netlify. Set `VITE_API_BASE` env to your backend URL.

## GitHub
```powershell
cd C:\Users\manje\assignment1
git init
git add .
git commit -m "feat: basic task manager backend and frontend"
# Create a new GitHub repo named e.g. basic-task-manager
# Then set remote and push:
git remote add origin https://github.com/<your-username>/basic-task-manager.git
git branch -M main
git push -u origin main
```

## Notes
- Data resets when backend restarts (in-memory). Client also persists to localStorage for UX.
- Swagger UI available in Development at `/swagger` when running backend.



