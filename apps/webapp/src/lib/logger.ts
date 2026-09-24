export type ErrorContext = Record<string, unknown>;

export const logger = {
  error(error: unknown, context?: ErrorContext): void {
    console.error(error, context);
  },

  warn(message: string, context?: ErrorContext): void {
    console.warn(message, context);
  },
};
