import { describe, expect, it } from '@jest/globals';

import { spacing } from '@/theme/spacing';
import { paperSpacings } from '../constants/style';
import { paperBackgrounds } from '../models/paper-background';
import {
  createGridMarks,
  createPaperMarks,
  createPaperStops,
  visiblePaperBounds,
} from './paper-marks';

describe('createPaperStops', () => {
  it('returns empty stops when spacing or length is invalid', () => {
    expect(createPaperStops(100, 0)).toEqual([]);
    expect(createPaperStops(0, 24)).toEqual([]);
  });

  it('starts after the edge and stays inside the length', () => {
    expect(createPaperStops(80, 32)).toEqual([32, 64]);
  });
});

describe('visiblePaperBounds', () => {
  it('matches the canvas at the default viewport', () => {
    expect(visiblePaperBounds(200, 120, 0, 0, 1)).toEqual({
      minX: 0,
      minY: 0,
      maxX: 200,
      maxY: 120,
    });
  });

  it('covers twice the canvas when zooming out to one half', () => {
    expect(visiblePaperBounds(200, 120, 0, 0, 0.5)).toEqual({
      minX: 0,
      minY: 0,
      maxX: 400,
      maxY: 240,
    });
  });

  it('covers half the canvas when zooming in to twice the size', () => {
    expect(visiblePaperBounds(200, 100, 0, 0, 2)).toEqual({
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 50,
    });
  });

  it('follows pan in both directions and both orientations', () => {
    expect(visiblePaperBounds(300, 120, 48, -24, 1)).toEqual({
      minX: -48,
      minY: 24,
      maxX: 252,
      maxY: 144,
    });
    expect(visiblePaperBounds(120, 300, -24, 48, 2)).toEqual({
      minX: 12,
      minY: -24,
      maxX: 84,
      maxY: 102,
    });
  });

  it('returns an empty area when the canvas or scale is invalid', () => {
    expect(visiblePaperBounds(0, 100, 10, 10, 1)).toEqual({
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
    });
  });
});

describe('createGridMarks', () => {
  const gridSpacing = paperSpacings.grid;

  it('draws only the grid lines that cross the visible paper area', () => {
    const marks = createGridMarks(
      {
        minX: -gridSpacing,
        minY: -gridSpacing,
        maxX: gridSpacing * 2,
        maxY: gridSpacing,
      },
      gridSpacing,
    );

    expect(marks).toEqual({
      type: 'path',
      data: [
        `M${-gridSpacing} ${-gridSpacing} L${gridSpacing * 2} ${-gridSpacing}`,
        `M${-gridSpacing} 0 L${gridSpacing * 2} 0`,
        `M${-gridSpacing} ${gridSpacing} L${gridSpacing * 2} ${gridSpacing}`,
        `M${-gridSpacing} ${-gridSpacing} L${-gridSpacing} ${gridSpacing}`,
        `M0 ${-gridSpacing} L0 ${gridSpacing}`,
        `M${gridSpacing} ${-gridSpacing} L${gridSpacing} ${gridSpacing}`,
        `M${gridSpacing * 2} ${-gridSpacing} L${gridSpacing * 2} ${gridSpacing}`,
      ].join(' '),
    });
  });

  it('keeps every line aligned to the paper origin while panning', () => {
    const marks = createGridMarks(
      {
        minX: 10,
        minY: 10,
        maxX: 10 + gridSpacing * 2,
        maxY: 10 + gridSpacing,
      },
      gridSpacing,
    );

    expect(marks.type).toBe('path');
    if (marks.type === 'path') {
      expect(marks.data).toBe(
        [
          `M10 ${gridSpacing} L${10 + gridSpacing * 2} ${gridSpacing}`,
          `M${gridSpacing} 10 L${gridSpacing} ${10 + gridSpacing}`,
          `M${gridSpacing * 2} 10 L${gridSpacing * 2} ${10 + gridSpacing}`,
        ].join(' '),
      );
    }
  });

  it('returns no marks for an empty visible area', () => {
    expect(
      createGridMarks({ minX: 0, minY: 0, maxX: 0, maxY: 0 }, gridSpacing),
    ).toEqual({ type: 'blank' });
  });
});

describe('createPaperMarks', () => {
  it('returns a blank mark for a blank paper', () => {
    expect(createPaperMarks(paperBackgrounds.blank, 200, 200)).toEqual({ type: 'blank' });
  });

  it('builds horizontal rules for lined paper', () => {
    const marks = createPaperMarks(paperBackgrounds.lined, 100, 80);

    expect(marks).toEqual({
      type: 'path',
      data: `M0 ${spacing.xxl} L100 ${spacing.xxl} M0 ${spacing.xxl * 2} L100 ${spacing.xxl * 2}`,
    });
  });

  it('builds horizontal and vertical rules for grid paper', () => {
    const marks = createPaperMarks(paperBackgrounds.grid, 50, 50);

    expect(marks.type).toBe('path');
    if (marks.type === 'path') {
      expect(marks.data).toContain(`M0 ${spacing.xl} L50 ${spacing.xl}`);
      expect(marks.data).toContain(`M${spacing.xl} 0 L${spacing.xl} 50`);
    }
  });

  it('builds intersection dots for dotted paper', () => {
    const marks = createPaperMarks(paperBackgrounds.dotted, 40, 40);

    expect(marks).toEqual({
      type: 'dots',
      points: [
        { x: spacing.lg, y: spacing.lg },
        { x: spacing.lg * 2, y: spacing.lg },
        { x: spacing.lg, y: spacing.lg * 2 },
        { x: spacing.lg * 2, y: spacing.lg * 2 },
      ],
    });
  });
});
