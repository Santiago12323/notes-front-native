# Notebook Application Architecture

## Objective

Build a digital notebook application using React Native and TypeScript.

The MVP is frontend-only.

No backend is implemented in the MVP.

The architecture must remain clean and modular so backend integration can be introduced later.

## Main Layers

### App

Application initialization, navigation and providers.

### Components

Globally reusable UI components.

### Modules

Feature-specific functionality.

### Services

Application and feature services.

### Theme

Design system tokens.

### Utils

Pure reusable functions.

### Types

Shared generic types.

## Feature Modules

### notebooks

Responsible for notebooks and notebook navigation.

### notes

Responsible for pages/notes inside notebooks.

### drawing

Responsible for handwriting and drawing.

### settings

Responsible for application settings.

## Dependency Rule

UI should not depend directly on implementation details.

Pages coordinate components and hooks.

Hooks coordinate UI behavior.

Services handle operations.

Domain models remain independent from UI implementation.

## MVP Constraint

The MVP must not contain:

- backend
- authentication
- REST implementation
- cloud synchronization
- user accounts
- subscriptions