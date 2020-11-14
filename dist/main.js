var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
System.register("block", [], function (exports_1, context_1) {
    "use strict";
    var Block;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Block = /** @class */ (function () {
                function Block(options) {
                    var _this = this;
                    this.rotate = function () {
                        var shape = _this.shape;
                    };
                    this.fall = function (n) {
                        if (n === void 0) { n = 1; }
                    };
                    this.right = function () { };
                    this.left = function () { };
                    this.type = options.type;
                    this.rotateIndex = options.rotateIndex;
                    this.timeStamp = options.timeStamp;
                    this.shape = options.shape;
                    this.yx = options.yx;
                }
                return Block;
            }());
            exports_1("default", Block);
        }
    };
});
System.register("const", [], function (exports_2, context_2) {
    "use strict";
    var blockShape, yxRotateOrigin, blockTypes, speeds, delays, fillLine, blankLine, blankMatrix, clearPoints, StorageKey, maxPoint, eachLines;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            blockShape = {
                I: [
                    [1, 1, 1, 1],
                ],
                L: [
                    [0, 0, 1],
                    [1, 1, 1],
                ],
                J: [
                    [1, 0, 0],
                    [1, 1, 1],
                ],
                Z: [
                    [1, 1, 0],
                    [0, 1, 1],
                ],
                S: [
                    [0, 1, 1],
                    [1, 1, 0],
                ],
                O: [
                    [1, 1],
                    [1, 1],
                ],
                T: [
                    [0, 1, 0],
                    [1, 1, 1],
                ]
            };
            exports_2("blockShape", blockShape);
            yxRotateOrigin = {
                I: [
                    [-1, 1],
                    [1, -1]
                ],
                L: [
                    [0, 0]
                ],
                J: [
                    [0, 0]
                ],
                Z: [
                    [0, 0]
                ],
                S: [
                    [0, 0]
                ],
                O: [
                    [0, 0]
                ],
                T: [
                    [0, 0],
                    [1, 0],
                    [-1, 1],
                    [0, -1]
                ]
            };
            exports_2("yxRotateOrigin", yxRotateOrigin);
            blockTypes = Object.keys(blockShape);
            exports_2("blockTypes", blockTypes);
            speeds = [800, 650, 500, 370, 250, 160];
            exports_2("speeds", speeds);
            delays = [50, 60, 70, 80, 90, 100];
            exports_2("delays", delays);
            fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            exports_2("fillLine", fillLine);
            blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            exports_2("blankLine", blankLine);
            blankMatrix = (function () {
                var matrix = [];
                for (var i = 0; i < 20; i++) {
                    matrix.push(__spreadArrays(blankLine));
                }
                return matrix;
            })();
            exports_2("blankMatrix", blankMatrix);
            clearPoints = [100, 300, 700, 1500];
            exports_2("clearPoints", clearPoints);
            StorageKey = 'REACT_TETRIS';
            exports_2("StorageKey", StorageKey);
            maxPoint = 999999;
            exports_2("maxPoint", maxPoint);
            eachLines = 20;
            exports_2("eachLines", eachLines);
        }
    };
});
System.register("control", [], function (exports_3, context_3) {
    "use strict";
    var Control;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Control = /** @class */ (function () {
                function Control() {
                    this.start = function () { };
                    this.down = function () { };
                    this.drop = function () { };
                    this.rotate = function () { };
                    this.pause = function () { };
                    this.reset = function () { };
                    this.right = function () { };
                    this.left = function () { };
                    this.speed = function () { };
                    this.end = function () { };
                    this.auto = function () { };
                    this.clearLines = function () { };
                    this.lock = function () { };
                }
                return Control;
            }());
            exports_3("default", Control);
        }
    };
});
System.register("gameStates", ["const"], function (exports_4, context_4) {
    "use strict";
    var const_1, gameStates;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (const_1_1) {
                const_1 = const_1_1;
            }
        ],
        execute: function () {
            gameStates = {
                currentBlock: null,
                matrix: const_1.blankMatrix,
                point: 0,
                speed: 0,
                lock: false
            };
            exports_4("gameStates", gameStates);
        }
    };
});
System.register("keyboard", [], function (exports_5, context_5) {
    "use strict";
    var Keyboard;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Keyboard = /** @class */ (function () {
                function Keyboard() {
                    this.press = function () { };
                    this.unpress = function () { };
                    this.up = function () { };
                    this.down = function () { };
                    this.right = function () { };
                    this.left = function () { };
                    this.space = function () { };
                    this.p = function () { };
                    this.r = function () { };
                }
                return Keyboard;
            }());
            exports_5("default", Keyboard);
        }
    };
});
System.register("main", [], function (exports_6, context_6) {
    "use strict";
    var resize;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            resize = function () {
                var containerEl = document.querySelector("#page > .container");
                var w = document.documentElement.clientWidth;
                var h = document.documentElement.clientHeight;
                var ratio = h / w;
                var css = {};
                /** 세로가 가로보다 더 짧으면 세로길이를 기준으로 scale을 정하고*/
                if (ratio < 1.5) {
                    css = { scale: h / 960 };
                }
                /** 가로가 세로보다 짧으면 가로를 기준으로 scale을 정한다 */
                else {
                    var scale = w / 640;
                    var filling = (h - (960 * css.scale)) / css.scale / 3;
                    css = {
                        scale: scale,
                        paddingTop: Math.floor(filling),
                        paddingBottom: Math.floor(filling),
                        marginTop: Math.floor(-480 - (filling * (3 / 2)))
                    };
                }
                Object.keys(css).forEach(function (property) {
                    containerEl.style.setProperty(property, css[property]);
                });
            };
            document.addEventListener('resize', resize);
        }
    };
});
var StateRecord = /** @class */ (function () {
    function StateRecord() {
        this.subscribeRecord = function () { };
        this.getPoint = function () { };
        this.updatePoint = function () { };
    }
    return StateRecord;
}());
System.register("utils", [], function (exports_7, context_7) {
    "use strict";
    var getStartMatrix, isClear, isOver, isFocus;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            getStartMatrix = function () { };
            exports_7("getStartMatrix", getStartMatrix);
            isClear = function () { };
            exports_7("isClear", isClear);
            isOver = function () { };
            exports_7("isOver", isOver);
            isFocus = function () { };
            exports_7("isFocus", isFocus);
        }
    };
});
//# sourceMappingURL=main.js.map