/*!
 * jquery.counterup.js 2.1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Feb 24, 2017
 */
(function($) {
    "use strict";
    $.fn.counterUp = function(options) {
        var settings = $.extend({
            time: 400,
            delay: 10,
            offset: 100,
            beginAt: 0,
            formatter: false,
            context: "window",
            callback: function() {}
        }, options), s;
        return this.each(function() {
            var $this = $(this)
              , counter = {
                time: $(this).data("counterup-time") || settings.time,
                delay: $(this).data("counterup-delay") || settings.delay,
                offset: $(this).data("counterup-offset") || settings.offset,
                beginAt: $(this).data("counterup-beginat") || settings.beginAt,
                context: $(this).data("counterup-context") || settings.context
            };
            var counterUpper = function() {
                var nums = [];
                var divisions = counter.time / counter.delay;
                var num = $(this).attr("data-num") ? $(this).attr("data-num") : $this.text();
                var isComma = /[0-9]+,[0-9]+/.test(num);
                num = num.replace(/,/g, "");
                var decimalPlaces = (num.split(".")[1] || []).length;
                if (counter.beginAt > num)
                    counter.beginAt = num;
                var isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num);
                if (isTime) {
                    var times = num.split(":")
                      , m = 1;
                    s = 0;
                    while (times.length > 0) {
                        s += m * parseInt(times.pop(), 10);
                        m *= 60
                    }
                }
                for (var i = divisions; i >= counter.beginAt / num * divisions; i--) {
                    var newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                    if (isTime) {
                        newNum = parseInt(s / divisions * i);
                        var hours = parseInt(newNum / 3600) % 24;
                        var minutes = parseInt(newNum / 60) % 60;
                        var seconds = parseInt(newNum % 60, 10);
                        newNum = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
                    }
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2")
                        }
                    }
                    if (settings.formatter) {
                        newNum = settings.formatter.call(this, newNum)
                    }
                    nums.unshift(newNum)
                }
                $this.data("counterup-nums", nums);
                $this.text(counter.beginAt);
                var f = function() {
                    if (!$this.data("counterup-nums")) {
                        settings.callback.call(this);
                        return
                    }
                    $this.html($this.data("counterup-nums").shift());
                    if ($this.data("counterup-nums").length) {
                        setTimeout($this.data("counterup-func"), counter.delay)
                    } else {
                        $this.data("counterup-nums", null);
                        $this.data("counterup-func", null);
                        settings.callback.call(this)
                    }
                };
                $this.data("counterup-func", f);
                setTimeout($this.data("counterup-func"), counter.delay)
            };
            $this.waypoint(function(direction) {
                counterUpper();
                this.destroy()
            }, {
                offset: counter.offset + "%",
                context: counter.context
            })
        })
    }
}
)(jQuery);
!function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return n(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    function e(n) {
        var e = 7.5625
          , t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    void 0 !== n.easing && (n.easing.jswing = n.easing.swing);
    var t = Math.pow
      , u = Math.sqrt
      , r = Math.sin
      , i = Math.cos
      , a = Math.PI
      , c = 1.70158
      , o = 1.525 * c
      , s = 2 * a / 3
      , f = 2 * a / 4.5;
    n.extend(n.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return n.easing[n.easing.def](e)
        },
        easeInQuad: function(n) {
            return n * n
        },
        easeOutQuad: function(n) {
            return 1 - (1 - n) * (1 - n)
        },
        easeInOutQuad: function(n) {
            return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
        },
        easeInCubic: function(n) {
            return n * n * n
        },
        easeOutCubic: function(n) {
            return 1 - t(1 - n, 3)
        },
        easeInOutCubic: function(n) {
            return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
        },
        easeInQuart: function(n) {
            return n * n * n * n
        },
        easeOutQuart: function(n) {
            return 1 - t(1 - n, 4)
        },
        easeInOutQuart: function(n) {
            return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
        },
        easeInQuint: function(n) {
            return n * n * n * n * n
        },
        easeOutQuint: function(n) {
            return 1 - t(1 - n, 5)
        },
        easeInOutQuint: function(n) {
            return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
        },
        easeInSine: function(n) {
            return 1 - i(n * a / 2)
        },
        easeOutSine: function(n) {
            return r(n * a / 2)
        },
        easeInOutSine: function(n) {
            return -(i(a * n) - 1) / 2
        },
        easeInExpo: function(n) {
            return 0 === n ? 0 : t(2, 10 * n - 10)
        },
        easeOutExpo: function(n) {
            return 1 === n ? 1 : 1 - t(2, -10 * n)
        },
        easeInOutExpo: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
        },
        easeInCirc: function(n) {
            return 1 - u(1 - t(n, 2))
        },
        easeOutCirc: function(n) {
            return u(1 - t(n - 1, 2))
        },
        easeInOutCirc: function(n) {
            return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2
        },
        easeInElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s)
        },
        easeOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1
        },
        easeInOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1
        },
        easeInBack: function(n) {
            return (c + 1) * n * n * n - c * n * n
        },
        easeOutBack: function(n) {
            return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2)
        },
        easeInOutBack: function(n) {
            return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2
        },
        easeInBounce: function(n) {
            return 1 - e(1 - n)
        },
        easeOutBounce: e,
        easeInOutBounce: function(n) {
            return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2
        }
    })
});
/*!
 * Isotope PACKAGED v3.0.5
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";
    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h)
                    return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0))
                    return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }),
            void 0 !== n ? n : t
        }
        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e),
                n._init()) : (n = new s(o,e),
                a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery,
        a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }
        ),
        a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t),
            this
        }
        ,
        o(a))
    }
    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice
      , s = t.console
      , r = "undefined" == typeof s ? function() {}
    : function(t) {
        s.error(t)
    }
    ;
    return o(e || t.jQuery),
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}
              , o = i[t] = i[t] || {};
            return o[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                var s = i[n]
                  , r = o && o[s];
                r && (this.off(t, s),
                delete o[s]),
                s.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t)
          , i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }
    function e() {}
    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }
    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
        e
    }
    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px",
            e.style.padding = "1px 2px 3px 4px",
            e.style.borderStyle = "solid",
            e.style.borderWidth = "1px 2px 3px 4px",
            e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            s.isBoxSizeOuter = r = 200 == t(n.width),
            i.removeChild(e)
        }
    }
    function s(e) {
        if (n(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display)
                return i();
            var a = {};
            a.width = e.offsetWidth,
            a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l]
                  , c = s[f]
                  , m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight
              , y = a.paddingTop + a.paddingBottom
              , g = a.marginLeft + a.marginRight
              , v = a.marginTop + a.marginBottom
              , _ = a.borderLeftWidth + a.borderRightWidth
              , I = a.borderTopWidth + a.borderBottomWidth
              , z = d && r
              , x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)),
            a.innerWidth = a.width - (p + _),
            a.innerHeight = a.height - (y + I),
            a.outerWidth = a.width + g,
            a.outerHeight = a.height + v,
            a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
        console.error(t)
    }
    , u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], h = u.length, d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i]
              , n = o + "MatchesSelector";
            if (t[n])
                return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    ,
    i.modulo = function(t, e) {
        return (t % e + e) % e
    }
    ,
    i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t))
            e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++)
                e.push(t[i]);
        else
            e.push(t);
        return e
    }
    ,
    i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }
    ,
    i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body; )
            if (t = t.parentNode,
            e(t, i))
                return t
    }
    ,
    i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o)
                    return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
                    n.push(i[s])
            }
        }),
        n
    }
    ,
    i.debounceMethod = function(t, e, i) {
        var o = t.prototype[e]
          , n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            t && clearTimeout(t);
            var e = arguments
              , s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e),
                delete s[n]
            }, i || 100)
        }
    }
    ,
    i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n)
              , r = "data-" + s
              , a = document.querySelectorAll("[" + r + "]")
              , u = document.querySelectorAll(".js-" + s)
              , h = i.makeArray(a).concat(i.makeArray(u))
              , d = r + "-options"
              , l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void (o && o.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t,i);
                l && l.data(t, n, u)
            })
        })
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {},
    t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";
    function i(t) {
        for (var e in t)
            return !1;
        return e = null,
        !0
    }
    function o(t, e) {
        t && (this.element = t,
        this.layout = e,
        this.position = {
            x: 0,
            y: 0
        },
        this._create())
    }
    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style
      , r = "string" == typeof s.transition ? "transition" : "WebkitTransition"
      , a = "string" == typeof s.transform ? "transform" : "WebkitTransform"
      , u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[r]
      , h = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay"
    }
      , d = o.prototype = Object.create(t.prototype);
    d.constructor = o,
    d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        },
        this.css({
            position: "absolute"
        })
    }
    ,
    d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    d.getSize = function() {
        this.size = e(this.element)
    }
    ,
    d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }
    ,
    d.getPosition = function() {
        var t = getComputedStyle(this.element)
          , e = this.layout._getOption("originLeft")
          , i = this.layout._getOption("originTop")
          , o = t[e ? "left" : "right"]
          , n = t[i ? "top" : "bottom"]
          , s = this.layout.size
          , r = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.width : parseInt(o, 10)
          , a = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r,
        a = isNaN(a) ? 0 : a,
        r -= e ? s.paddingLeft : s.paddingRight,
        a -= i ? s.paddingTop : s.paddingBottom,
        this.position.x = r,
        this.position.y = a
    }
    ,
    d.layoutPosition = function() {
        var t = this.layout.size
          , e = {}
          , i = this.layout._getOption("originLeft")
          , o = this.layout._getOption("originTop")
          , n = i ? "paddingLeft" : "paddingRight"
          , s = i ? "left" : "right"
          , r = i ? "right" : "left"
          , a = this.position.x + t[n];
        e[s] = this.getXValue(a),
        e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom"
          , h = o ? "top" : "bottom"
          , d = o ? "bottom" : "top"
          , l = this.position.y + t[u];
        e[h] = this.getYValue(l),
        e[d] = "",
        this.css(e),
        this.emitEvent("layout", [this])
    }
    ,
    d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }
    ,
    d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }
    ,
    d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x
          , o = this.position.y
          , n = parseInt(t, 10)
          , s = parseInt(e, 10)
          , r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e),
        r && !this.isTransitioning)
            return void this.layoutPosition();
        var a = t - i
          , u = e - o
          , h = {};
        h.transform = this.getTranslate(a, u),
        this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }
    ,
    d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft")
          , o = this.layout._getOption("originTop");
        return t = i ? t : -t,
        e = o ? e : -e,
        "translate3d(" + t + "px, " + e + "px, 0)"
    }
    ,
    d.goTo = function(t, e) {
        this.setPosition(t, e),
        this.layoutPosition()
    }
    ,
    d.moveTo = d._transitionTo,
    d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10),
        this.position.y = parseInt(e, 10)
    }
    ,
    d._nonTransition = function(t) {
        this.css(t.to),
        t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd)
            t.onTransitionEnd[e].call(this)
    }
    ,
    d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration))
            return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd)
            e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
            e.ingProperties[i] = !0,
            t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to),
        this.css(t.to),
        this.isTransitioning = !0
    }
    ;
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t,
            this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }),
            this.element.addEventListener(u, this, !1)
        }
    }
    ,
    d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }
    ,
    d.onotransitionend = function(t) {
        this.ontransitionend(t)
    }
    ;
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn
              , o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o],
            i(e.ingProperties) && this.disableTransition(),
            o in e.clean && (this.element.style[t.propertyName] = "",
            delete e.clean[o]),
            o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this),
                delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }
    ,
    d.disableTransition = function() {
        this.removeTransitionStyles(),
        this.element.removeEventListener(u, this, !1),
        this.isTransitioning = !1
    }
    ,
    d._removeStyles = function(t) {
        var e = {};
        for (var i in t)
            e[i] = "";
        this.css(e)
    }
    ;
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }
    ,
    d.stagger = function(t) {
        t = isNaN(t) ? 0 : t,
        this.staggerDelay = t + "ms"
    }
    ,
    d.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
        this.css({
            display: ""
        }),
        this.emitEvent("remove", [this])
    }
    ,
    d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }),
        void this.hide()) : void this.removeElem()
    }
    ,
    d.reveal = function() {
        delete this.isHidden,
        this.css({
            display: ""
        });
        var t = this.layout.options
          , e = {}
          , i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd,
        this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }
    ,
    d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }
    ,
    d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity)
            return "opacity";
        for (var i in e)
            return i
    }
    ,
    d.hide = function() {
        this.isHidden = !0,
        this.css({
            display: ""
        });
        var t = this.layout.options
          , e = {}
          , i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd,
        this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }
    ,
    d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }),
        this.emitEvent("hide"))
    }
    ,
    d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }
    ,
    o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";
    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i)
            return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i,
        h && (this.$element = h(this.element)),
        this.options = o.extend({}, this.constructor.defaults),
        this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n,
        f[n] = this,
        this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }
    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        e
    }
    function a(t) {
        if ("number" == typeof t)
            return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/)
          , i = e && e[1]
          , o = e && e[2];
        if (!i.length)
            return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console
      , h = t.jQuery
      , d = function() {}
      , l = 0
      , f = {};
    s.namespace = "outlayer",
    s.Item = n,
    s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    o.extend(c, e.prototype),
    c.option = function(t) {
        o.extend(this.options, t)
    }
    ,
    c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }
    ,
    s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    },
    c._create = function() {
        this.reloadItems(),
        this.stamps = [],
        this.stamp(this.options.stamp),
        o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }
    ,
    c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }
    ,
    c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n]
              , r = new i(s,this);
            o.push(r)
        }
        return o
    }
    ,
    c._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }
    ,
    c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }
    ,
    c.layout = function() {
        this._resetLayout(),
        this._manageStamps();
        var t = this._getOption("layoutInstant")
          , e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e),
        this._isLayoutInited = !0
    }
    ,
    c._init = c.layout,
    c._resetLayout = function() {
        this.getSize()
    }
    ,
    c.getSize = function() {
        this.size = i(this.element)
    }
    ,
    c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n),
        this[t] = o ? i(o)[e] : n) : this[t] = 0
    }
    ,
    c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t),
        this._layoutItems(t, e),
        this._postLayout()
    }
    ,
    c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }
    ,
    c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t),
        t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t,
                o.isInstant = e || t.isLayoutInstant,
                i.push(o)
            }, this),
            this._processLayoutQueue(i)
        }
    }
    ,
    c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }
    ,
    c._processLayoutQueue = function(t) {
        this.updateStagger(),
        t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }
    ,
    c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t),
        this.stagger)
    }
    ,
    c._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger),
        t.moveTo(e, i))
    }
    ,
    c._postLayout = function() {
        this.resizeContainer()
    }
    ,
    c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1))
        }
    }
    ,
    c._getContainerSize = d,
    c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
            t = Math.max(t, 0),
            this.element.style[e ? "width" : "height"] = t + "px"
        }
    }
    ,
    c._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }
        function o() {
            r++,
            r == s && i()
        }
        var n = this
          , s = e.length;
        if (!e || !s)
            return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }
    ,
    c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o),
        h)
            if (this.$element = this.$element || h(this.element),
            e) {
                var n = h.Event(e);
                n.type = t,
                this.$element.trigger(n, i)
            } else
                this.$element.trigger(t, i)
    }
    ,
    c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }
    ,
    c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }
    ,
    c.stamp = function(t) {
        t = this._find(t),
        t && (this.stamps = this.stamps.concat(t),
        t.forEach(this.ignore, this))
    }
    ,
    c.unstamp = function(t) {
        t = this._find(t),
        t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t),
            this.unignore(t)
        }, this)
    }
    ,
    c._find = function(t) {
        if (t)
            return "string" == typeof t && (t = this.element.querySelectorAll(t)),
            t = o.makeArray(t)
    }
    ,
    c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(),
        this.stamps.forEach(this._manageStamp, this))
    }
    ,
    c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect()
          , e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }
    ,
    c._manageStamp = d,
    c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect()
          , o = this._boundingRect
          , n = i(t)
          , s = {
            left: e.left - o.left - n.marginLeft,
            top: e.top - o.top - n.marginTop,
            right: o.right - e.right - n.marginRight,
            bottom: o.bottom - e.bottom - n.marginBottom
        };
        return s
    }
    ,
    c.handleEvent = o.handleEvent,
    c.bindResize = function() {
        t.addEventListener("resize", this),
        this.isResizeBound = !0
    }
    ,
    c.unbindResize = function() {
        t.removeEventListener("resize", this),
        this.isResizeBound = !1
    }
    ,
    c.onresize = function() {
        this.resize()
    }
    ,
    o.debounceMethod(s, "onresize", 100),
    c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }
    ,
    c.needsResizeLayout = function() {
        var t = i(this.element)
          , e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }
    ,
    c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)),
        e
    }
    ,
    c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0),
        this.reveal(e))
    }
    ,
    c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i)
        }
    }
    ,
    c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t),
        t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e),
                t.reveal()
            })
        }
    }
    ,
    c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t),
        t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e),
                t.hide()
            })
        }
    }
    ,
    c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }
    ,
    c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }
    ,
    c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t)
                return i
        }
    }
    ,
    c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this),
        e
    }
    ,
    c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
        e && e.length && e.forEach(function(t) {
            t.remove(),
            o.removeFrom(this.items, t)
        }, this)
    }
    ,
    c.destroy = function() {
        var t = this.element.style;
        t.height = "",
        t.position = "",
        t.width = "",
        this.items.forEach(function(t) {
            t.destroy()
        }),
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e],
        delete this.element.outlayerGUID,
        h && h.removeData(this.element, this.constructor.namespace)
    }
    ,
    s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }
    ,
    s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults),
        o.extend(i.defaults, e),
        i.compatOptions = o.extend({}, s.compatOptions),
        i.namespace = t,
        i.data = s.data,
        i.Item = r(n),
        o.htmlInit(i, t),
        h && h.bridget && h.bridget(t, i),
        i
    }
    ;
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n,
    s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {},
    t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";
    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype)
      , o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++,
        o.call(this),
        this.sortData = {}
    }
    ,
    i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id,
            this.sortData["original-order"] = this.id,
            this.sortData.random = Math.random();
            var t = this.layout.options.getSortData
              , e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    }
    ;
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments),
        this.css({
            display: ""
        })
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {},
    t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";
    function i(t) {
        this.isotope = t,
        t && (this.options = t.options[this.namespace],
        this.element = t.element,
        this.items = t.filteredItems,
        this.size = t.size)
    }
    var o = i.prototype
      , n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }),
    o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element)
          , i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }
    ,
    o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }
    ,
    o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }
    ,
    o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }
    ,
    o.getSegmentSize = function(t, e) {
        var i = t + e
          , o = "outer" + e;
        if (this._getMeasurement(i, o),
        !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }
    ,
    o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }
    ,
    o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }
    ,
    o.getSize = function() {
        this.isotope.getSize(),
        this.size = this.isotope.size
    }
    ,
    i.modes = {},
    i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o),
        n.prototype.constructor = n,
        e && (n.options = e),
        n.prototype.namespace = t,
        i.modes[t] = n,
        n
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(),
        this._getMeasurement("columnWidth", "outerWidth"),
        this._getMeasurement("gutter", "outerWidth"),
        this.measureColumns(),
        this.colYs = [];
        for (var t = 0; t < this.cols; t++)
            this.colYs.push(0);
        this.maxY = 0,
        this.horizontalColIndex = 0
    }
    ,
    o.measureColumns = function() {
        if (this.getContainerWidth(),
        !this.columnWidth) {
            var t = this.items[0]
              , i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter
          , n = this.containerWidth + this.gutter
          , s = n / o
          , r = o - n % o
          , a = r && r < 1 ? "round" : "floor";
        s = Math[a](s),
        this.cols = Math.max(s, 1)
    }
    ,
    o.getContainerWidth = function() {
        var t = this._getOption("fitWidth")
          , i = t ? this.element.parentNode : this.element
          , o = e(i);
        this.containerWidth = o && o.innerWidth
    }
    ,
    o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth
          , i = e && e < 1 ? "round" : "ceil"
          , o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
            x: this.columnWidth * s.col,
            y: s.y
        }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++)
            this.colYs[h] = a;
        return r
    }
    ,
    o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t)
          , i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }
    ,
    o._getTopColGroup = function(t) {
        if (t < 2)
            return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
            e[o] = this._getColGroupY(o, t);
        return e
    }
    ,
    o._getColGroupY = function(t, e) {
        if (e < 2)
            return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }
    ,
    o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols
          , o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex,
        {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }
    ,
    o._manageStamp = function(t) {
        var i = e(t)
          , o = this._getElementOffset(t)
          , n = this._getOption("originLeft")
          , s = n ? o.left : o.right
          , r = s + i.outerWidth
          , a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1,
        u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++)
            this.colYs[l] = Math.max(d, this.colYs[l])
    }
    ,
    o._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()),
        t
    }
    ,
    o._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; )
            t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }
    ,
    o.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(),
        t != this.containerWidth
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry")
      , o = i.prototype
      , n = {
        _getElementOffset: !0,
        layout: !0,
        _getMeasurement: !0
    };
    for (var s in e.prototype)
        n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems,
        r.call(this)
    }
    ;
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows")
      , i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0,
        this.y = 0,
        this.maxY = 0,
        this._getMeasurement("gutter", "outerWidth")
    }
    ,
    i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter
          , i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0,
        this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight),
        this.x += e,
        o
    }
    ,
    i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
        horizontalAlignment: 0
    })
      , i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }
    ,
    i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment
          , i = this.y;
        return this.y += t.size.outerHeight,
        {
            x: e,
            y: i
        }
    }
    ,
    i._getContainerSize = function() {
        return {
            height: this.y
        }
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n]
                  , r = i.sortData[s]
                  , a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e
                      , h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery
      , h = String.prototype.trim ? function(t) {
        return t.trim()
    }
    : function(t) {
        return t.replace(/^\s+|\s+$/g, "")
    }
      , d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0
    });
    d.Item = s,
    d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0,
        this._sorters = {},
        this._getSorters(),
        e.prototype._create.call(this),
        this.modes = {},
        this.filteredItems = this.items,
        this.sortHistory = ["original-order"];
        for (var t in r.modes)
            this._initLayoutMode(t)
    }
    ,
    l.reloadItems = function() {
        this.itemGUID = 0,
        e.prototype.reloadItems.call(this)
    }
    ,
    l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t),
        t
    }
    ,
    l._initLayoutMode = function(t) {
        var e = r.modes[t]
          , i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i,
        this.modes[t] = new e(this)
    }
    ,
    l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }
    ,
    l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(),
        this._manageStamps(),
        this.layoutItems(this.filteredItems, t),
        this._isLayoutInited = !0
    }
    ,
    l.arrange = function(t) {
        this.option(t),
        this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches,
        this._bindArrangeComplete(),
        this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e),
        this._sort(),
        this._layout()
    }
    ,
    l._init = l.arrange,
    l._hideReveal = function(t) {
        this.reveal(t.needReveal),
        this.hide(t.needHide)
    }
    ,
    l._getIsInstant = function() {
        var t = this._getOption("layoutInstant")
          , e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e,
        e
    }
    ,
    l._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0,
            t()
        }),
        this.once("hideComplete", function() {
            i = !0,
            t()
        }),
        this.once("revealComplete", function() {
            o = !0,
            t()
        })
    }
    ,
    l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a),
                u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }
    ,
    l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t)
        }
        : "function" == typeof t ? function(e) {
            return t(e.element)
        }
        : function(e) {
            return o(e.element, t)
        }
    }
    ,
    l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t),
        e = this.getItems(t)) : e = this.items,
        this._getSorters(),
        this._updateItemsSortData(e)
    }
    ,
    l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }
    ,
    l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    }
    ;
    var f = function() {
        function t(t) {
            if ("string" != typeof t)
                return t;
            var i = h(t).split(" ")
              , o = i[0]
              , n = o.match(/^\[(.+)\]$/)
              , s = n && n[1]
              , r = e(s, o)
              , a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            }
            : function(t) {
                return t && r(t)
            }
        }
        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            }
            : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    },
    l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }
    ,
    l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e])
                return !1;
        return !0
    }
    ,
    l._mode = function() {
        var t = this.options.layoutMode
          , e = this.modes[t];
        if (!e)
            throw new Error("No layout mode: " + t);
        return e.options = this.options[t],
        e
    }
    ,
    l._resetLayout = function() {
        e.prototype._resetLayout.call(this),
        this._mode()._resetLayout()
    }
    ,
    l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }
    ,
    l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }
    ,
    l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }
    ,
    l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }
    ,
    l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }
    ,
    l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(),
            this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems),
            this.filteredItems = i.concat(this.filteredItems),
            this.items = e.concat(this.items)
        }
    }
    ,
    l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide),
        this.reveal(e.matches),
        this.layoutItems(e.matches, !0),
        e.matches
    }
    ,
    l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++)
                o = e[i],
                this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++)
                e[i].isLayoutInstant = !0;
            for (this.arrange(),
            i = 0; i < n; i++)
                delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    }
    ;
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }
    ,
    l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random",
        this._sort(),
        this._layout()
    }
    ,
    l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i,
        o
    }
    ,
    l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }
    ,
    d
});
/*!
 * Lightbox v2.10.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2018 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
!function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery)
}(this, function(a) {
    function b(b) {
        this.album = [],
        this.currentImageIndex = void 0,
        this.init(),
        this.options = a.extend({}, this.constructor.defaults),
        this.option(b)
    }
    return b.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1
    },
    b.prototype.option = function(b) {
        a.extend(this.options, b)
    }
    ,
    b.prototype.imageCountLabel = function(a, b) {
        return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b)
    }
    ,
    b.prototype.init = function() {
        var b = this;
        a(document).ready(function() {
            b.enable(),
            b.build()
        })
    }
    ,
    b.prototype.enable = function() {
        var b = this;
        a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(c) {
            return b.start(a(c.currentTarget)),
            !1
        })
    }
    ,
    b.prototype.build = function() {
        if (!(a("#lightbox").length > 0)) {
            var b = this;
            a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")),
            this.$lightbox = a("#lightbox"),
            this.$overlay = a("#lightboxOverlay"),
            this.$outerContainer = this.$lightbox.find(".lb-outerContainer"),
            this.$container = this.$lightbox.find(".lb-container"),
            this.$image = this.$lightbox.find(".lb-image"),
            this.$nav = this.$lightbox.find(".lb-nav"),
            this.containerPadding = {
                top: parseInt(this.$container.css("padding-top"), 10),
                right: parseInt(this.$container.css("padding-right"), 10),
                bottom: parseInt(this.$container.css("padding-bottom"), 10),
                left: parseInt(this.$container.css("padding-left"), 10)
            },
            this.imageBorderWidth = {
                top: parseInt(this.$image.css("border-top-width"), 10),
                right: parseInt(this.$image.css("border-right-width"), 10),
                bottom: parseInt(this.$image.css("border-bottom-width"), 10),
                left: parseInt(this.$image.css("border-left-width"), 10)
            },
            this.$overlay.hide().on("click", function() {
                return b.end(),
                !1
            }),
            this.$lightbox.hide().on("click", function(c) {
                return "lightbox" === a(c.target).attr("id") && b.end(),
                !1
            }),
            this.$outerContainer.on("click", function(c) {
                return "lightbox" === a(c.target).attr("id") && b.end(),
                !1
            }),
            this.$lightbox.find(".lb-prev").on("click", function() {
                return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1),
                !1
            }),
            this.$lightbox.find(".lb-next").on("click", function() {
                return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1),
                !1
            }),
            this.$nav.on("mousedown", function(a) {
                3 === a.which && (b.$nav.css("pointer-events", "none"),
                b.$lightbox.one("contextmenu", function() {
                    setTimeout(function() {
                        this.$nav.css("pointer-events", "auto")
                    }
                    .bind(b), 0)
                }))
            }),
            this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
                return b.end(),
                !1
            })
        }
    }
    ,
    b.prototype.start = function(b) {
        function c(a) {
            d.album.push({
                alt: a.attr("data-alt"),
                link: a.attr("href"),
                title: a.attr("data-title") || a.attr("title")
            })
        }
        var d = this
          , e = a(window);
        e.on("resize", a.proxy(this.sizeOverlay, this)),
        a("select, object, embed").css({
            visibility: "hidden"
        }),
        this.sizeOverlay(),
        this.album = [];
        var f, g = 0, h = b.attr("data-lightbox");
        if (h) {
            f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');
            for (var i = 0; i < f.length; i = ++i)
                c(a(f[i])),
                f[i] === b[0] && (g = i)
        } else if ("lightbox" === b.attr("rel"))
            c(b);
        else {
            f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
            for (var j = 0; j < f.length; j = ++j)
                c(a(f[j])),
                f[j] === b[0] && (g = j)
        }
        var k = e.scrollTop() + this.options.positionFromTop
          , l = e.scrollLeft();
        this.$lightbox.css({
            top: k + "px",
            left: l + "px"
        }).fadeIn(this.options.fadeDuration),
        this.options.disableScrolling && a("html").addClass("lb-disable-scrolling"),
        this.changeImage(g)
    }
    ,
    b.prototype.changeImage = function(b) {
        var c = this;
        this.disableKeyboardNav();
        var d = this.$lightbox.find(".lb-image");
        this.$overlay.fadeIn(this.options.fadeDuration),
        a(".lb-loader").fadeIn("slow"),
        this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),
        this.$outerContainer.addClass("animating");
        var e = new Image;
        e.onload = function() {
            var f, g, h, i, j, k;
            d.attr({
                alt: c.album[b].alt,
                src: c.album[b].link
            }),
            a(e),
            d.width(e.width),
            d.height(e.height),
            c.options.fitImagesInViewport && (k = a(window).width(),
            j = a(window).height(),
            i = k - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20,
            h = j - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - 120,
            c.options.maxWidth && c.options.maxWidth < i && (i = c.options.maxWidth),
            c.options.maxHeight && c.options.maxHeight < i && (h = c.options.maxHeight),
            (e.width > i || e.height > h) && (e.width / i > e.height / h ? (g = i,
            f = parseInt(e.height / (e.width / g), 10),
            d.width(g),
            d.height(f)) : (f = h,
            g = parseInt(e.width / (e.height / f), 10),
            d.width(g),
            d.height(f)))),
            c.sizeContainer(d.width(), d.height())
        }
        ,
        e.src = this.album[b].link,
        this.currentImageIndex = b
    }
    ,
    b.prototype.sizeOverlay = function() {
        this.$overlay.width(a(document).width()).height(a(document).height())
    }
    ,
    b.prototype.sizeContainer = function(a, b) {
        function c() {
            d.$lightbox.find(".lb-dataContainer").width(g),
            d.$lightbox.find(".lb-prevLink").height(h),
            d.$lightbox.find(".lb-nextLink").height(h),
            d.showImage()
        }
        var d = this
          , e = this.$outerContainer.outerWidth()
          , f = this.$outerContainer.outerHeight()
          , g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right
          , h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
        e !== g || f !== h ? this.$outerContainer.animate({
            width: g,
            height: h
        }, this.options.resizeDuration, "swing", function() {
            c()
        }) : c()
    }
    ,
    b.prototype.showImage = function() {
        this.$lightbox.find(".lb-loader").stop(!0).hide(),
        this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),
        this.updateNav(),
        this.updateDetails(),
        this.preloadNeighboringImages(),
        this.enableKeyboardNav()
    }
    ,
    b.prototype.updateNav = function() {
        var a = !1;
        try {
            document.createEvent("TouchEvent"),
            a = !!this.options.alwaysShowNavOnTouchDevices
        } catch (a) {}
        this.$lightbox.find(".lb-nav").show(),
        this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"),
        this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(),
        a && this.$lightbox.find(".lb-prev").css("opacity", "1")),
        this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(),
        a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }
    ,
    b.prototype.updateDetails = function() {
        var b = this;
        if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
            var c = this.$lightbox.find(".lb-caption");
            this.options.sanitizeTitle ? c.text(this.album[this.currentImageIndex].title) : c.html(this.album[this.currentImageIndex].title),
            c.fadeIn("fast").find("a").on("click", function(b) {
                void 0 !== a(this).attr("target") ? window.open(a(this).attr("href"), a(this).attr("target")) : location.href = a(this).attr("href")
            })
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var d = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(d).fadeIn("fast")
        } else
            this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"),
        this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
            return b.sizeOverlay()
        })
    }
    ,
    b.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
            (new Image).src = this.album[this.currentImageIndex + 1].link
        }
        if (this.currentImageIndex > 0) {
            (new Image).src = this.album[this.currentImageIndex - 1].link
        }
    }
    ,
    b.prototype.enableKeyboardNav = function() {
        a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
    }
    ,
    b.prototype.disableKeyboardNav = function() {
        a(document).off(".keyboard")
    }
    ,
    b.prototype.keyboardAction = function(a) {
        var b = a.keyCode
          , c = String.fromCharCode(b).toLowerCase();
        27 === b || c.match(/x|o|c/) ? this.end() : "p" === c || 37 === b ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : "n" !== c && 39 !== b || (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }
    ,
    b.prototype.end = function() {
        this.disableKeyboardNav(),
        a(window).off("resize", this.sizeOverlay),
        this.$lightbox.fadeOut(this.options.fadeDuration),
        this.$overlay.fadeOut(this.options.fadeDuration),
        a("select, object, embed").css({
            visibility: "visible"
        }),
        this.options.disableScrolling && a("html").removeClass("lb-disable-scrolling")
    }
    ,
    new b
});
//# sourceMappingURL=lightbox.min.map

    
    



