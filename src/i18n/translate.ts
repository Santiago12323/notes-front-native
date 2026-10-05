import { type InterpolationValues, type MessageKey, type Messages } from './types';

export function interpolate(template: string, values?: InterpolationValues): string {
  if (values === undefined) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}

export function getMessage(messages: Messages, key: MessageKey): string {
  const segments = key.split('.');
  let current: unknown = messages;

  for (const segment of segments) {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      throw new Error(`Missing translation: ${key}`);
    }

    current = (current as Record<string, unknown>)[segment];
  }

  if (typeof current !== 'string') {
    throw new Error(`Invalid translation: ${key}`);
  }

  return current;
}

export function translate(
  messages: Messages,
  key: MessageKey,
  values?: InterpolationValues,
): string {
  return interpolate(getMessage(messages, key), values);
}
