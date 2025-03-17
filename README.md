# Investment Strategy

A modern, responsive web application for visualizing and analyzing investment portfolios, built with React, TypeScript, and Tailwind CSS.

## Overview

Investment Strategy is a dashboard application designed to help users visualize their investment portfolio allocation, track stock performance, and analyze historical price data. It provides an intuitive interface for monitoring investments across different categories and comparing performance metrics.

## Features

- **Portfolio Overview**: View total portfolio value, YTD returns, and asset allocation
- **Interactive Charts**: Visualize portfolio allocation with interactive pie charts
- **Stock Holdings Table**: Detailed view of all stocks with current prices, changes, and allocation percentages
- **Historical Performance**: Line charts showing historical price data for individual stocks
- **Comparative Analysis**: Compare performance of multiple stocks over time
- **Responsive Design**: Optimized for desktop and mobile devices

## Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn UI
- **Charts**: Recharts
- **Package Management**: npm
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js (v22 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/diekotto/investment-strategy.git
cd investment-strategy
```

2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Main Components

### Portfolio Allocation (`PortfolioAllocation.tsx`)

Displays a pie chart showing the distribution of investments across different categories.

### Stock Table (`StockTable.tsx`)

Provides a detailed table of all stocks in the portfolio with key metrics.

### Stock Charts (`StockCharts.tsx`)

Offers visualization of historical stock prices and comparative performance analysis.

## Mock Data

The application currently uses mock data for development and demonstration purposes. The data structure can be found in `src/lib/mock-data.ts`. In a production environment, you would replace this with data from a real API or database.

## Customization

### Theme

The application uses Tailwind CSS with custom theming. Colors and other design tokens can be modified in `tailwind.config.ts`.

### Adding New Components

The project uses Shadcn UI components. To add new components, refer to the [Shadcn UI documentation](https://ui.shadcn.com/docs).

## Deployment Considerations

For deploying to AWS, consider the following options:

- **AWS Amplify**: Quick deployment with CI/CD pipeline integration
- **Amazon S3 + CloudFront**: Cost-effective static site hosting with CDN
- **AWS App Runner**: Fully managed service for containerized web applications

## Future Enhancements

Potential improvements for future versions:

- Integration with real financial data APIs
- User authentication and personalized portfolios
- Alerts and notifications for significant price changes
- Portfolio optimization recommendations
- Mobile app versions using React Native

## License

MIT License
