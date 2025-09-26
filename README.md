# Taskify

A full-stack task management application built with **React**, **Express**, and **Clerk authentication**. Users can create, update, delete, and complete tasks with a responsive and modern UI. 

---

## Features

- User authentication with **Clerk**
- Create, edit, delete, and complete tasks
- Responsive design for desktop and mobile
- Task status filtering (active/completed)
- Clean and modern UI with Tailwind CSS

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** Clerk
- **API Requests:** Axios 

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB 
- Clerk account with API keys

---

## Project Structure

```
task-manager/
├─ client/           # React frontend
├─ server/           # Express backend
│  ├─ config/        # Database config
│  ├─ controllers/   # API controllers
│  ├─ routes/        # API routes
│  └─ index.js       # Express server entry
├─ README.md
└─ package.json
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [https://github.com/<your-username>/task-manager.git](https://github.com/saksham021012/Taskify.git)
cd task-manager
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file with:

```
PORT=4000
MONGO_URI=<your-mongodb-uri>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

Run the backend:

```bash
npm run dev
```

Server should start on `http://localhost:4000` and connect to MongoDB.

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file with:

```
VITE_REACT_APP_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_API_BASE_URL=http://localhost:4000
```

Run the frontend:

```bash
npm run dev
```

Frontend should start on `http://localhost:5173`.

---

## Scripts

**Backend:**

```bash
npm run dev      # Start server with nodemon
npm start        # Start production server
```

**Frontend:**

```bash
npm run dev      # Start Vite development server
npm run build    # Build production version
npm run preview  # Preview production build locally
```



