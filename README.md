# Pokemon API Wrapper

A clean architecture Node.js/TypeScript API that wraps the [PokeAPI](https://pokeapi.co/) with local caching and pagination support. Built using Express.js, TypeORM, and PostgreSQL.

## Features

- **Clean Architecture**: Implements domain-driven design with clear separation of concerns
- **Pokemon Data Fetching**: Retrieve Pokemon information from the official PokeAPI
- **Local Caching**: Store Pokemon data in PostgreSQL database for improved performance
- **Pagination Support**: Efficiently browse through Pokemon collections
- **API Authentication**: Secure endpoints with API key authentication
- **Docker Support**: Containerized deployment with Docker Compose
- **Database Migrations**: Version-controlled database schema management

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- PostgreSQL 14.7 or higher
- Docker and Docker Compose (for containerized deployment)
- npm or yarn package manager

## Quick Start

### Option 1: Using Docker (Recommended)

1. **Build the Docker containers:**
   ```bash
   npm run docker:build
   ```
   Builds the API backend and PostgreSQL database containers using Docker Compose.

2. **Start all services:**
   ```bash
   npm run docker:start
   ```
   Starts both the API server (port 8000) and PostgreSQL database (port 5434) in detached mode.

3. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```
   Executes all pending database migrations to set up the schema.

4. **Test the API:**
   ```bash
   curl -H "x-api-key: test" http://localhost:8000/pokemon/1
   ```

### Option 2: Local Development

1. **Set up PostgreSQL database:**
   - Install PostgreSQL locally
   - Create a database named `postgres` (or configure your preferred name)
   - Ensure PostgreSQL is running on default port 5432

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASS=your_password
   DATABASE_NAME=postgres
   API_KEY=your_api_key
   PORT=3000
   ```

4. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

5. **Start the development server:**
   ```bash
   npm run debug
   ```
   Starts the server with hot-reload on file changes.

## API Endpoints

All endpoints require the `x-api-key` header for authentication.

### Get Pokemon by ID or Name
```http
GET /pokemon/:identifier
```

**Parameters:**
- `identifier` (string|number): Pokemon ID (1-1010) or name (e.g., "pikachu")

**Headers:**
- `x-api-key`: Your API key

**Example:**
```bash
curl -H "x-api-key: test" http://localhost:3000/pokemon/25
curl -H "x-api-key: test" http://localhost:3000/pokemon/pikachu
```

### Get Paginated Pokemon List
```http
GET /pokemon?limit=20&offset=0
```

**Query Parameters:**
- `limit` (number, required): Number of Pokemon to return (minimum: 1)
- `offset` (number, required): Number of Pokemon to skip (minimum: 0)

**Headers:**
- `x-api-key`: Your API key

**Example:**
```bash
curl -H "x-api-key: test" "http://localhost:3000/pokemon?limit=10&offset=0"
```

## Available Commands

### Development Commands

- **`npm run start`**: Start the production server
  ```bash
  npm run start
  ```

- **`npm run debug`**: Start development server with hot-reload
  ```bash
  npm run debug
  ```
  Uses `tsx --watch` to automatically restart the server when files change.

### Code Quality Commands

- **`npm run lint`**: Run ESLint to check and fix code quality issues
  ```bash
  npm run lint
  ```
  Analyzes TypeScript files in `src`, `apps`, `libs`, and `test` directories.

- **`npm run format`**: Format code using Prettier
  ```bash
  npm run format
  ```
  Formats all TypeScript files in `src` and `test` directories.

- **`npm run test`**: Run Jest unit tests
  ```bash
  npm run test
  ```
  Executes all test files matching the pattern `**/*.{spec,test}.{ts,js}`.

### Database Management Commands

- **`npm run db:migrate`**: Run pending database migrations
  ```bash
  npm run db:migrate
  ```
  Applies all pending migrations to update the database schema.

- **`npm run db:revert`**: Revert the last database migration
  ```bash
  npm run db:revert
  ```
  Rolls back the most recently applied migration.

- **`npm run db:generate`**: Generate a new migration based on entity changes
  ```bash
  npm run db:generate -- --name="migration-name"
  ```
  Creates a new migration file comparing current entities with database schema.

- **`npm run db:create`**: Create a new empty migration file
  ```bash
  npm run db:create -- --name="migration-name"
  ```
  Generates a new migration file template for manual schema changes.

- **`npm run db:show-migrations`**: Display migration status
  ```bash
  npm run db:show-migrations
  ```
  Shows which migrations have been applied and which are pending.

- **`npm run db:drop`**: Drop all database tables
  ```bash
  npm run db:drop
  ```
  ⚠️ **Warning**: This will permanently delete all data in the database.

### Docker Commands

- **`npm run docker:build`**: Build Docker containers
  ```bash
  npm run docker:build
  ```
  Builds the API and database containers defined in `tools/docker/docker-compose.yml`.

- **`npm run docker:start`**: Start all Docker services
  ```bash
  npm run docker:start
  ```
  Starts API server (port 8000) and PostgreSQL database (port 5434) in detached mode.

- **`npm run docker:start:db`**: Start only the database container
  ```bash
  npm run docker:start:db
  ```
  Useful when you want to run the API locally but use the containerized database.

- **`npm run docker:stop`**: Stop all Docker containers
  ```bash
  npm run docker:stop
  ```
  Gracefully stops all running containers without removing volumes.

- **`npm run docker:delete`**: Stop containers and remove volumes
  ```bash
  npm run docker:delete
  ```
  ⚠️ **Warning**: This will permanently delete all database data stored in Docker volumes.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port number |
| `DATABASE_HOST` | - | PostgreSQL host |
| `DATABASE_PORT` | `5432` | PostgreSQL port |
| `DATABASE_USER` | - | Database username |
| `DATABASE_PASS` | - | Database password |
| `DATABASE_NAME` | - | Database name |
| `API_KEY` | `AnyApiKey` | API authentication key |
| `NODE_ENV` | - | Environment (development/production) |

## Project Structure

```
src/
├── adapters/           # Interface definitions and contracts
├── application/        # Application layer (controllers, presenters, validation)
│   ├── controllers/    # HTTP request handlers
│   ├── middlewares/    # Express middlewares
│   ├── presenters/     # Response formatters
│   └── validation/     # Request validation schemas
├── domain/            # Business logic layer
│   ├── entities/      # Database entities
│   └── use-cases/     # Business use cases
├── infrastructure/    # External services and implementations
│   ├── poke-api/     # PokeAPI integration
│   ├── routes/       # Express route definitions
│   └── validation/   # Validation implementations
└── utils/            # Shared utilities
```

## Development Workflow

1. **Set up the development environment:**
   ```bash
   npm install
   npm run docker:start:db  # Start database only
   npm run db:migrate       # Apply migrations
   ```

2. **Start development server:**
   ```bash
   npm run debug
   ```

3. **Make changes and validate:**
   ```bash
   npm run lint    # Check code quality
   npm run format  # Format code
   npm run test    # Run tests
   ```

4. **Database changes:**
   ```bash
   # After modifying entities
   npm run db:generate -- --name="your-migration-name"
   npm run db:migrate
   ```

## Troubleshooting

### Common Issues

**Connection refused errors:**
- Ensure PostgreSQL is running on the correct port
- Check environment variables in `.env` file
- For Docker: ensure containers are started with `npm run docker:start`

**Migration errors:**
- Verify database connection settings
- Check if database exists and is accessible
- Review migration files for syntax errors

**API authentication errors:**
- Ensure `x-api-key` header is included in requests
- Verify the API key matches the `API_KEY` environment variable

**Docker issues:**
- Check if Docker daemon is running
- Ensure ports 8000 and 5434 are not in use by other applications
- Try rebuilding containers: `npm run docker:delete && npm run docker:build`

### Useful Debug Commands

```bash
# Check container status
docker ps

# View container logs
docker logs poke-postgres-db

# Access database directly
docker exec -it poke-postgres-db psql -U user -d poke_db

# Check migration status
npm run db:show-migrations
```