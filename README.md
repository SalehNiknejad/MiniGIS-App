# MiniGIS App

A modern interactive GIS (Geographic Information System) web application built with React, TypeScript, and MapLibre GL.

MiniGIS App focuses on high-performance GeoJSON visualization, spatial data management, interactive mapping, and persistent client-side GIS workflows.

---

## Features

- Interactive vector map rendering
- GeoJSON visualization
- Point / LineString / Polygon support
- Dynamic layer visibility control
- Rich hover popups
- Feature creation directly from map
- Persistent LocalStorage data storage
- Workspace-style filter tabs
- RTL (Persian) support
- Responsive UI
- High-performance rendering architecture

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### GIS & Mapping
- MapLibre GL
- GeoJSON
- Map.ir Vector Tiles API

### State Management
- Zustand

### UI
- Tailwind CSS
- shadcn/ui

### Internationalization
- react-i18next

---

## Architecture

The application is designed with a decoupled architecture:

- React handles UI rendering
- Zustand manages application state
- MapLibre handles GIS rendering
- GeoJSON acts as the central data source

The map instance is created only once and updated using:

```ts
source.setData(...)
```

This prevents unnecessary map rerenders and keeps interactions smooth and scalable.

---

## Current Capabilities

### Layer Management

Users can dynamically toggle:

- Points
- Lines
- Polygons

without rerendering the map.

---

### GeoJSON Persistence

All spatial data is automatically persisted into LocalStorage.

This includes:

- Initial dataset
- User-created features
- Runtime modifications

Data remains available after refresh.

---

### Interactive Feature Creation

Users can:

1. Click on map
2. Open creation modal
3. Enter metadata
4. Save feature
5. Persist data automatically

---

### Rich GIS Popups

Custom hover popups display:

- Persian title
- English title
- Description
- Rating
- Categories
- Geometry metadata

Separate popup systems exist for:

- Points
- Lines
- Polygons

---

## Planned Features

- Feature editing
- Geometry dragging
- Polygon drawing tools
- Line drawing tools
- Clustering
- Advanced filtering
- Spatial search
- Import/export
- Server synchronization
- Multi-user collaboration
- GIS analytics
- Heatmaps

---

## Installation

### Clone Repository

```bash
git clone https://github.com/SalehNiknejad/MiniGIS-App.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
VITE_MAPIR_API_KEY=YOUR_API_KEY
```

---

## Project Goal

The goal of MiniGIS App is to simulate a lightweight modern GIS platform architecture inside a frontend-focused environment while maintaining:

- Performance
- Scalability
- Extensibility
- Clean architecture

