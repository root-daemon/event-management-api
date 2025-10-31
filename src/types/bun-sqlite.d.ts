declare module 'bun:sqlite' {
  export interface DatabaseOptions {
    readonly?: boolean;
    create?: boolean;
    readwrite?: boolean;
  }

  export class Database {
    constructor(filename?: string, options?: DatabaseOptions | number);
    query<Params = any, ReturnType = any>(sql: string): Statement<Params, ReturnType>;
    prepare(sql: string): Statement<any, any>;
    run(sql: string, params?: SQLQueryBindings): { lastInsertRowid: number; changes: number };
    exec(sql: string): void;
    close(throwOnError?: boolean): void;
    serialize(): Uint8Array;
    loadExtension(name: string): void;
    fileControl(cmd: number, value?: any): void;
    transaction<T extends (...args: any[]) => any>(fn: T): T & {
      deferred: T;
      immediate: T;
      exclusive: T;
    };
    static setCustomSQLite(path: string): void;
  }

  export interface Statement<Params = any, ReturnType = any> {
    all(params?: Params): ReturnType[];
    get(params?: Params): ReturnType | undefined;
    run(params?: Params): {
      lastInsertRowid: number;
      changes: number;
    };
    values(params?: Params): unknown[][];
    iterate(params?: Params): IterableIterator<ReturnType>;
    finalize(): void;
    toString(): string;
    columnNames: string[];
    columnTypes: string[];
    declaredTypes: (string | null)[];
    paramsCount: number;
    native: any;
    as<T>(Class: new () => T): Statement<Params, T>;
  }

  export type SQLQueryBindings =
    | string
    | bigint
    | TypedArray
    | number
    | boolean
    | null
    | Record<string, string | bigint | TypedArray | number | boolean | null>;

  export const constants: {
    SQLITE_FCNTL_PERSIST_WAL: number;
    [key: string]: number;
  };
}

