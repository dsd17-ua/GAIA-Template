# Especificación de Producto  
## Aplicación Web de Gestión de Marcadores de Balonmano

### 1. Visión del Producto
Desarrollar una aplicación web sencilla y moderna que permita gestionar en tiempo real los marcadores de partidos de balonmano, facilitando el control del resultado, el tiempo de juego y los eventos principales del partido de forma rápida, clara y fiable.

La aplicación está orientada a mesas de control, personal técnico, árbitros auxiliares o personal de clubes que necesiten una herramienta digital intuitiva durante el desarrollo de un partido.

---

### 2. Objetivos
- Permitir la creación y gestión de partidos de balonmano.
- Actualizar el marcador en tiempo real de forma ágil.
- Registrar los eventos clave del partido según la normativa del balonmano.
- Ofrecer una interfaz clara, moderna y usable en escritorio y tablet.
- Minimizar errores durante la introducción de datos en directo.

---

### 3. Usuarios Objetivo
- Operadores de mesa de control.
- Personal de clubes deportivos.
- Árbitros auxiliares.
- Organizadores de competiciones locales o amateurs.

---

### 4. Alcance Funcional

#### 4.1 Gestión de Partidos
- Crear un nuevo partido indicando:
  - Equipo local
  - Equipo visitante
  - Competición (opcional)
  - Duración del partido (por defecto 2 x 30 minutos)
- Editar los datos básicos del partido antes de su inicio.
- Visualizar la lista de partidos creados.
- Acceder a un partido activo para su gestión en directo.

#### 4.2 Marcador en Directo
- Mostrar el marcador actual (goles local / goles visitante).
- Añadir goles a cada equipo mediante controles rápidos.
- Reflejar los cambios de marcador de forma inmediata.
- Evitar valores negativos o inconsistentes.

#### 4.3 Gestión del Tiempo
- Cronómetro del partido visible en todo momento.
- Iniciar y pausar el tiempo de juego.
- Parar el tiempo manualmente cuando sea necesario.
- Diferenciar claramente entre tiempo en juego y tiempo detenido.
- Soporte para dos partes del partido.

#### 4.4 Tiempo Muerto
- Registrar tiempos muertos por equipo.
- Limitar el número de tiempos muertos según la normativa configurada.
- Mostrar visualmente los tiempos muertos consumidos.
- Pausar automáticamente el cronómetro durante el tiempo muerto.

#### 4.5 Exclusiones
- Registrar exclusiones de 2 minutos por equipo.
- Indicar el número de jugador excluido (opcional).
- Asociar la exclusión a un equipo.
- Mostrar temporizador de exclusión activo.
- Gestionar múltiples exclusiones simultáneas.

#### 4.6 Tarjetas
- Registrar tarjetas:
  - Tarjeta amarilla
  - Tarjeta roja
- Asociar la tarjeta a un equipo y jugador (opcional).
- Mostrar un resumen visual de tarjetas por equipo.

---

### 5. Requisitos No Funcionales

#### 5.1 Usabilidad
- Interfaz limpia, minimalista y moderna.
- Acciones principales accesibles en uno o dos clics.
- Botones grandes y claros para uso en situaciones de directo.
- Feedback visual inmediato tras cada acción.

#### 5.2 Rendimiento
- Actualizaciones de marcador y tiempo sin retrasos perceptibles.
- Respuesta inmediata a acciones del usuario.

#### 5.3 Compatibilidad
- Aplicación web responsive.
- Optimizada para escritorio y tablet.
- Navegadores modernos (Chrome, Firefox, Edge, Safari).

#### 5.4 Fiabilidad
- Evitar pérdidas de información durante el partido.
- Confirmación visual de acciones críticas (fin de parte, tarjeta roja).
- Posibilidad de corregir errores simples (ej. gol añadido por error).

---

### 6. Interfaz de Usuario (UI)

#### 6.1 Principios de Diseño
- Estilo moderno y deportivo.
- Uso de tipografía clara y legible.
- Contraste adecuado para buena visibilidad en pabellones.
- Iconografía intuitiva para eventos (gol, tarjeta, exclusión).

#### 6.2 Pantallas Principales
- Pantalla de listado de partidos.
- Pantalla de creación / edición de partido.
- Pantalla de gestión del partido en directo:
  - Marcador central
  - Cronómetro visible
  - Controles rápidos de goles
  - Panel de eventos (exclusiones, tarjetas, tiempos muertos)

---

### 7. Suposiciones y Restricciones
- La aplicación no gestiona estadísticas avanzadas en esta versión.
- No incluye retransmisión pública del marcador (uso interno).
- La normativa (duración, tiempos muertos) será configurable de forma básica.

---

### 8. Métricas de Éxito
- Tiempo medio para añadir un gol < 1 segundo.
- Número de errores de operación durante un partido.
- Nivel de satisfacción del usuario (feedback cualitativo).
- Uso recurrente en partidos consecutivos.

---

### 9. Fuera de Alcance (Versión Inicial)
- Gestión de plantillas completas de jugadores.
- Integración con pantallas externas o streaming.
- Historial avanzado y estadísticas post-partido.
- Gestión de competiciones completas o clasificaciones.

---

## 10. Features Specification Summaries

### 10.1 Live Match Management (MVP)
**Overview:**
This feature covers the end-to-end management of a live handball match, enabling table officials to track time, scores, and disciplinary events. It exists to replace error-prone paper methods with a reliable digital tool. It ensures the integrity of match data (score, time) during the game.

#### Actors
- **Table Official (`TABLE_OFFICIAL`)**: Responsible for all data entry during the match (time, score, events).

#### Access Levels
- **Public**: The MVP operates as a local tool without authentication. All features are accessible to the user running the app.

#### Requirements
- **Local Persistence**: Match data **must** be saved locally to prevent data loss on refresh.
- **No PII**: No personal data (names) stored in MVP.
