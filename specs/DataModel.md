# Data Model

## Entity Relationship Diagram

```mermaid
erDiagram
    MATCH {
        UUID id PK
        string home_team
        string visitor_team
        datetime start_time
        int duration_half
        int current_half
        bool is_active
        datetime last_start_ts
        int accumulated_time_ms
        bool is_running
    }
```
