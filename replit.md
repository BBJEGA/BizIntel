# BizIntel Feedback Platform

## Overview
A professional B2B SaaS feedback management platform built with React, Vite, and Firebase. Organizations can create custom feedback forms, collect responses via shareable public links, and analyze complaints vs suggestions with real-time analytics dashboards.

## Recent Changes
**Date: October 28, 2025**
- ✅ Task 1 Complete: Schema & Frontend
  - Generated hero image for landing page
  - Defined TypeScript interfaces for Organization, Form, and Feedback
  - Built all pages: Landing, Register, Login, Dashboard, Create Form, Public Feedback Form
  - Implemented complete design system following design_guidelines.md
  - All components use shadcn UI library with proper styling and interactions

## Tech Stack
**Frontend:**
- React 18 with Vite
- TypeScript for type safety
- Wouter for routing
- TanStack Query for data fetching
- shadcn/ui + Radix UI for components
- Tailwind CSS for styling
- Lucide React for icons

**Backend:**
- Firebase Authentication (email/password)
- Firebase Firestore Database
- Firebase SDK for JavaScript

## Project Architecture

### Pages
- `/` - Landing page with hero, features, how it works sections
- `/register` - Organization registration
- `/login` - Login page
- `/dashboard` - Analytics dashboard with sidebar navigation
- `/create-form` - Create and manage feedback forms
- `/form/:formId` - Public feedback submission page

### Data Models

**Organization:**
```typescript
{
  id: string;
  name: string;
  email: string;
  createdAt: number;
}
```

**Form:**
```typescript
{
  id: string;
  orgId: string;
  title: string;
  description: string;
  createdAt: number;
}
```

**Feedback:**
```typescript
{
  id: string;
  formId: string;
  orgId: string;
  message: string;
  category: "Complaint" | "Suggestion";
  anonymous: boolean;
  createdAt: number;
}
```

### Firebase Configuration
The app uses Firebase for authentication and database. Configuration is stored in `client/src/lib/firebase.ts`:
- Project ID: bizintelenterprise-63724
- Auth Domain: bizintelenterprise-63724.firebaseapp.com

### Design System
Following professional SaaS design patterns inspired by Linear, Notion, and Stripe:
- **Typography:** Inter font family
- **Colors:** Primary blue (#3B82F6), structured muted backgrounds
- **Spacing:** Consistent 6, 8, 12, 16, 24, 32 spacing scale
- **Components:** Shadcn UI with custom elevation system
- **Layout:** Sidebar navigation for dashboard, max-w-7xl containers

## User Flow
1. **Registration:** Organizations sign up with name, email, password
2. **Login:** Existing organizations authenticate
3. **Dashboard:** View analytics, total feedback, complaints vs suggestions charts
4. **Create Form:** Build custom feedback forms with title and description
5. **Share Link:** Copy shareable public link for feedback form
6. **Public Submission:** Anyone can submit feedback via public link (anonymous option)
7. **View Feedback:** Dashboard shows all feedback with filtering by category

## Features
✅ **Phase 1 Complete - Frontend:**
- Beautiful landing page with hero section
- Registration and login forms with validation
- Dashboard with metrics cards and bar charts
- Create and manage feedback forms
- Public feedback submission page
- Tab-based feedback filtering (All, Complaints, Suggestions)
- Anonymous feedback option
- Responsive design across all breakpoints

🚧 **Phase 2 In Progress - Backend:**
- Firebase Authentication setup
- Firestore database collections
- CRUD operations for forms and feedback
- Real-time data synchronization

📋 **Future Enhancements:**
- Form editing and deletion
- Advanced filtering and search
- Email notifications
- Export feedback data (CSV/PDF)
- Advanced analytics with trends

## Development Notes
- The frontend is 100% complete with mock data
- All forms include proper validation using Zod schemas
- Components follow accessibility best practices (WCAG AA)
- Design guidelines strictly followed for visual excellence
- All interactive elements have data-testid attributes for testing
