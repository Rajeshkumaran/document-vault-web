# Document Vault Web

A modern, feature-rich document management and viewing application built with Next.js 15 and React 19. This application provides a comprehensive solution for uploading, organizing, and viewing various document types with advanced features like AI-powered summaries, multiple view modes, and intuitive navigation.

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd document-vault-web
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000 (backend server runs in the port by default)

```

### Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The page auto-updates as you edit the files thanks to Next.js hot reload functionality.

## Technologies Used

This project is built with modern web technologies:

### Core Framework

- **[Next.js 15.4.6](https://nextjs.org)** - React framework with App Router, providing server-side rendering, routing, and optimization features
- **[React 19.1.0](https://reactjs.org)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript with static type checking

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework for rapid UI development
- **[Lucide React](https://lucide.dev)** - Beautiful and customizable SVG icons

### Data Management & API

- **[Axios](https://axios-http.com)** - Promise-based HTTP client for API requests

### Document Processing & Viewing

- **[React-PDF](https://projects.wojtekmaj.pl/react-pdf/)** - React wrapper for PDF.js
- **[React Markdown](https://remarkjs.github.io/react-markdown/)** - Markdown renderer for React with GitHub Flavored Markdown support

### Development Tools

- **[ESLint](https://eslint.org)** - Code linting and quality assurance
- **[PostCSS](https://postcss.org)** - CSS transformation and optimization

## ✨ Key Features

### 📁 Document Management

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Folder Organization**: Create and organize documents in hierarchical folder structures
- **Bulk Operations**: Upload multiple files simultaneously with progress tracking
- **File Type Support**: PDF, Markdown, Images, and extensible for other document types

### 👀 Document Viewing

- **Dual View Modes**:
  - **Tree View**: Traditional hierarchical folder structure
  - **Grid View**: Modern folder/file grid layout with file previews
- **Advanced PDF Viewer**: Full-featured PDF viewing with zoom, page navigation
- **Markdown Renderer**: Rich markdown display with GitHub Flavored Markdown support
- **File Details**: Comprehensive file metadata and properties

### 🤖 AI-Powered Features

- **Document Summaries**: AI-generated summaries for uploaded documents

### 🔧 User Experience

- **Real-time Updates**: Live progress tracking for uploads and operations
- **Navigation History**: Breadcrumb navigation with back/forward support

## 🏗️ Project Structure

```text
src/
├── app/                    # Next.js App Router pages
│   ├── documents/          # Document listing and details pages
│   ├── settings/           # Application settings
│   └── vault/              # Main vault interface
├── components/             # Reusable UI components
│   ├── atoms/              # Basic UI elements (Button, Table, etc.)
│   ├── documents/          # Document-specific components
│   ├── layout/             # Layout components
│   └── ui/                 # UI kit components
├── features/               # Feature-specific modules
│   ├── document-explorer/  # File tree and upload functionality
│   │   ├── components/     # Explorer UI components
│   │   ├── hooks/          # Document data & upload hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Helper utilities
│   ├── document-view/      # Document viewing and rendering
│   │   ├── components/     # Viewer components (PDF, Markdown, etc.)
│   │   ├── hooks/          # Navigation and data hooks
│   │   └── utils/          # File type detection and helpers
│   └── vault/              # Main vault features
├── hooks/                  # Global React hooks
├── lib/                    # Core utilities and configurations
│   ├── axiosClient.ts      # API client setup
│   ├── constants.ts        # Application constants
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # General utility functions
└── styles/                 # Global styles and CSS
```

## 🚀 Scripts

- `npm run dev` / `yarn dev` - Start development server with Turbopack
- `npm run build` / `yarn build` - Build the application for production
- `npm run start` / `yarn start` - Start the production server
- `npm run lint` / `yarn lint` - Run ESLint for code quality checks

## 📡 API Integration

This application integrates with a backend API for document management. Key endpoints include:

- **Document Management**: Upload, retrieve, and organize documents
- **Folder Operations**: Create, navigate, and manage folder structures
- **AI Services**: Generate document summaries and insights
- **File Processing**: Handle various file types and conversions

The API client is configured in `src/lib/axiosClient.ts` with proper error handling and request interceptors.

## 🔧 Architecture & Patterns

### Feature-Based Architecture

- Each feature is self-contained with its own components, hooks, services, and utilities
- Promotes code reusability and maintainability
- Clear separation of concerns between features

### Component Design System

- **Atomic Design**: Components are organized from atoms to complex organisms
- **Compound Components**: Complex UI elements built from smaller, reusable parts
- **Custom Hooks**: Business logic separated from UI components

### State Management

- React hooks for local state management
- Custom hooks for shared business logic
- Context providers for global state when needed

## 🎨 Design System

- **Tailwind CSS 4**: Latest version with improved performance and features
- **Consistent Theming**: Unified color palette and spacing system
- **Icon System**: Lucide React icons for consistent visual language

## 🚀 Deployment

This application can be deployed on various platforms:

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build the application
npm run build

# Build Docker image
docker build -t document-vault-web .

# Run container
docker run -p 3000:3000 document-vault-web
```


