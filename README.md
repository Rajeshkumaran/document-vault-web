# Document Vault Web

A modern document management and viewing application built with Next.js. This application allows users to upload, organize, and view various document types including PDFs (other types can be extended).

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd document-vault-web
```

2. Install dependencies:

```bash
npm install
# or
yarn install
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
- **[TanStack Table](https://tanstack.com/table)** - Powerful table and data grid library for React

### Document Processing & Viewing

- **[React-PDF](https://projects.wojtekmaj.pl/react-pdf/)** - React wrapper for PDF.js
- **[React Markdown](https://remarkjs.github.io/react-markdown/)** - Markdown renderer for React

### Development Tools

- **[ESLint](https://eslint.org)** - Code linting and quality assurance
- **[PostCSS](https://postcss.org)** - CSS transformation and optimization

## Features

- 📁 Document upload and management
- 👀 Document viewer (PDF) with AI generated summary 
- 📊 Data tables


## Project Structure

- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable UI components
- `/src/features` - Feature-specific components and logic
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility libraries and configurations
- `/src/styles` - Global styles and Tailwind configuration

## Scripts

- `npm run dev` / `yarn dev` - Start development server with Turbopack
- `npm run build` / `yarn build` - Build the application for production
- `npm run start` / `yarn start` - Start the production server
- `npm run lint` / `yarn lint` - Run ESLint for code quality checks

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://reactjs.org/docs) - Learn React fundamentals
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Explore Tailwind utility classes
- [TanStack Table Documentation](https://tanstack.com/table/latest) - Advanced table features

