type LogContext = Record<string, unknown>;

function write(level: 'info' | 'error', message: string, context?: LogContext): void {
  const entry = { timestamp: new Date().toISOString(), level, message, ...context };
  const output = JSON.stringify(entry);

  if (level === 'error') console.error(output);
  else console.log(output);
}

export const logger = {
  info(message: string, context?: LogContext): void {
    write('info', message, context);
  },
  error(message: string, context?: LogContext): void {
    write('error', message, context);
  },
};
