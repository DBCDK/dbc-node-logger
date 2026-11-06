export type LogArgs = Record<string, unknown>;

export type LogLevel =
  | "off"
  | "error"
  | "warn"
  | "warning"
  | "info"
  | "debug"
  | "trace"
  | "OFF"
  | "ERROR"
  | "WARN"
  | "WARNING"
  | "INFO"
  | "DEBUG"
  | "TRACE";

export interface Logger {
  log(level: LogLevel, msg?: string, args?: LogArgs): void;
  info(msg?: string, args?: LogArgs): void;
  warn(msg?: string, args?: LogArgs): void;
  error(msg?: string, args?: LogArgs): void;
  debug(msg?: string, args?: LogArgs): void;
  trace(msg?: string, args?: LogArgs): void;
}

export function setInfo(additionalInfo: Record<string, unknown>): void;

export function getCurrentLogLevel(): LogLevel;

export const log: Logger;
