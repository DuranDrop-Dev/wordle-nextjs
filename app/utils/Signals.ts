// Create a context to share state
import { signal } from '@preact/signals-react';
import { InputValue } from './Types';

export const userRole = signal('');
export const isStarted = signal(false);
export const rowTurn = signal(0);
export const wordle = signal<string[]>([]);
export const userGuess = signal<string[]>([]);
export const inputValues = signal<Record<string, InputValue>>({});
export const email = signal('');
