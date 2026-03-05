# Stock Market Analyzer - Frontend

This is the Next.js frontend for the Stock Market Analyzer dashboard. Developed with the Next.js App Router, TypeScript, and modern styling architectures via Tailwind CSS.

## Features

- **Next.js 14 (App Router)**: Fast, server-rendered and client-hydrated React framework.
- **Dynamic Charting**: Recharts for rendering highly responsive financial charts.
- **Modern UI**: Styled with Tailwind CSS and enhanced with Framer Motion (animations) and Lucide React (icons).
- **SEO Optimized**: Standard Next.js metadata implemented for improved discoverability.

## Getting Started

First, make sure you have installed the necessary dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live dashboard.

## Development Strategy

- **`app/`**: Contains the Next.js App Router layouts, pages, and metadata.
- **`components/`**: Features decoupled React components separated into logic-heavy pieces (e.g., `StockChart`) and purely presentational elements.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
