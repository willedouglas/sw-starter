# SW Starter

A modern Next.js application that provides a search interface for the Star Wars universe, allowing users to search and explore information about movies and characters from the Star Wars franchise. The application is fully containerized with Docker for easy deployment and development.

### 🎯 What You Can Do

1. **Search Movies**: Find Star Wars films by title and view detailed information
2. **Search Characters**: Discover characters by name and explore their profiles
3. **View Details**: Access comprehensive information about each movie and character
4. **Navigate Seamlessly**: Smooth navigation between search results and detail pages

### 🛠️ Technology Stack

- **Frontend**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS 4 for modern, responsive design
- **API Integration**: Axios for reliable HTTP requests to SWAPI
- **Containerization**: Docker with multi-stage builds for optimization
- **Development**: Hot reloading with Turbopack for fast development cycles
- **Deployment**: Docker Compose for easy orchestration

### 🌐 API Integration

The application integrates with the [Star Wars API (SWAPI)](https://swapi.py4e.com/api) to provide:

- Real-time search results
- Comprehensive movie data (titles, opening crawls, character lists)
- Detailed character information (physical attributes, film appearances)
- Paginated results for large datasets

### 📊 Analytics & Statistics

The application includes a comprehensive analytics system that tracks search queries and provides:

- **Top 5 Search Queries**: Most popular searches with percentages
- **Average Response Time**: Performance metrics for API calls
- **Peak Usage Hours**: Most active time periods for searches
- **Real-time Updates**: Statistics recomputed every 5 minutes automatically
- **Historical Data**: Persistent tracking of all search queries

**API Endpoints:**

- `GET /api/statistics` - Retrieve current search statistics

## 🐳 Docker Setup

This application is fully containerized and can run in both development and production environments using Docker.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

## 🚀 Quick Start

### Development Mode (Recommended for Development)

```bash
# Start development environment with hot reloading
npm run docker:compose:up:dev

# Access the application
open http://localhost:3000
```

### Production Mode

```bash
# Start production environment
npm run docker:compose:up:prod

# Access the application
open http://localhost:3000
```

## 📖 Available Commands

### Docker Commands

| Command                           | Description                                  |
| --------------------------------- | -------------------------------------------- |
| `npm run docker:build`            | Build production Docker image                |
| `npm run docker:build:dev`        | Build development Docker image               |
| `npm run docker:run`              | Run production container                     |
| `npm run docker:run:dev`          | Run development container with hot reloading |
| `npm run docker:compose:up`       | Start all services                           |
| `npm run docker:compose:up:dev`   | Start development service only               |
| `npm run docker:compose:up:prod`  | Start production service only                |
| `npm run docker:compose:down`     | Stop all services                            |
| `npm run docker:compose:down:dev` | Stop development services                    |
| `npm run docker:logs`             | View logs for all services                   |
| `npm run docker:logs:dev`         | View logs for development service            |
| `npm run docker:clean`            | Clean unused Docker resources                |
| `npm run docker:clean:all`        | Clean all Docker resources                   |

### Traditional Commands

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start development server locally |
| `npm run build` | Build for production             |
| `npm run start` | Start production server locally  |
| `npm run lint`  | Run ESLint                       |

## 🏗️ Architecture

### Docker Images

- **Production**: `sw-starter` - Optimized for production with standalone output
- **Development**: `sw-starter:dev` - Includes dev dependencies and hot reloading

### Services

- **Production Service**: Runs on port 3000
- **Development Service**: Runs on port 3000 with volume mounts for hot reloading

### Health Checks

The application includes a health check endpoint at `/api/health` for Docker health monitoring.

### Analytics Access

Access search analytics by calling the `/api/statistics` endpoint directly to retrieve real-time statistics and performance metrics.

## 🔧 Configuration

### Environment Variables

| Variable                     | Description               | Default                                   |
| ---------------------------- | ------------------------- | ----------------------------------------- |
| `NODE_ENV`                   | Environment mode          | `production` (prod) / `development` (dev) |
| `NEXT_TELEMETRY_DISABLED`    | Disable Next.js telemetry | `1`                                       |
| `NEXT_PUBLIC_SEARCH_API_URL` | Search API URL            | `https://swapi.py4e.com/api`              |

### Ports

- **Development**: `http://localhost:3000`
- **Production**: `http://localhost:3000`

## 📁 Project Structure

```
sw-starter/
├── Dockerfile                # Production Docker configuration
├── Dockerfile.dev            # Development Docker configuration
├── docker-compose.yml        # Main Docker Compose configuration
├── docker-compose.dev.yml    # Development Docker Compose configuration
├── .dockerignore             # Files excluded from Docker build
├── src/
│   ├── app/
│   │   ├── api/health/       # Health check endpoint
│   │   ├── movies/           # Movie pages
│   │   ├── people/           # People pages
│   │   └── ...
│   ├── components/           # React components
│   ├── modules/              # Feature modules
│   ├── services/             # API services
│   └── utils/                # Utility functions
└── package.json              # Dependencies and scripts
```

## 🛠️ Development Workflow

### 1. Start Development Environment

Via Docker:

```bash
npm run docker:compose:up:dev
```

Or if you wanna run it locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 2. Make Changes

Edit your code in your local editor. Changes will automatically reload in the container.

### 3. View Logs

```bash
npm run docker:logs:dev
```

### 4. Stop Development

```bash
npm run docker:compose:down:dev
```

## 🚀 Production Deployment

### 1. Build and Start Production

```bash
npm run docker:compose:up:prod
```

### 2. Verify Deployment

```bash
# Check health endpoint
curl http://localhost:3000/api/health

# View logs
npm run docker:logs
```

### 3. Stop Production

```bash
npm run docker:compose:down
```
