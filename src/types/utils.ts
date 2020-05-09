export type StringKeys<T extends {}> = Extract<keyof T, string>;
