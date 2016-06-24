namespace codex.debugbar.lib
{
    export function contentType(name:string):(cls:any)=>void {
        return (cls:any):void => {
            var contentType:IContentType = <IContentType> new cls;
            app['content.types'].register(name, contentType);
        };

    }

    export class ContentTypeRepository
    {
        protected types:{[name: string]:IContentType} = {};

        public register(name:string, contentType:IContentType) {
            this.types[name] = contentType;
        }

        public get(name:string) : IContentType {
            if (!this.has(name)) {
                throw new Error('ContentTypeRepository does not have ' + name);
            }
            return this.types[name];
        }

        public has(name:string) {
            return typeof this.types[name] !== "undefined";
        }
    }

    export interface IContentType
    {
        render(item:Item) : string ;
    }


    export class TextContentType implements IContentType
    {
        render(item:Item):string {
            return item.value;
        }
    }

    export class CodeContentType implements IContentType
    {
        render(item:Item):string {
            var args:any[] = [item.value];
            if (typeof item.language !== 'undefined') {
                args.push(item.language);
            }
            return PhpDebugBar.Widgets.createCodeBlock.apply(PhpDebugBar.Widgets, args);
        }
    }

    export class ArrayContentType implements IContentType
    {
        render(item:Item):string {
            console.log('array content type', item);
            return item.value;
        }
    }
}