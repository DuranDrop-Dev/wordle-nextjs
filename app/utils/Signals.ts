// Create a context to share state
import { signal } from '@preact/signals-react';

export const userRole = signal('');
export const isStarted = signal(false);
export const rowTurn = signal(0);
export const wordle = signal([]);
export const userGuess = signal([]);
export const inputValues = signal([]);
export const email = signal('');
