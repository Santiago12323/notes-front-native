# Architecture Decisions

## ADR-001 — Frontend-only MVP

The first version will contain only the frontend.

Backend integration will be implemented later.

## ADR-002 — TypeScript

The entire application uses TypeScript.

## ADR-003 — Modular architecture

Features are isolated into modules.

## ADR-004 — Shared design system

Reusable UI components and visual tokens are centralized.

## ADR-005 — Structured drawing

Drawings are represented as structured strokes instead of only raster images.

## ADR-006 — Local-first

The MVP should function without an external backend.

## ADR-007 — Backend-ready boundaries

Services and domain models must not depend on a future backend implementation.

## ADR-008 — Small components

Components should have a single clear responsibility.