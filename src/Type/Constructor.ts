// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T extends unknown = unknown> = new (...args: any[]) => T;
export type ConstructorOf<T> = { new (...args: any[]): T } & Function;
