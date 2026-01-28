export type EventBusContextType<T extends Record<string, unknown>> = {
  emit: <K extends keyof T>(name: K, data: T[K]) => void;
  on: <K extends keyof T>(name: K, cb: (data: T[K]) => void) => () => void;
};

export type EventMap<T extends Record<string, unknown>> = {
  [K in keyof T]?: Array<(data: T[K]) => void>;
};
