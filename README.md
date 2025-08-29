# Health+ 

## About the Project
Health+ is a modern, glassmorphic dashboard web application for healthcare professionals. It features a clean, responsive UI, authentication flow, and patient management, designed for Indian medical context. The app leverages React, TypeScript, Tailwind CSS, and shadcn/ui for rapid development and beautiful design.

## Features & Functionality
- **Glassmorphic Sidebar**: Fully curved, green-themed, with navigation and functional logout
- **Authentication**: Login, logout, and doctor registration (in-memory/localStorage)
- **Patient Management**: Responsive cards, Indian data, compact layout
- **Settings Page**: Profile, notifications, privacy, system preferences, backup simulation
- **Branding**: Custom favicon, meta tags, and consistent color palette
- **Routing**: All routes accessible, no route protection

## Technology Stack
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide
- **Animation**: Framer Motion
- **Routing**: react-router-dom
- **State/Storage**: In-memory (localStorage)

## Architecture Overview
- **Component-Based**: Modular React components for sidebar, cards, forms, etc.
- **Pages**: Each route/page is a separate file under `src/pages/`
- **UI Library**: shadcn/ui for reusable UI elements
- **State Management**: Local state and localStorage for authentication
- **Responsive Design**: Mobile-first, adaptive layouts

## File Structure
```
public/
  fevicon.png         # App favicon
  placeholder.svg     # Default avatar
src/
  App.tsx            # Main app, routing
  main.tsx           # Entry point
  components/
    DashboardSidebar.tsx  # Sidebar navigation
    DashboardLayout.tsx   # Layout wrapper
    ...
    ui/              # shadcn/ui components
  pages/
    Dashboard.tsx    # Main dashboard
    Patients.tsx     # Patient management
    Login.tsx        # Login page
    Logout.tsx       # Logout logic
    Register.tsx     # Doctor registration
    Settings.tsx     # User/app settings
    ...
  hooks/             # Custom React hooks
  lib/               # Utility functions
index.html           # HTML template, favicon/meta
README.md            # Project documentation
```

## How It Works
- **Login/Register**: Doctors can log in or register; details stored in localStorage
- **Sidebar**: Navigation links, logout button (functional)
- **Dashboard**: Overview, stats, recent activity
- **Patients**: List and manage patients
- **Settings**: Update profile, notification, privacy, and system settings
- **Logout**: Clears session, redirects to login

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open in browser at `http://localhost:3000` (or as shown in terminal)


## License
MIT

---