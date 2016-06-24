/// <reference path="../types/types.d.ts" />

if (typeof(PhpDebugBar) !== 'undefined') {
    // namespace
    //var PhpDebugBar:IPhpDebugBar =<IPhpDebugBar> {};
    PhpDebugBar.$ = jQuery;
}
console.groupEnd();
namespace codex.debugbar
{
    export var app:{[key: string]:any} = {};
    export var $:JQueryStatic                = PhpDebugBar.$;
    export var createCodeBlock:Function      = PhpDebugBar.Widgets.createCodeBlock;
    export var csscls:Function               = PhpDebugBar.utils.makecsscls('phpdebugbar-widgets-');
    export var prefix                        = csscls('codex');
    export var DebugBar:IPhpDebugBarDebugBar = PhpDebugBar.DebugBar;
    export var config:util.IConfigProperty; // = util.Config.makeProperty(_config);
    enum Color {
        Red,
        LightRed,
        DarkRed,

        Pink,
        LightPink,
        DarkPink,

        Purple,
        LightPurple,
        DarkPurple,

        DeepPurple,
        LightDeepPurple,
        DarkDeepPurple,

        Indigo,
        LightIndigo,
        DarkIndigo,

        Blue,
        LightBlue,
        DarkBlue,

        Cyan,
        LightCyan,
        DarkCyan,

        Teal,
        LightTeal,
        DarkTeal,

        Green,
        LightGreen,
        DarkGreen,

        Lime,
        LightLime,
        DarkLime,

        Yellow,
        LightYellow,
        DarkYellow,

        Amber,
        LightAmber,
        DarkAmber,

        Orange,
        LightOrange,
        DarkOrange,

        DeepOrange,
        LightDeepOrange,
        DarkDeepOrange,

        Brown,
        LightBrown,
        DarkBrown,

        Grey,
        LightGrey,
        DarkGrey
    }

    var color:string = Color[Color.Orange];
    console.log('color: ', color);

    export class Item
    {
        public language:string;
        [key: string]: any;
        public id:string;
        public name:string;
        public active:boolean;
        public icon:string|boolean;
        public iconColor:string;
        public value:any;
        public type:string;
    }
    export var defaultConfig:{} = {
    };
}