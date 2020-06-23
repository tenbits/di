import { Entry } from './Entry';
import { Opts } from '../const';
import { IType } from './IType';
import { Di } from '../Di';
import { TypeMeta } from '../TypeMeta';

export abstract class BaseMethodEntry extends Entry {

    constructor(di: Di, Entry: Function | IType) {
        super(di);

        if (typeof Entry !== 'function') {
            throw new Error('Invalid argument. Function expected');
        }

        let using = di.metaReader.readFromType(Entry);
        if (using != null) {
            this.using.apply(this, using);
        }
    }

    withParams(...args) {
        this._params = args;
        return this;
    }

    getParams_(...args) {
        const Entry = this.Entry();
        const resolvers = this._resolvers;
        const params = this._params;
        const meta = this._meta ?? (this._meta = TypeMeta.prepairMeta(Entry));

        const argsIgnore = this.cfg_arguments === Opts.args.IGNORE;
        const argsExtend = this.cfg_arguments === Opts.args.EXTEND;
        const argsOverride = this.cfg_arguments === Opts.args.OVERRIDE;

        let size = resolvers.length;
        if (size < params.length) {
            size = params.length;
        }
        if (size < Entry.length) {
            size = Entry.length;
        }
        if (argsIgnore === false) {
            if (argsExtend) {
                size += args.length;
            }
            if (argsOverride && args.length > size) {
                size = args.length;
            }
        }

        let ctorParams = new Array(size);
        let i = -1;
        while (++i < size) {

            let arg = null;
            if (i < params.length && params[i] != null) {
                arg = argsIgnore === false && i < args.length && args[i] != null
                    ? args[i]
                    : params[i];
            }
            if (arg == null && i < resolvers.length && resolvers[i] != null) {
                let currentArg = argsIgnore === false && i < args.length
                    ? args[i]
                    : void 0;
                arg = resolvers[i].resolve(currentArg);
            }
            if (arg == null && i < meta.params.length && meta.params[i] != null) {
                let paramMeta = meta.params[i];
                if (paramMeta?.Type) {
                    arg = this.di.resolve(paramMeta.Type);
                }
            }
            if (arg != null) {
                ctorParams[i] = arg;
                continue;
            }

            if (argsIgnore) {
                continue;
            }
            if (argsOverride && i < args.length) {
                ctorParams[i] = args[i];
                continue;
            }
            if (argsExtend && i >= size - args.length) {
                var j = i - size - args.length;
                ctorParams[i] = args[j];
                continue;
            }
        }

        return ctorParams;
    }
};
