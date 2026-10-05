# Domain Model

## Notebook

A notebook represents a collection of pages.

Properties:

- id
- title
- description
- cover
- createdAt
- updatedAt
- pages

## NotePage

A page belongs to a notebook.

Properties:

- id
- notebookId
- title
- subject
- date
- order
- content
- drawing
- createdAt
- updatedAt

## Drawing

A drawing contains multiple strokes.

Properties:

- id
- strokes

## Stroke

Properties:

- id
- points
- color
- width
- tool

## Point

Properties:

- x
- y

## DrawingTool

Possible values:

- pen
- brush
- eraser

## PaperBackground

Possible values:

- blank
- grid
- lined
- dotted