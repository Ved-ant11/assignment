# Mini Task Manager

A simple, modern, full-stack Mini Task Manager application built with Next.js (App Router), Express, and MongoDB.

## Features
- **Add a Task**: Quickly jot down tasks.
- **View All Tasks**: See all your tasks in a beautiful, modern UI.
- **Mark Complete**: Toggle tasks between active and completed states.
- **Delete Task**: Remove tasks you no longer need.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router), TypeScript, TailwindCSS, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript, Zod (for validation).
- **Database**: MongoDB (Mongoose ODM).

## Architecture Decisions
- **Monorepo Style Folder Structure**: Separated into `frontend` and `backend` directories for clarity and easy deployment.
- **Global Error Handling**: The backend features a centralized error-handling middleware that catches `ZodError` validation issues and returns appropriate status codes.
- **Zod Validation**: Input validation is handled robustly on the backend using `zod` to ensure data integrity before it ever touches MongoDB.
- **Client-Side Data Fetching**: Next.js is configured for client-side fetching in this small app to allow real-time UI updates (adding, deleting, toggling) without complex server-state management. 
- **Modern UI**: Uses Tailwind CSS with a clean, Apple-like aesthetic (rounded corners, soft shadows, dark mode support).

## Running the Application

### Prerequisites
- Node.js (v18+)
- Local MongoDB running on port 27017 (or a MongoDB Atlas URI)

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on port 3001):
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server (runs on port 3000):
   ```bash
   npm run dev
   ```

### Accessing the App
Open your browser and navigate to `http://localhost:3000`.

## Video Walkthrough / Screen Recording Script
*(If you are recording a video for this assignment, consider using this script as a guide!)*

1. **Introduction (1 min):** Hello, this is my Mini Task Manager. It is a full-stack application using Next.js on the frontend and Express/Node.js on the backend.
2. **Architecture Overview (2 mins):** We have two separate folders. The backend uses Mongoose to connect to MongoDB and handles routes to Get, Create, Update, and Delete tasks. I am using Zod to validate input data (e.g., ensuring task titles aren't empty).
3. **Frontend Demo (3 mins):** Here is the UI. As you can see, I can add a task, toggle it as completed, and delete it. The UI updates optimistically and features a modern aesthetic with Tailwind CSS.
4. **Code Highlights (2 mins):** Let me show you the `task.controller.ts` where we handle validations, and the `page.tsx` on the frontend where we consume the API.
5. **Conclusion (1 min):** Thank you for watching!
