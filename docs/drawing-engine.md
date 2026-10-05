# Drawing Engine

## Objective

Provide a smooth digital handwriting experience.

## Tools

- Pen
- Brush
- Eraser

## Stroke

Each user interaction creates a stroke.

A stroke contains:

- identifier
- points
- color
- width
- tool

## History

The drawing system supports:

- undo
- redo

History should operate on drawing operations rather than unrelated application state.

## Renderer

The rendering implementation must be isolated.

The rest of the application should interact with the drawing system through well-defined interfaces.

## Performance

Pointer/touch movement is high-frequency.

Avoid causing unnecessary React renders.

Avoid updating unrelated notebook state during drawing.

## Future

The drawing model should allow future:

- cloud persistence
- synchronization
- export
- image rendering
- PDF export
- stylus pressure