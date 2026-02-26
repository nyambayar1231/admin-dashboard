# Admin Dashboard

A modern admin dashboard for e-commerce built with React, TypeScript, TanStack Query, and Tailwind CSS.

## Features

- **Dashboard Overview**: View key metrics and stats
- **Products Management**: CRUD operations with sorting, filtering, and search
- **Categories Management**: Organize products with categories
- **Responsive Design**: Works on desktop and mobile
- **Modern Stack**: React 18, TypeScript, TanStack Query, TanStack Table

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Powerful table component
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable components
├── layouts/         # Layout components
├── pages/           # Page components
├── hooks/           # Custom React hooks (TanStack Query)
├── lib/             # Utilities and API
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Features

### Dashboard
- Real-time statistics
- Recent activity feed
- Quick action links

### Products
- Create, read, update, delete products
- Search and filter
- Sortable columns
- Stock alerts
- Status management (Active, Inactive, Draft)

### Categories
- Organize products
- Slug-based URLs
- Product count per category
- CRUD operations

## License

MIT
