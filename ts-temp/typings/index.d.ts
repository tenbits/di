// Generated by dts-bundle v0.7.3

declare module 'a-di' {
    import { Di } from 'a-di/Di';
    const di: Di;
    export = di;
}

declare module 'a-di/Di' {
    import { EntryCollection } from 'a-di/Entries/EntryCollection';
    import { MetaReader } from 'a-di/Entries/MetaReader';
    import { TypeEntry } from 'a-di/Entries/TypeEntry';
    import { FnEntry } from 'a-di/Entries/FnEntry';
    import { ObjectEntry } from 'a-di/Entries/ObjectEntry';
    import { IType } from 'a-di/Entries/IType';
    export class Di {
        parent: Di;
        static Di: typeof Di;
        static di: Di;
        static default: Di;
        default: this;
        di: this;
        entries: EntryCollection;
        metaReader: MetaReader;
        constructor(parent?: Di);
        new(): Di;
        registerType(Type: IType): TypeEntry<any>;
        registerFactory(Fn: any): FnEntry<any>;
        Type(Type: IType): TypeEntry<any>;
        Function<T extends Function>(fn: T): FnEntry<T>;
        Object(object: any): ObjectEntry;
        resolve<T extends new (...args: any[]) => any>(mix: string | T, ...args: ConstructorParameters<T>): InstanceType<T>;
        wrapType(Type: any): void;
    }
}

declare module 'a-di/Entries/EntryCollection' {
    import { Entry } from 'a-di/Entries/Entry';
    import { TypeEntry } from 'a-di/Entries/TypeEntry';
    import { Di } from 'a-di/Di';
    import { IType } from 'a-di/Entries/IType';
    export class EntryCollection {
        protected arr: Entry[];
        protected ids: {
            [key: string]: Entry;
        };
        protected types: {};
        constructor(di: Di);
        add(entry: Entry): void;
        resolve<T>(mix: string | IType<T>, ...args: any[]): T;
        getByType<T>(Type: IType<T>): TypeEntry<T>;
        getFor(mix: any, required?: boolean): Entry;
        getForType(Type: any): Entry;
        removeForType(Type: any): void;
        removeFor(mix: any): void;
        registerFor(mix: any, entry: Entry): void;
    }
}

declare module 'a-di/Entries/MetaReader' {
    export class MetaReader {
        readFromType(Type: any): any;
    }
}

declare module 'a-di/Entries/TypeEntry' {
    import { BaseMethodEntry } from 'a-di/Entries/BaseMethodEntry';
    import { IType } from 'a-di/Entries/IType';
    import { Di } from 'a-di/Di';
    export class TypeEntry<T = any> extends BaseMethodEntry {
        Type: IType<T>;
        protected _singleton: T;
        constructor(di: Di, Type: IType);
        Entry(): IType<T>;
        resolve(...args: any[]): T;
        wrap(): T;
    }
}

declare module 'a-di/Entries/FnEntry' {
    import { BaseMethodEntry } from 'a-di/Entries/BaseMethodEntry';
    export class FnEntry<T extends Function> extends BaseMethodEntry {
        Fn: T;
        constructor(di: any, fn: T);
        Entry(): any;
        resolve(...args: any[]): any;
        wrap(): T;
    }
}

declare module 'a-di/Entries/ObjectEntry' {
    import { Entry } from 'a-di/Entries/Entry';
    import { Di } from 'a-di/Di';
    export class ObjectEntry extends Entry {
        Object: any;
        resolvers: any[];
        constructor(di: Di, object: any);
        using(objectDefinitions: any): this;
        resolve(currentObject?: any): any;
        wrap(): any;
        Entry(): any;
    }
}

declare module 'a-di/Entries/IType' {
    export interface IType<T = any> {
        new (...args: any[]): T;
    }
}

declare module 'a-di/Entries/Entry' {
    import { Di } from 'a-di/Di';
    export abstract class Entry {
        di: Di;
        protected _as: any[];
        protected _using: any[];
        protected _params: any[];
        protected _resolvers: any[];
        cfg_arguments: string;
        cfg_singleton: boolean;
        onActivatedCb: any;
        constructor(di: Di);
        config(key: 'arguments', value: 'override' | 'ignore' | 'extend'): any;
        config(key: 'singleton', value: boolean): any;
        using(...args: any[]): this;
        isSingleton(val?: boolean): this;
        as(...args: any[]): this;
        register(): this;
        asSelf(): this;
        resolve(...args: any[]): any;
        onActivated(fn: any): void;
        Entry(): any;
        wrap(): void;
    }
}

declare module 'a-di/Entries/BaseMethodEntry' {
    import { Entry } from 'a-di/Entries/Entry';
    import { IType } from 'a-di/Entries/IType';
    export class BaseMethodEntry extends Entry {
        constructor(di: any, Entry: Function | IType);
        withParams(...args: any[]): this;
        getParams_(...args: any[]): any[];
    }
}

