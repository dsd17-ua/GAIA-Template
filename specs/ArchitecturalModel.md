# Architectural Model

## C4 System Context

```mermaid
C4Context
    title System Context diagram for GAIA Match Management System

    Person(user, "Match Operator", "Operates the match controls.")
    System(backend, "Backend API", "FastAPI Service", "Handles match logic and state.")
    System(frontend, "Frontend SPA", "React/Vite App", "User interface for match management.")
    SystemDb(database, "Database", "PostgreSQL", "Persists match data.")

    Rel(user, frontend, "Uses")
    Rel(frontend, backend, "API Calls (JSON/HTTP)")
    Rel(backend, database, "SQL Queries")
```

## Internal Component Diagram (Backend)

```mermaid
graph TD
    subgraph Presentation
        MR[MatchRouter]
    end

    subgraph Application
        MS[MatchService]
    end

    subgraph Domain
        M[Match Entity]
        MR_Port[MatchRepository Port]
    end

    subgraph Infrastructure
        SMR[SQLMatchRepository]
        DB[(PostgreSQL)]
    end

    MR --> MS
    MS --> M
    MS --> MR_Port
    SMR ..|> MR_Port
    SMR --> DB
```
