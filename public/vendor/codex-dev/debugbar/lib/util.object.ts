namespace codex.debugbar.util {

    export function getParts(str):any {
        return str.replace(/\\\./g, '\uffff').split('.').map(function (s) {
            return s.replace(/\uffff/g, '.');
        });
    }

    /**
     * Get a child of the object using dot notation
     * @param obj
     * @param parts
     * @param create
     * @returns {any}
     */
    export function objectGet(obj?:any, parts?:any, create?:any):any {
        if (typeof parts === 'string') {
            parts = getParts(parts);
        }

        var part;
        while (typeof obj === 'object' && obj && parts.length) {
            part = parts.shift();
            if (!(part in obj) && create) {
                obj[part] = {};
            }
            obj = obj[part];
        }

        return obj;
    }

    /**
     * Set a value of a child of the object using dot notation
     * @param obj
     * @param parts
     * @param value
     * @returns {any}
     */
    export function objectSet(obj, parts, value) {
        parts = getParts(parts);

        var prop = parts.pop();
        obj      = objectGet(obj, parts, true);
        if (obj && typeof obj === 'object') {
            return (obj[prop] = value);
        }
    }

    /**
     * Check if a child of the object exists using dot notation
     * @param obj
     * @param parts
     * @returns {boolean|any}
     */
    export function objectExists(obj, parts) {
        parts = getParts(parts);

        var prop = parts.pop();
        obj      = objectGet(obj, parts);

        return typeof obj === 'object' && obj && prop in obj;
    }

    export function recurse(value:Object, fn:Function, fnContinue?:Function):any {
        function recurse(value, fn, fnContinue, state) {
            var error;
            if (state.objs.indexOf(value) !== -1) {
                error      = new Error('Circular reference detected (' + state.path + ')');
                error.path = state.path;
                throw error;
            }

            var obj, key;
            if (fnContinue && fnContinue(value) === false) {
                // Skip value if necessary.
                return value;
            } else if (kindOf(value) === 'array') {
                // If value is an array, recurse.
                return value.map(function (item, index) {
                    return recurse(item, fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + '[' + index + ']',
                    });
                });
            } else if (kindOf(value) === 'object') {
                // If value is an object, recurse.
                obj = {};
                for (key in value) {
                    obj[key] = recurse(value[key], fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + (/\W/.test(key) ? '["' + key + '"]' : '.' + key),
                    });
                }
                return obj;
            } else {
                // Otherwise pass value into fn and return.
                return fn(value);
            }
        }

        return recurse(value, fn, fnContinue, {objs: [], path: ''});
    }

    /**
     * Copy an object, creating a new object and leaving the old intact
     * @param object
     * @returns {T}
     */
    export function copyObject<T> (object:T):T {
        var objectCopy = <T>{};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }

    /**
     * Flatten an object to a dot notated associative array
     * @param obj
     * @param prefix
     * @returns {any}
     */
    export function dotize(obj:any, prefix?:any) {
        if (!obj || typeof obj != "object") {
            if (prefix) {
                var newObj     = {};
                newObj[prefix] = obj;
                return newObj;
            }
            else
                return obj;
        }

        var newObj = {};

        function recurse(o:any, p:any, isArrayItem?:any) {
            for (var f in o) {
                if (o[f] && typeof o[f] === "object") {
                    if (Array.isArray(o[f]))
                        newObj = recurse(o[f], (p ? p : "") + (isNumber(f) ? "[" + f + "]" : "." + f), true); // array
                    else {
                        if (isArrayItem)
                            newObj = recurse(o[f], (p ? p : "") + "[" + f + "]"); // array item object
                        else
                            newObj = recurse(o[f], (p ? p + "." : "") + f); // object
                    }
                } else {
                    if (isArrayItem || isNumber(f))
                        newObj[p + "[" + f + "]"] = o[f]; // array item primitive
                    else
                        newObj[(p ? p + "." : "") + f] = o[f]; // primitive
                }
            }

            if (isEmptyObj(newObj))
                return obj;

            return newObj;
        }

        function isNumber(f) {
            return !isNaN(parseInt(f));
        }

        function isEmptyObj(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        }

        return recurse(obj, prefix);
    }

    export function applyMixins(derivedCtor:any, baseCtors:any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        });
    }

    export class DependencySorter {

        /**
         * @var array
         */
        protected items:any = [];

        /**
         * @var array
         */
        protected dependencies:any = {};

        /**
         * @var array
         */
        protected dependsOn:any = {};

        /**
         * @var array
         */
        protected missing:any = {};

        /**
         * @var array
         */
        protected circular:any = {};

        /**
         * @var array
         */
        protected hits:any = {};

        /**
         * @var array
         */
        protected sorted:any = {};


        constructor() {

        }

        public add(items:{[name:string]:string|string[]}) {
            Object.keys(items).forEach((name:string) => {
                this.addItem(name, items[name]);
            });
        }

        public addItem(name:string, deps?:string|string[]) {
            if (typeof deps === 'undefined') {
                deps = deps || [];
            } else if (typeof deps === 'string') {
                deps = (<string> deps).toString().split(/,\s?/)
            }
            this.setItem(name, <string[]> deps);
        }

        public setItem(name:string, deps:string[]) {
            this.items.push(name);
            deps.forEach((dep:string) => {
                this.items.push(dep);

                if (!this.dependsOn[dep]) {
                    this.dependsOn[dep] = {};
                }

                this.dependsOn[dep][name] = name;

                this.hits[dep] = 0;
            });

            this.items              = _.uniq(this.items);
            this.dependencies[name] = deps;
            this.hits[name]         = 0;
        }


        public sort():string[] {
            this.sorted            = [];
            var hasChanged:boolean = true;
            while (this.sorted.length < this.items.length && hasChanged) {
                hasChanged = false;

                Object.keys(this.dependencies).forEach((item:string) => {
                    if (this.satisfied(item)) {
                        this.setSorted(item);
                        this.removeDependents(item);
                        hasChanged = true;
                    }
                    this.hits[item]++;
                });
            }

            return this.sorted;
        }


        protected satisfied(name:string) {
            var pass:boolean = true;

            this.getDependents(name).forEach((dep:string) => {
                if (this.isSorted(dep)) {
                    return;
                }

                if (!this.exists(name)) {
                    this.setMissing(name, dep);
                    if (pass) {
                        pass = false;
                    }
                }
                if (this.hasDependents(dep)) {
                    if (pass) {
                        pass = false;
                    }
                } else {
                    this.setFound(name, dep);
                }
                if (this.isDependent(name, dep)) {
                    this.setCircular(name, dep);
                    if (pass) {
                        pass = false;
                    }

                }
            });

            return pass;
        }


        /**
         * setSorted
         *
         * @param item
         */
        protected setSorted(item) {
            this.sorted.push(item);
        }

        protected exists(item):boolean {
            return this.items.indexOf(item) !== -1;
        }

        /**
         * removeDependents
         *
         * @param item
         */
        protected removeDependents(item) {
            delete this.dependencies[item];
        }

        /**
         * setCircular
         *
         * @param item
         * @param item2
         */
        protected setCircular(item, item2) {
            this.circular[item]        = this.circular[item] || {};
            this.circular[item][item2] = item2;
        }

        /**
         * setMissing
         *
         * @param item
         * @param item2
         */
        protected setMissing(item, item2) {
            this.missing[item]        = this.missing[item] || {};
            this.missing[item][item2] = item2;
        }

        /**
         * setFound
         *
         * @param item
         * @param item2
         */
        protected setFound(item, item2) {
            if (typeof this.missing[item] !== 'undefined') {
                delete this.missing[item][item2];
                if (Object.keys(this.missing[item]).length > 0) {
                    delete this.missing[item];
                }
            }
        }

        /**
         * isSorted
         *
         * @param item
         * @return bool
         */
        protected isSorted(item:string):boolean {
            return typeof this.sorted[item] !== 'undefined';
        }

        public requiredBy(item:string):boolean {
            return typeof this.dependsOn[item] !== 'undefined' ? this.dependsOn[item] : [];
        }


        public isDependent(item:string, item2:string):boolean {
            return typeof this.dependsOn[item] !== 'undefined' && typeof this.dependsOn[item][item2] !== 'undefined';
        }

        public hasDependents(item):boolean {
            return typeof this.dependencies[item] !== 'undefined';
        }

        public hasMissing(item):boolean {
            return typeof this.missing[item] !== 'undefined';
        }


        public isMissing(dep:string):boolean {
            var missing:boolean = false;
            Object.keys(this.missing).forEach((item:string) => {
                var deps:string[] = this.missing[item];
                if (deps.indexOf(dep) !== -1) {
                    missing = true;
                }
            });

            return missing;
        }

        public hasCircular(item:string):boolean {
            return typeof this.circular[item] !== 'undefined';
        }

        public isCircular(dep) {
            var circular:boolean = false;
            Object.keys(this.circular).forEach((item:string) => {
                var deps:string[] = this.circular[item];
                if (deps.indexOf(dep) !== -1) {
                    circular = true;
                }
            });

            return circular;

        }

        /**
         * getDependents
         *
         * @param item
         * @return mixed
         */
        public getDependents(item):string[] {
            return this.dependencies[item];
        }


        public getMissing(str?:any):string[] {
            if (typeof str === 'string') {
                return this.missing[str];
            }

            return this.missing;
        }


        public getCircular(str?:any) {
            if (typeof str === 'string') {
                return this.circular[str];
            }

            return this.circular;
        }

        public getHits(str?:any) {
            if (typeof str === 'string') {
                return this.hits[str];
            }

            return this.hits;
        }

    }
}
