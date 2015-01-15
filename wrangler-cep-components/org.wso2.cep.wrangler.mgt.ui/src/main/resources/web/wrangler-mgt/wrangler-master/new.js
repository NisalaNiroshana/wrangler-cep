var dw = {};
dw.version = {major: 0, minor: 1};
dw.error = function (d) {
    typeof console == "undefined" ? alert(d) : console.error(d)
};
dw.listen = function (d, a, b) {
    b = dw.listener(b);
    return d.addEventListener ? d.addEventListener(a, b, false) : d.attachEvent("on" + a, b)
};
dw.listener = function (d) {
    return d.$listener || (d.$listener = function (a) {
        try {
            dw.event = a;
            return d.call(this, a)
        } finally {
            delete dw.event
        }
    })
};
dw.jq = function (d) {
    return jQuery(document.createElement(d))
};
dw.add_select_option = function (d, a, b) {
    if (arguments.length < 3)b = a;
    var c = document.createElement("option");
    c.value = b;
    c.text = a;
    d[0].options.add(c)
};
dw.progress_call = function (d) {
    var_args = Array.prototype.slice.call(arguments).slice(2);
    d.apply(var_args[0], var_args);
    return this
};
dw.log = function (d) {
    d.dt = new Date;
    var a = d.table;
    d.table = [];
    JSON.stringify(d);
    d.table = a
};
dw.merge_sort = function (d, a) {
    a = a || dw.merge_sort.stringCompare;
    if (d.length < 2)return d;
    var b = Math.ceil(d.length / 2);
    return dw.merge_sort.merge(dw.merge_sort(d.slice(0, b), a), dw.merge_sort(d.slice(b), a), a)
};
dw.merge_sort.merge = function (d, a, b) {
    for (var c = []; d.length > 0 && a.length > 0;)b(d[0], a[0]) < 0 ? c.push(d.shift()) : c.push(a.shift());
    for (; d.length > 0;)c.push(d.shift());
    for (; a.length > 0;)c.push(a.shift());
    return c
};
dw.merge_sort.stringCompare = function (d, a) {
    d = "" + d;
    a = "" + a;
    return dw.merge_sort.compare(d, a)
};
dw.merge_sort.compare = function (d, a) {
    return d == a ? 0 : d < a ? -1 : 1
};
dw.merge_sort.numberCompare = function (d, a) {
    if (d === undefined && a === undefined)return 0;
    if (d === undefined)return -1;
    if (a === undefined)return 1;
    leftNo = Number(d);
    rightNo = Number(a);
    if (isNaN(leftNo) && isNaN(rightNo))return dw.merge_sort.compare(d, a); else if (isNaN(leftNo))return -1; else if (isNaN(rightNo))return 1;
    return dw.merge_sort.compare(leftNo, rightNo)
};
dw.merge_sort.dateCompare = function (d, a) {
    leftNo = Number(d);
    rightNo = Number(a);
    if (isNaN(leftNo) && isNaN(rightNo))return dw.merge_sort.compare(d, a); else if (isNaN(leftNo))return rightNo; else if (isNaN(rightNo))return leftNo;
    return dw.merge_sort.compare(leftNo, rightNo)
};
dw.merge_sort.getDateComparison = function () {
    var d = function (a) {
        return Date.parse(a)
    };
    return function (a, b) {
        leftNo = d(a);
        rightNo = d(b);
        if (leftNo && rightNo) {
            if (leftNo < rightNo)return -1;
            if (rightNo > leftNo)return 1;
            return 0
        } else if (leftNo)return -1; else if (rightNo)return 1;
        return dw.merge_sort.compare(leftNo, rightNo)
    }
};
dw.display_name = function (d) {
    return d
};
dw.JSON = {};
(function () {
    function d(j) {
        return j < 10 ? "0" + j : j
    }

    function a(j) {
        e.lastIndex = 0;
        return e.test(j) ? '"' + j.replace(e, function (i) {
            var l = h[i];
            return typeof l === "string" ? l : "\\u" + ("0000" + i.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + j + '"'
    }

    function b(j, i) {
        var l, m, q = f, s, o = i[j];
        if (o && typeof o === "object" && typeof o.toJSON === "function")o = o.toJSON(j);
        if (typeof k === "function")o = k.call(i, j, o);
        switch (typeof o) {
            case "string":
                return a(o);
            case "number":
                return isFinite(o) ? String(o) : "null";
            case "boolean":
            case "null":
                return String(o);
            case "object":
                if (!o)return "null";
                f += g;
                s = [];
                if (Object.prototype.toString.apply(o) === "[object Array]") {
                    m = o.length;
                    for (j = 0; j < m; j += 1)s[j] = b(j, o) || "null";
                    i = s.length === 0 ? "[]" : f ? "[\n" + f + s.join(",\n" + f) + "\n" + q + "]" : "[" + s.join(",") + "]";
                    f = q;
                    return i
                }
                if (k && typeof k === "object") {
                    m = k.length;
                    for (j = 0; j < m; j += 1) {
                        l = k[j];
                        if (typeof l === "string")if (i = b(l, o))s.push(a(l) + (f ? ": " : ":") + i)
                    }
                } else for (l in o)if (Object.hasOwnProperty.call(o, l))if (i = b(l, o))s.push(a(l) + (f ? ": " : ":") + i);
                i = s.length === 0 ? "{}" : f ? "{\n" + f + s.join(",\n" + f) +
                "\n" + q + "}" : "{" + s.join(",") + "}";
                f = q;
                return i
        }
    }

    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        }
    }
    var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f, g, h = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, k;
    if (typeof dw.JSON.stringify !== "function")dw.JSON.stringify = function (j, i, l) {
        var m;
        g = f = "";
        if (typeof l === "number")for (m = 0; m < l; m += 1)g += " "; else if (typeof l === "string")g = l;
        if ((k = i) && typeof i !== "function" && (typeof i !== "object" || typeof i.length !== "number"))throw new Error("dw.JSON.stringify");
        return b("", {"": j})
    };
    if (typeof dw.JSON.parse !== "function")dw.JSON.parse = function (j, i) {
        function l(m, q) {
            var s, o, r = m[q];
            if (r && typeof r === "object")for (s in r)if (Object.hasOwnProperty.call(r, s)) {
                o = l(r, s);
                if (o !== undefined)r[s] = o; else delete r[s]
            }
            return i.call(m, q, r)
        }

        j = String(j);
        c.lastIndex = 0;
        if (c.test(j))j = j.replace(c, function (m) {
            return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4)
        });
        if (/^[\],:{}\s]*$/.test(j.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            j = eval("(" + j + ")");
            return typeof i === "function" ? l({"": j}, "") : j
        }
        throw new SyntaxError("dw.JSON.parse");
    }
})();
dw.wrangle = function () {
    var d = [];
    d.apply = function (a) {
        if (typeOf(a) != "array")a = [a];
        d.forEach(function (b) {
            if (b.active() || b.invalid()) {
                var c = b.check_validity(a);
                if (c.valid) {
                    b.sample_apply(a);
                    dw.infer_type_transforms(a[0]).forEach(function (e) {
                        e.sample_apply([a[0]])
                    });
                    b.validate()
                } else b.invalidate(c.errors)
            }
        });
        dw.summary.clear_cache();
        return d
    };
    d.add = function (a) {
        d.push(a);
        return d
    };
    return d
};
dw = dw || {};
dw.regex = function () {
    var d = {}, a = function (f) {
        return [new RegExp(f), /\d+/]
    }, b = function (f) {
        var g = [new RegExp(f), /[a-zA-Z]+/];
        if (f.toLowerCase() === f)g.push(/[a-z]+/); else f.toUpperCase() === f && g.push(/[A-Z]+/);
        return g
    }, c = function (f) {
        var g;
        if (["|"].indexOf(f) != -1)f = "\\" + f;
        try {
            g = new RegExp(f)
        } catch (h) {
            g = new RegExp("\\" + f)
        }
        return [g]
    };
    d.candidates = function (f) {
        if (f.length) {
            var g = d.parse(f[0].text, f[0].start, f[0].end), h = f.slice(0), k;
            f = (g.on || []).map(function (l) {
                return {on: l}
            });
            var j = g.before, i = g.after;
            g = j === undefined ||
            j.length === 0 ? i.map(function (l) {
                return {after: l, on: /.*/}
            }) : i === undefined || i.length === 0 ? j.map(function (l) {
                return {before: l, on: /.*/}
            }) : (j || []).reduce(function (l, m) {
                return l.concat((i || []).map(function (q) {
                    return {before: m, after: q, on: /.*/}
                }))
            }, []);
            g = f.concat(g);
            if (h.length === 0)return g;
            return g = g.filter(function (l) {
                return h.filter(function (m) {
                    k = dw.regex.match(m.text, l);
                    return k.length < 2 || k[1].start != m.start || k[1].end != m.end
                }).length === 0
            })
        }
        return []
    };
    var e = function (f) {
        f = f.map(function (g) {
            return g.toString().replace(/^\/|\/$/g,
                "")
        }).join("");
        return new RegExp(f)
    };
    d.parse = function (f, g, h, k) {
        f = "" + f;
        var j = /([a-zA-Z]+)|([0-9]+)|([^a-zA-Z0-9])/g;
        f = (f.substring(0, g).match(j) || []).concat(f.substring(g, h).match(j) || []).concat(f.substring(h).match(j) || []);
        k = k || {};
        var i, l, m, q = 0;
        j = k.matchAfter || 3;
        var s = k.matchBefore || 3;
        f = f.filter(function (r) {
            return r != null
        });
        k = f.map(function (r, u) {
            i = r.charCodeAt(0);
            if (g >= q && g < q + r.length)l = u;
            if (h > q && h <= q + r.length)m = u;
            q += r.length;
            return i > 64 && i < 91 || i > 96 && i < 123 ? b(r) : i > 47 && i < 58 ? a(r) : c(r)
        });
        if (l === undefined)l =
            f.length - 1;
        if (m === undefined)m = f.length - 1;
        f = k.slice(l, m + 1).reduce(function (r, u) {
            var n = [];
            r.forEach(function (t) {
                u.forEach(function (v) {
                    n.push(t.concat(v))
                })
            });
            return n
        }, [[]]);
        var o = function (r, u) {
            var n = [];
            if (r.length) {
                r.forEach(function (t) {
                    u.forEach(function (v) {
                        n.push(t.concat(v))
                    })
                });
                return r.concat(n)
            } else return u.map(function (t) {
                return [t]
            })
        };
        j = k.slice(Math.max(l - j - 1, 0), l).reverse().reduce(o, []);
        k = k.slice(m + 1, Math.min(m + s + 1, k.length)).reduce(o, []);
        return {
            on: f.map(e), after: (j || []).map(function (r) {
                return e(r.reverse())
            }),
            before: (k || []).map(function (r) {
                return e(r)
            })
        }
    };
    return d
};
dw.regex.record = function (d, a, b, c, e, f) {
    return {text: d, start: a, end: b, col: c, row: e, table: f}
};
dw.regex.friendly_description = function (d) {
    d = d.toString().replace(/^\/|\/$/g, "");
    d = d.replace(/\n/g, "newline");
    d = d.replace(/ /g, " ");
    d = d.replace(/\t/g, "tab");
    d = d.replace(/\(?(\[0\-9\]|\\d)\+\)?/g, " any number ");
    d = d.replace(/\(?(\[a\-z\A\-Z\]|\[A\-Z\a\-\z\])\+\)?/g, " any word ");
    d = d.replace(/\(?(\[a\-z\])\+\)?/g, " any lowercase word ");
    d = d.replace(/\(?(\[A\-Z\])\+\)?/g, " any uppercase word ");
    d = d.replace(/\$$/, "{end}");
    d = d.replace(/^\^/, "{begin}");
    d = d.replace("\\", "");
    if (d === "newline")return d;
    return "'" +
    d + "'"
};
dw.regex.description_length = function (d) {
    if (!d)return 0;
    d = d.toString().replace(/^\/|\/$/g, "");
    d = d.replace(/\\n/g, "n");
    d = d.replace(/ /g, " ");
    d = d.replace(/\t/g, "t");
    d = d.replace(/\(?(\[0\-9\]|\\d)\+\)?/g, "n");
    d = d.replace(/\(?(\[A\-Z\])\+\)?/g, " w");
    d = d.replace(/\(?(\[a\-z\])\+\)?/g, "w");
    d = d.replace(/\(?(\[a\-z\A\-Z\]|\[A\-Z\a\-\z\])\+\)?/g, "w");
    d = d.replace(/\$$/, "e");
    d = d.replace(/^\^/, "b");
    d = d.replace("\\", "");
    return d.match(/([a-zA-Z]+)|([0-9]+)|([^a-zA-Z0-9])/g).length + 1
};
dw.regex.match = function (d, a) {
    if (!d)return "";
    var b = a.max_splits;
    if (b === undefined)b = 1;
    var c = {start: 0, end: d.length, value: d};
    d = [];
    var e = 0, f = Number(a.which);
    if (isNaN(f))f = 1;
    for (; b <= 0 || e < b * f;) {
        var g = dw.regex.matchOnce(c.value, a);
        if (g.length > 1) {
            c = g[2];
            d.push(g[0]);
            d.push(g[1])
        } else break;
        e++;
        if (e > 1E3)break
    }
    d.push(c);
    a = 0;
    b = [];
    c = "";
    for (e = 0; e < d.length; ++e) {
        if (e % 2 === 1) {
            a++;
            if (a === f) {
                b.push({value: c, start: 0, end: c.length});
                b.push({start: c.length, end: c.length + d[e].value.length, value: d[e].value});
                a = 0;
                c = "";
                continue
            }
        }
        c +=
            d[e].value
    }
    b.push({start: 0, end: c.length, value: c});
    return b
};
dw.regex.matchOnce = function (d, a) {
    var b = a.positions, c = [];
    if (b && b.length)if (b.length == 2) {
        if (d.length >= b[1]) {
            var e = b[0];
            b = b[1];
            c.push({start: 0, end: e, value: d.substr(0, e)});
            c.push({start: e, end: b, value: d.substr(e, b - e)});
            c.push({start: b, end: d.length, value: d.substr(b)});
            return c
        }
        return [{start: 0, end: d.length, value: d}]
    }
    e = a.before;
    b = a.after;
    for (var f = a.on, g = a.ignore_between, h = d, k = 0, j = 0; h.length;) {
        var i = h, l = 0;
        j = k;
        if (g)if (a = h.match(g)) {
            i = i.substr(0, a.index);
            k += a.index + a[0].length;
            h = h.substr(a.index + a[0].length)
        } else h =
            ""; else h = "";
        if (b)if (a = i.match(b)) {
            l = a.index + a[0].length;
            i = i.substr(l)
        } else continue;
        if (e)if (a = i.match(e))i = i.substr(0, a.index); else continue;
        if (a = i.match(f)) {
            e = j + l + a.index;
            b = e + a[0].length;
            c.push({start: 0, end: e, value: d.substr(0, e)});
            c.push({start: e, end: b, value: d.substr(e, b - e)});
            c.push({start: b, end: d.length, value: d.substr(b)});
            return c
        }
    }
    return [{start: 0, end: d.length, value: d}]
};
dw.copy = function (d) {
    var a = dw.map(d);
    a.well_defined = function () {
        return a._column.length === 1
    };
    a.transform = function (b) {
        return b
    };
    a.description = function () {
        return ["Copy", dw.column_clause(a, a._column, "column")]
    };
    a.name = dw.transform.COPY;
    return a
};
dw.cut = function (d) {
    var a = dw.textPattern(d);
    a._drop = false;
    a._update = true;
    a.transform = function (b) {
        if (b[0] === undefined)return [];
        if (a._positions && a._positions.length) {
            var c = "" + b[0], e = a._positions;
            b = e[0];
            e = e[1] || e[0];
            var f = [];
            f.push(c.substring(0, b) + c.substring(e));
            f.stats = [{splits: [{start: b, end: e}]}];
            return f
        } else {
            e = [];
            for (f = 0; f < b.length; ++f) {
                c = b[f];
                c = dw.regex.match(c, {
                    which: a._which,
                    max_splits: a._max,
                    before: a._before,
                    after: a._after,
                    on: a._on,
                    ignore_between: a._ignore_between
                });
                var g = [];
                g.stats = [];
                for (var h =
                    0; h < c.length; ++h)h % 2 == 0 ? g.push(c[h].value) : g.stats.push({
                    splits: [{
                        start: c[h].start,
                        end: c[h].end
                    }]
                });
                e.push(g.join(""));
                if (!f)e.stats = g.stats
            }
            return e
        }
    };
    a.description = function () {
        var b = [a._column && a._column.length ? "Cut from" : "Cut", dw.column_clause(a, a._column, "column")];
        regex = a.match_description();
        return b = b.concat(regex)
    };
    a.name = dw.transform.CUT;
    return a
};
dw.drop = function (d) {
    var a = dw.transform(d);
    a._drop = true;
    dv.ivar(a, []);
    a.description = function () {
        return ["Drop", dw.column_clause(a, a._column, "column", {editor_class: "droppedColumn"})]
    };
    a.apply = function (b) {
        var c = a.getTable(b);
        b = a.columns(c);
        a._drop && b.forEach(function (e) {
            c.removeColumn(e.name)
        });
        return {droppedCols: b}
    };
    a.name = dw.transform.DROP;
    return a
};
dw.extract = function (d) {
    var a = dw.textPattern(d);
    a.transform = function (b) {
        if (b[0] === undefined)return [];
        if (a._positions && a._positions.length) {
            b = "" + b[0];
            var c = a._positions, e = c[0];
            c = c[1] || c[0];
            var f = [];
            if (c <= b.length) {
                f.push(b.substring(e, c));
                f.stats = [{splits: [{start: e, end: c}]}]
            }
            return f
        } else {
            b = dw.regex.match(b[0], {
                which: a._which,
                max_extracts: a._max,
                before: a._before,
                after: a._after,
                on: a._on,
                ignore_between: a._ignore_between
            });
            e = [];
            e.stats = [];
            for (c = 0; c < b.length; ++c)if (c % 2 == 1) {
                e.push(b[c].value);
                e.stats.push({
                    splits: [{
                        start: b[c].start,
                        end: b[c].end
                    }]
                })
            }
            return e
        }
    };
    a.description = function () {
        var b = ["Extract from", dw.column_clause(a, a._column, "column", {editor_class: "none"})];
        regex = a.match_description({editor_class: "extract"});
        return b = b.concat(regex)
    };
    a.name = dw.transform.EXTRACT;
    return a
};
dw.LEFT = "left";
dw.UP = "up";
dw.DOWN = "down";
dw.RIGHT = "right";
dw.COPY = "copy";
dw.INTERPOLATE = "interpolate";
dw.fill = function (d) {
    var a = dw.transform(d);
    dv.ivar(a, [{name: "direction", initial: dw.DOWN}, {name: "method", initial: dw.COPY}, {
        name: "row",
        initial: undefined
    }]);
    a.description_length = function () {
        if (a._row)return a._row.description_length();
        return 0
    };
    a.description = function () {
        return ["Fill", dw.column_clause(a, a._column, "column", {all_columns: true}), dw.row_clause(a, a._row, "row", {editor_class: "updatedColumn"}), "with", "values from", dw.select_clause(a, {
            select_options: {right: "the left", left: "the right", up: "below", down: "above"},
            param: "direction"
        })]
    };
    a.apply = function (b) {
        b = a.getTable(b);
        var c = a.columns(b), e = b.rows(), f = a._row || dw.row(), g = a._direction;
        if (a._method === dw.COPY) {
            var h, k;
            if (g === dw.DOWN)for (var j = 0; j < c.length; ++j) {
                g = c[j];
                k = undefined;
                for (var i = 0; i < e; ++i) {
                    h = g[i];
                    if (h === undefined || h === "") {
                        if (f.test(b, i))g[i] = k
                    } else k = h
                }
            } else if (g === dw.RIGHT)for (i = 0; i < e; ++i) {
                if (f.test(b, i)) {
                    k = undefined;
                    for (j = 0; j < c.length; ++j) {
                        g = c[j];
                        h = g[i];
                        if (h === undefined || h === "")g[i] = k; else k = h
                    }
                }
            } else if (g === dw.LEFT)for (i = 0; i < e; ++i) {
                if (f.test(b, i)) {
                    k =
                        undefined;
                    for (j = c.length - 1; j >= 0; --j) {
                        g = c[j];
                        h = g[i];
                        if (h === undefined || h === "")g[i] = k; else k = h
                    }
                }
            } else if (g === dw.UP)for (j = 0; j < c.length; ++j) {
                g = c[j];
                k = undefined;
                for (i = e - 1; i >= 0; --i) {
                    h = g[i];
                    if (h === undefined || h === "") {
                        if (f.test(b, i))g[i] = k
                    } else k = h
                }
            }
        }
        return {updatedCols: c}
    };
    a.horizontal = function () {
        return a._direction === dw.LEFT || a._direction === dw.RIGHT
    };
    a.well_defined = function (b) {
        b = a.columns(b);
        a.horizontal();
        if (a._row) {
            var c = a._row.conditions();
            if (c.length === 1)if (c[0].name !== dw.row.INDEX)if (c[0].name === dw.row.EMPTY)return false
        }
        if (a.horizontal()) {
            if (b.length ===
                1)return false;
            var e = false, f = false;
            if (a._row === undefined) {
                if (a._direction === dw.LEFT)for (var g = 0; g < b.length; ++g) {
                    c = b[g];
                    if (dw.summary(c).missing.length === 0) {
                        if (f) {
                            e = true;
                            break
                        }
                    } else f = true
                } else if (a._direction === dw.RIGHT)for (g = b.length - 1; g >= 0; --g) {
                    c = b[g];
                    if (dw.summary(c).missing.length === 0) {
                        if (f) {
                            e = true;
                            break
                        }
                    } else f = true
                }
                if (!e)return false
            }
        } else if (b.filter(function (h) {
                return dw.summary(h).missing.length === 0
            }).length)return false;
        return true
    };
    a.enums = function () {
        return ["direction"]
    };
    a.name = dw.transform.FILL;
    return a
};
dw.filter = function (d) {
    var a = dw.transform();
    d = dw.row(d);
    dv.ivar(a, [{name: "row", initial: d}]);
    a.description = function () {
        return ["Delete", dw.row_clause(a, a._row, "row")]
    };
    a.description_length = function () {
        if (a._row)return a._row.description_length();
        return 0
    };
    a.apply = function (b, c) {
        c = c || {};
        b = a.getTable(b);
        var e = b.cols(), f = b.rows(), g = a._row, h = b.slice(0, 0), k = [];
        f = c.end_row || f;
        for (var j = c.start_row || 0; j < f; ++j)if (g.test(b, j))k.push(j); else for (c = 0; c < e; ++c) {
            col = h[c];
            col.push(b[c][j])
        }
        e = b.cols();
        g = b.names();
        f = b.types();
        for (c = 0; c < e; ++c)b.removeColumn(0);
        for (c = 0; c < e; ++c)b.addColumn(g[c], h[c], f[c]);
        return {effectedRows: k}
    };
    a.valid_columns = function (b) {
        if (a._row)return a._row.valid_columns(b);
        return {valid: true}
    };
    a.well_defined = function () {
        return a._row.conditions().length
    };
    a.name = dw.transform.FILTER;
    return a
};
dw.fold = function (d) {
    var a = dw.transform(d);
    dv.ivara(a, {name: "keys", initial: [-1]});
    a.description = function () {
        return ["Fold", dw.column_clause(a, a._column, "column"), " using ", dw.key_clause(a, a._keys.map(function (b) {
            return b === -1 ? "header" : b
        }), "keys", {
            editor_class: "fold", clean_val: function (b) {
                return Number(b)
            }
        }), a._keys.length === 1 ? "as a key" : " as keys "]
    };
    a.apply = function (b, c) {
        c = c || {};
        var e = a.getTable(b);
        b = a.columns(e);
        var f = b.map(function (n) {
            return n.name
        }), g = e.rows(), h = 0, k, j = c.start_row || 0;
        c = c.end_row ||
        g;
        c = Math.min(c, g);
        g = b.map(function (n) {
            return a._keys.reduce(function (t, v) {
                v === -1 ? t.push(dw.display_name(n.name)) : t.push(n[v]);
                return t
            }, [])
        });
        var i = dv.range(g[0].length).map(function () {
            var n = [];
            n.name = "fold";
            n.type = dv.type.nominal;
            return n
        }), l = [];
        l.name = "value";
        l.type = dv.type.nominal;
        var m, q = false, s = e.filter(function (n) {
            if (f.indexOf(n.name) === -1)return true; else q || (m = n);
            q = true;
            return false
        }).map(function (n) {
            var t = [];
            t.name = n.name;
            t.type = n.type;
            return t
        });
        for (j = j; j < c; ++j)if (a._keys.indexOf(j) === -1)for (var o =
            0; o < b.length; ++o) {
            for (var r = 0; r < s.length; ++r) {
                k = s[r];
                k[h] = e[k.name][j]
            }
            for (k = 0; k < i.length; ++k)i[k][h] = g[o][k];
            l[h] = b[o][j];
            ++h
        }
        for (var u = m ? m.index() : 0; e.cols();)e.removeColumn(0);
        s.forEach(function (n) {
            e.addColumn(n.name, n, n.type)
        });
        i.concat([l]).forEach(function (n, t) {
            e.addColumn(n.name, n, n.type, n.wrangler_type, n.wrangler_role, {index: u + t})
        });
        return {keyCols: i, valueCols: [l], toValueCols: b, keyRows: a._keys}
    };
    a.well_defined = function () {
        return true
    };
    a.name = dw.transform.FOLD;
    return a
};
dw.map = function (d) {
    var a = dw.transform(d);
    dv.ivar(a, [{name: "result", initial: dw.COLUMN}, {name: "update", initial: false}, {
        name: "insert_position",
        initial: dw.INSERT_RIGHT
    }, {name: "row", initial: undefined}]);
    a.apply = function (b, c) {
        c = c || {};
        var e = a.getTable(b), f = a.columns(e), g = e.rows(), h;
        b = [];
        var k = c.start_row || 0;
        c = c.end_row || g;
        g = a._row;
        var j = dw.transform.tableUpdate(a, e, f);
        for (k = k; k < c; ++k)if (!g || g.test(e, k)) {
            h = [];
            for (var i = 0; i < f.length; ++i)h.push(f[i][k]);
            h = a.transform(h);
            b.push(h.stats);
            h = j.update(k, h);
            if (h >
                1E3)break
        }
        j.finish();
        e = j.stats();
        e.valueStats = b;
        return e
    };
    return a
};
dw.merge = function (d) {
    var a = dw.map(d);
    dv.ivar(a, [{name: "glue", initial: ""}]);
    a.transform = function (b) {
        var c = a.glue();
        return [b.filter(function (e) {
            return e != undefined
        }).join(c)]
    };
    a.description = function () {
        return ["Merge", dw.column_clause(a, a._column, "column"), " with glue ", dw.input_clause(a, "glue")]
    };
    a.well_defined = function () {
        return a._column.length > 1
    };
    a.name = dw.transform.MERGE;
    return a
};
dw.reduce = function (d) {
    var a = dw.transform(d);
    dv.ivara(a, [{name: "measures", initial: []}]);
    a.description = function () {
        return ["reduce", dw.column_clause(a, a._column), " with aggregates ", dw.column_clause(a, a._measures)]
    };
    a.apply = function (b) {
        b = a.getTable(b);
        b.slice(0, b.rows(), {compress: true});
        var c = a.columns(b).map(function (e) {
            return e.name
        });
        b.rows();
        b.query({
            dims: c, vals: a._measures.map(function (e) {
                return dv.first(e)
            })
        });
        b = dv.table([]);
        return {}
    };
    a.name = dw.transform.UNFOLD;
    return a
};
dw.row = function (d) {
    var a = dw.transform();
    dv.ivara(a, [{name: "conditions", initial: d || []}]);
    a.description_length = function () {
        if (a._conditions.length === 0)return 0;
        if (a._conditions.length === 1)switch (a._conditions[0].name) {
            case dw.row.INDEX:
                return 1;
            case dw.row.EMPTY:
                return 2;
            default:
                break
        }
        return 3
    };
    a.description = function () {
        if (a._conditions.length === 1)switch (a._conditions[0].name) {
            case dw.row.INDEX:
            case dw.row.EMPTY:
                return a._conditions[0].description({simple: true});
            default:
                break
        }
        return [" rows where " + a._conditions.map(function (b) {
            return b.description()
        }).join(" and ")]
    };
    a.formula = function () {
        return a._conditions.map(function (b) {
            return b.description()
        }).join(" and ")
    };
    a.valid_columns = function (b) {
        for (var c = a._conditions, e, f = 0; f < c.length; ++f) {
            e = c[f];
            e = e.valid_columns(b);
            if (!e.valid)return e
        }
        return {valid: true}
    };
    a.test = function (b, c) {
        for (var e = a._conditions, f, g = 0; g < e.length; ++g) {
            f = e[g];
            if (!f.test(b, c))return 0
        }
        return 1
    };
    a.name = dw.transform.ROW;
    return a
};
dw.row.fromFormula = function (d) {
    if (d === "")return dw.row([]);
    d = d.split(/ & /g);
    d = d.map(function (a) {
        if (a === "row is empty")return dw.empty();
        if (e = a.indexOf("index in (") != -1) {
            var b = a.substring(e + 9, a.length - 1);
            b = b.split(/,/g).map(function (f) {
                return Number(f) - 1
            });
            return dw.rowIndex(b)
        }
        var c = a.match(/\=|<\=|>\=|!=|is null|is not|matches role|matches type|like/);
        b = c[0];
        var e = c.index;
        c = a.substr(0, e).replace(/^ */, "").replace(/ *$/, "");
        a = a.substr(e + b.length).replace(/^ * /, "").replace(/ *$/, "");
        switch (a) {
            case "a number":
                a =
                    dw.number();
                break;
            case "a date":
                a = dw.date();
                break;
            case "a string":
                a = dw.string();
                break;
            case "a integer":
                a = dw.integer();
                break;
            default:
                a = a[0] === "'" ? a.substring(1, a.length - 1) : Number(a)
        }
        switch (b) {
            case "=":
                b = dw.eq(c, a, true);
                break;
            case "<":
                b = dw.lt(c, a, true);
                break;
            case "<=":
                b = dw.le(c, a, true);
                break;
            case ">":
                b = dw.gt(c, a, true);
                break;
            case ">=":
                b = dw.ge(c, a, true);
                break;
            case "!=":
                b = dw.ne(c, a, true);
                break;
            case "is null":
                b = dw.is_null(c);
                break;
            case "matches role":
                b = dw.matches_role(c);
                break;
            case "is not":
                b = dw.matches_type(c,
                    a);
                break;
            case "matches type":
                b = dw.matches_type(c);
                break;
            case "~":
                b = dw.like(c, a, true);
                break;
            default:
                throw"Invalid row predicates";
        }
        return b
    });
    return dw.row(d)
};
dw.row.INDEX = "rowIndex";
dw.row.EMPTY = "empty";
dw.row.IS_NULL = "is_null";
dw.row.IS_VALID = "is_valid";
dw.row.MATCHES_ROLE = "is_role";
dw.row.MATCHES_TYPE = "is_type";
dw.row.STARTS_WITH = "starts_with";
dw.row.LIKE = "like";
dw.row.EQUALS = "eq";
dw.row.CONTAINS = "contains";
dw.rowIndex = function (d) {
    var a = dw.transform();
    dv.ivara(a, [{name: "indices", initial: d || []}]);
    a.test = function (b, c) {
        return a._indices.indexOf(c) != -1
    };
    a.description = function (b) {
        b = b || {};
        d = a._indices;
        return b.simple ? (d.length === 1 ? d[0] === -1 ? "" : "row " : "rows ") + d.map(function (c) {
            return c === -1 ? "header" : c + 1
        }).join(",") : "index in (" + d.map(function (c) {
            return c + 1
        }).join(",") + ")"
    };
    a.valid_columns = function () {
        return {valid: true}
    };
    a.name = dw.row.INDEX;
    return a
};
dw.vcompare = function (d, a) {
    var b = dw.transform();
    dv.ivar(b, [{name: "lcol", initial: d}, {name: "value", initial: a}]);
    b.test = function (c, e) {
        return b.compare(c[b._lcol][e], a)
    };
    b.description = function () {
        return dw.display_name(b._lcol) + " " + b._op_str + " '" + b._value + "'"
    };
    b.valid_columns = function (c) {
        if (c[0][d])return {valid: true};
        return {valid: false, errors: ["Invalid left hand side"]}
    };
    return b
};
dw.ccompare = function (d, a) {
    var b = dw.transform();
    dv.ivar(b, [{name: "lcol", initial: d}, {name: "rcol", initial: a}]);
    b.test = function (c, e) {
        return b.compare(c[d][e], c[a][e])
    };
    b.description = function () {
        return dw.display_name(b._lcol) + " " + b._op_str + " " + b._rcol
    };
    b.valid_columns = function (c) {
        if (c[0][d] && c[0][a])return {valid: true};
        return {valid: false, errors: ["Invalid comparison"]}
    };
    return b
};
dw.compare = function (d, a, b) {
    var c = b ? dw.vcompare(d, a) : dw.ccompare(d, a);
    c.default_transform = function () {
        return dw[c.name](d, a, b)
    };
    return c
};
dw.eq = function (d, a, b) {
    d = dw.compare(d, a, b);
    d._op_str = "=";
    d.compare = function (c, e) {
        return c === e
    };
    d.name = dw.row.EQUALS;
    return d
};
dw.starts_with = function (d, a, b) {
    d = dw.compare(d, a, b);
    d._op_str = "starts with";
    d.compare = function (c, e) {
        c = "" + c;
        e = "" + e;
        return c.indexOf(e) == 0
    };
    d.name = dw.row.STARTS_WITH;
    return d
};
dw.like = function (d, a) {
    d = dw.compare(d, a, true);
    d._op_str = "~";
    d.compare = function (b, c) {
        b = "" + b;
        c = "" + c;
        return b.match(c) != null
    };
    d.name = dw.row.LIKE;
    return d
};
dw.contains = function (d, a, b) {
    d = dw.compare(d, a, b);
    d._op_str = "contains";
    d.compare = function (c, e) {
        c = "" + c;
        e = "" + e;
        return c.indexOf(e) != -1
    };
    d.name = dw.row.CONTAINS;
    return d
};
dw.is_null = function (d, a) {
    var b = dw.compare(d, a, true);
    b._op_str = "is null";
    b.compare = function (c) {
        return dw.is_missing(c)
    };
    b.description = function () {
        return dw.display_name(b._lcol) + " " + b._op_str
    };
    b.name = dw.row.IS_NULL;
    return b
};
dw.matches_role = function (d) {
    var a = dw.transform();
    dv.ivar(a, [{name: "lcol", initial: d}]);
    a.test = function (b, c) {
        return !b[d].wrangler_role.parse(b[d][c])
    };
    a.description = function () {
        return dw.display_name(a._lcol) + " does not match role"
    };
    a.name = dw.row.MATCHES_ROLE;
    a.valid_columns = function (b) {
        if (b[0][d])return {valid: true};
        return {valid: false, errors: ["Invalid comparison"]}
    };
    return a
};
dw.matches_type = function (d, a) {
    var b = dw.transform();
    dv.ivar(b, [{name: "lcol", initial: d}, {name: "type", initial: a}]);
    b.test = function (c, e) {
        var f = b._type || c[d].wrangler_type;
        return !f || !f.parse(c[b._lcol][e])
    };
    b.description = function () {
        return dw.display_name(b._lcol) + " is not a " + a.name
    };
    b.valid_columns = function (c) {
        if (c[0][d])return {valid: true};
        return {valid: false, errors: ["Invalid comparison"]}
    };
    b.name = dw.row.MATCHES_TYPE;
    return b
};
dw.is_missing = function (d) {
    return d === undefined || d === ""
};
dw.empty = function () {
    var d = dw.transform();
    d.test = function (a, b) {
        for (var c, e = 0; e < a.cols(); ++e) {
            c = a[e][b];
            if (c != undefined && ("" + c).length)return 0
        }
        return 1
    };
    d.description = function (a) {
        a = a || {};
        return a.simple ? "empty rows" : " row is empty "
    };
    d.valid_columns = function () {
        return {valid: true}
    };
    d.name = dw.row.EMPTY;
    return d
};
dw.set_role = function (d, a) {
    var b = dw.transform(d);
    b._drop = true;
    dv.ivara(b, [{name: "roles", initial: a || []}]);
    b.transform = function () {
    };
    b.description = function () {
        return ["Merge", dw.column_clause(b, b._column), " with glue ", dw.input_clause(b, b._glue)]
    };
    b.apply = function (c) {
        c = b.getTable(c);
        b.columns(c).forEach(function (e, f) {
            e.wrangler_role = b._roles[f]
        });
        return {}
    };
    b.name = dw.transform.SET_ROLE;
    return b
};
dw.set_type = function (d, a) {
    var b = dw.transform(d);
    dv.ivara(b, [{name: "types", initial: a || []}]);
    b.transform = function () {
    };
    b.description = function () {
        return ["Merge", dw.column_clause(b, b._column), " with glue ", dw.input_clause(b, b._glue)]
    };
    b.apply = function (c) {
        c = b.getTable(c);
        b.columns(c).forEach(function (e, f) {
            e.wrangler_type = b._types[f]
        });
        return {}
    };
    b.name = dw.transform.SET_TYPE;
    return b
};
dw.set_name = function (d, a) {
    var b = dw.transform(d);
    b._drop = true;
    dv.ivara(b, [{name: "names", initial: a || []}]);
    dv.ivar(b, [{name: "header_row", initial: undefined}]);
    b.transform = function () {
    };
    b.well_defined = function () {
        return b._names.length || b._header_row != undefined
    };
    b.description = function () {
        if (b._header_row != undefined) {
            row = b._header_row;
            if (typeOf(row) === "number")row = dw.row(dw.rowIndex([b._header_row]));
            return ["Promote row", dw.key_clause(b, [b._header_row], "header_row"), " to header"]
        } else return ["Set ", dw.column_clause(b,
            b._column, "column", {extra_text: ""}), " name to ", dw.input_clause(b, "names")]
    };
    b.apply = function (c) {
        c = b.getTable(c);
        var e = b.columns(c);
        if (b._header_row != undefined) {
            var f = c.row(b._header_row);
            c.forEach(function (g, h) {
                h = f[h];
                if (h == undefined || h.length == 0)h = "undefined";
                g.setName(h);
                b._drop && g.splice(b._header_row, 1)
            });
            return {promoteRows: [-1, b._header_row]}
        } else e.forEach(function (g, h) {
            g.setName(a[h])
        });
        return {}
    };
    b.name = dw.transform.SET_NAME;
    return b
};
dw.role = function () {
    var d = dw.transform();
    d.parse = function () {
        return true
    };
    return d
};
dw.role.GEO = "geo";
dw.role.STATE = "state";
dw.geo = function () {
    var d = dw.role();
    d.name = dw.role.GEO;
    return d
};
dw.geo.states = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Marianas Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Virgin Islands", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
dw.state = function () {
    var d = dw.geo();
    d.parse = function (a) {
        return dw.geo.states.indexOf(a) != -1
    };
    d.name = dw.role.STATE;
    return d
};
dw.type = function () {
    var d = dw.transform();
    d.missing = function (a) {
        return a === undefined || a === "" || a === " "
    };
    return d
};
dw.number = function () {
    var d = dw.type();
    d.parse = function (a) {
        var b = Number(a);
        if (!(isNaN(b) || !b && (a + "").indexOf("0") === -1))return b
    };
    d.comparison = function () {
        return dw.merge_sort.numberCompare
    };
    d.name = dw.transform.NUMBER;
    return d
};
dw.string = function () {
    var d = dw.type();
    d.parse = function (a) {
        return a
    };
    d.name = dw.transform.STRING;
    d.comparison = function () {
        return dw.merge_sort.stringCompare
    };
    return d
};
dw.date = function () {
    var d = dw.type();
    d.parse = function (a) {
        var b = Date.parse(a);
        if (!isNaN(a))return b
    };
    d.comparison = function () {
        return dw.merge_sort.getDateComparison()
    };
    d.name = dw.transform.DATE;
    return d
};
dw.integer = function () {
    var d = dw.type();
    d.parse = function (a) {
        var b = Number(a);
        if (!(isNaN(b) || !b && (a + "").indexOf("0") === -1 || parseInt(b) != b))return b
    };
    d.comparison = function () {
        return dw.merge_sort.numberCompare
    };
    d.name = dw.transform.INT;
    return d
};
dw.summary = function (d) {
    var a;
    if (a = cache.get(undefined, d))return a;
    a = d.wrangler_type || dw.string();
    for (var b = [], c = [], e = [], f = {}, g = 0; g < d.table.rows(); ++g) {
        var h = d[g];
        if (a.missing(h))c.push(g); else a.parse(h) === undefined ? b.push(g) : e.push(g);
        f[h] = 1
    }
    a = {missing: c, bparse: b, brole: [], valid: e, unique: f};
    cache.set(undefined, d, a);
    return a
};
dw.summary.clear_cache = function () {
    cache.clear()
};
dw.summary.cache = function () {
    var d = [];
    d.set = function (a, b, c) {
        d[b.name] = c;
        return d
    };
    d.get = function (a, b) {
        return d[b.name]
    };
    d.clear = function () {
        d = []
    };
    return d
};
var cache = dw.summary.cache();
dw.LEFT = "left";
dw.UP = "up";
dw.DOWN = "down";
dw.RIGHT = "right";
dw.translate = function (d) {
    var a = dw.transform(d);
    dv.ivar(a, [{name: "direction", initial: dw.DOWN}, {name: "values", initial: 1}]);
    a.description_length = function () {
        if (a._row)return a._row.description_length();
        return 0
    };
    a.description = function () {
        return ["Translate", dw.column_clause(a, a._column), dw.select_clause(a, {
            select_options: {
                up: "up",
                down: "down"
            }, param: "direction"
        })]
    };
    a.apply = function (b) {
        var c = a.getTable(b);
        b = a.columns(c);
        c.rows();
        a._row || dw.row();
        var e = [];
        b.forEach(function (f) {
            var g = f.index();
            if (a._direction ===
                dw.DOWN)var h;
            switch (a._direction) {
                case dw.DOWN:
                    h = f.slice(0);
                    h.unshift(undefined);
                    break;
                case dw.UP:
                    h = f.slice(1);
                    break
            }
            h.name = "translate";
            h.type = f.type;
            h.wrangler_type = f.wrangler_type;
            h.wrangler_role = f.wrangler_role;
            c.addColumn(h.name, h, h.type, h.wrangler_type, h.wrangler_role, {index: g + 1});
            e.push(h)
        });
        return {newCols: e}
    };
    a.enums = function () {
        return ["direction"]
    };
    a.name = dw.transform.TRANSLATE;
    return a
};
dw.split = function (d) {
    var a = dw.textPattern(d);
    dv.ivar(a, [{name: "quote_character", initial: undefined}]);
    a._drop = true;
    a.transform = function (b) {
        if (a._positions && a._positions.length) {
            if (b[0] === undefined)return [];
            var c = "" + b[0];
            b = a._positions;
            var e = b[0], f = b[1] || b[0];
            b = [];
            b.push(c.substring(0, e));
            b.push(c.substring(f));
            b.stats = [{splits: [{start: e, end: f}]}]
        } else {
            if ((e = a._quote_character) != undefined)c = new RegExp(e + "[^" + e + "]*" + e);
            c = dw.regex.match(b[0], {
                which: a._which, max_splits: a._max, before: a._before, after: a._after,
                on: a._on, ignore_between: c || a._ignore_between
            });
            b = [];
            b.stats = [];
            for (e = 0; e < c.length; ++e)e % 2 == 0 ? b.push(c[e].value) : b.stats.push({
                splits: [{
                    start: c[e].start,
                    end: c[e].end
                }]
            })
        }
        return b
    };
    a.description = function () {
        var b = ["Split", dw.column_clause(a, a._column, "column", {editor_class: "none"})];
        if (Number(a._max) === 0)b = b.concat(dw.select_clause(a, {
            select_options: {"0": "repeatedly", "1": "once"},
            param: "max"
        }));
        regex = a.match_description();
        b = b.concat(regex);
        if (a._result === dw.ROW) {
            b = b.concat(" into ");
            b = b.concat(dw.select_clause(a,
                {select_options: {row: "rows"}, param: "result"}))
        }
        return b
    };
    a.name = dw.transform.SPLIT;
    return a
};
dw.textPattern = function (d) {
    var a = dw.map(d);
    dv.ivar(a, [{name: "on", initial: undefined}, {name: "before", initial: undefined}, {
        name: "after",
        initial: undefined
    }, {name: "ignore_between", initial: undefined}, {name: "which", initial: 1}, {name: "max", initial: 1}]);
    dv.ivara(a, [{name: "positions", initial: undefined}]);
    a.well_defined = function () {
        return (a._positions && !a._on && !a._before && !a._after || !a._positions && (a._on || a._before || a._after)) && !a._row
    };
    a.description_length = function () {
        if (a._positions)return 0;
        return dw.regex.description_length(a._on) +
        dw.regex.description_length(a._before) + dw.regex.description_length(a._after)
    };
    a.check_validity = function (b) {
        b = a.valid_columns(b);
        return b.valid ? a.well_defined() ? {valid: true} : {valid: false, errors: ["Must define split criteria"]} : b
    };
    a.match_description = function (b) {
        b = b || {};
        var c = [];
        if (a._positions)return ["between positions", dw.column_clause(a, a._positions, b)];
        if (a._on && a._on.toString() != "/.*/")c = c.concat(["on", dw.regex_clause(a, "on", b)]);
        if (a._before && !a._after)c = c.concat(["before", dw.regex_clause(a, "before",
            b)]);
        if (a._after && !a._before)c = c.concat(["after", dw.regex_clause(a, "after", b)]);
        if (a._after && a._before)c = c.concat(["between", dw.regex_clause(a, "after", b), "and", dw.regex_clause(a, "before", b)]);
        return c
    };
    return a
};
dw.edit = function (d) {
    var a = dw.textPattern(d);
    a._update = true;
    dv.ivar(a, [{name: "to", initial: undefined}, {name: "update_method", initial: undefined}]);
    a.transform = function (b) {
        var c;
        if (a._to != undefined)c = function () {
            return a._to
        }; else if (a._update_method)switch (a._update_method) {
            case dw.edit.upper:
                c = function (e) {
                    return e.toUpperCase()
                };
                break;
            case dw.edit.lower:
                c = function (e) {
                    if (e != undefined)return e.toLowerCase()
                };
                break;
            case dw.edit.capitalize:
                c = function (e) {
                    if (e != undefined)if (e.length >= 1)return e[0].toUpperCase() +
                    e.substr(1)
                };
                break;
            case dw.edit.uncapitalize:
                c = function (e) {
                    if (e != undefined)if (e.length >= 1)return e[0].toLowerCase() + e.substr(1)
                };
                break;
            default:
                throw"Illegal update update_method";
        }
        return b.map(function (e) {
            return e != undefined ? "" + e : undefined
        }).map(c)
    };
    a.description = function () {
        var b = ["Edit", dw.column_clause(a, a._column, "column", {editor_class: "none"})];
        regex = a.match_description();
        b = b.concat(regex);
        a._row && b.push(dw.row_clause(a, a._row, "row"));
        if (a._to != undefined) {
            b.push(" to '");
            b.push(dw.input_clause(a,
                "to"));
            b.push("'")
        } else a._update_method && b.push(dw.select_clause(a, {
            select_options: {
                LOWER: " to lowercase",
                CAPITALIZE: " capitalize",
                UNCAPITALIZE: " uncapitalize",
                UPPER: "to uppercase"
            }, param: "update_method"
        }));
        return b
    };
    a.well_defined = function () {
        return a._column.length === 1 && (a._to != undefined || a._update_method != undefined)
    };
    a.name = dw.transform.EDIT;
    return a
};
dw.edit.upper = "UPPER";
dw.edit.lower = "LOWER";
dw.edit.capitalize = "CAPITALIZE";
dw.edit.uncapitalize = "UNCAPITALIZE";
dw.INSERT_RIGHT = "right";
dw.INSERT_END = "end";
dw.ROW = "row";
dw.COLUMN = "column";
dw.clause = {column: "column", regex: "regex", input: "input", array: "array", select: "select"};
dw.status = {active: "active", inactive: "inactive", deleted: "deleted", invalid: "invalid"};
dw.transform = function (d) {
    var a = {};
    a.is_transform = true;
    dv.ivara(a, {name: "column", initial: d != undefined ? d : []});
    dv.ivar(a, [{name: "table", initial: 0}, {name: "status", initial: dw.status.active}, {
        name: "drop",
        initial: false
    }]);
    a.getTable = function (b) {
        return b[a.table()]
    };
    a.show_details = false;
    a.active = function () {
        return a._status === dw.status.active
    };
    a.inactive = function () {
        return a._status === dw.status.inactive
    };
    a.deleted = function () {
        return a._status === dw.status.deleted
    };
    a.invalid = function () {
        return a._status === dw.status.invalid
    };
    a.toggle = function () {
        a.active() ? a.status(dw.status.inactive) : a.status(dw.status.active)
    };
    a.delete_transform = function () {
        a._status = dw.status.deleted
    };
    a.errors = [];
    a.invalidate = function (b) {
        a._status = dw.status.invalid;
        a.errors = b
    };
    a.validate = function () {
        a._status = dw.status.active;
        a.errors = []
    };
    a.errorMessage = function () {
        return a.errors.join("\n")
    };
    a.columns = function (b) {
        if (a._column && a._column.length)return a._column.map(function (c) {
            return b[c]
        });
        return b.map(function (c) {
            return c
        })
    };
    a.has_parameter = function (b) {
        return a[b] !=
        undefined
    };
    a.well_defined = function () {
        return true
    };
    a.params = function () {
        return dv.keys(a).filter(function (b) {
            return b[0] === "_"
        })
    };
    a.enums = function () {
        return []
    };
    a.param_equals = function (b, c) {
        if (b === undefined || c === undefined)return b === c;
        ktype = typeOf(b);
        switch (ktype) {
            case "function":
                return b.toString() === c.toString();
            case "array":
                if (b.length != c.length)return false;
                for (var e = 0; e < b.length; ++e)if (!a.param_equals(b[e], c[e]))return false;
                return true;
            case "object":
                if (b.equals)return b.equals(c);
                return b.toString() ===
                c.toString();
            case "number":
            case "string":
            case "boolean":
                return b === c;
            default:
                return b === c
        }
    };
    a.similarity = function (b) {
        for (var c = a.name != b.name ? -1 : 0, e = a.params(), f = b.params(), g, h, k = 0, j = 0; j < e.length; ++j) {
            g = a[e[j]];
            h = b[f[j]];
            a.param_equals(g, h) && k++
        }
        return c + k / e.length
    };
    a.equals = function (b) {
        if (a.name != b.name)return false;
        for (var c = a.params(), e = b.params(), f, g, h = 0; h < c.length; ++h) {
            f = a[c[h]];
            g = b[e[h]];
            if (!a.param_equals(f, g))return false
        }
        return true
    };
    a.check_validity = function (b) {
        return a.valid_columns(b)
    };
    a.valid_columns = function (b) {
        b = a.getTable(b);
        if (a.columns(b).filter(function (c) {
                return c === undefined
            }).length)return {valid: false, errors: ["Invalid columns"]};
        return {valid: true}
    };
    a.clone_param = function (b) {
        switch (typeOf(b)) {
            case "function":
                return b;
            case "array":
                return b.map(function (c) {
                    return a.clone_param(c)
                });
            case "object":
                if (b.clone)return b.clone();
                return b;
            case "number":
            case "string":
            case "boolean":
                return b;
            default:
                return b
        }
    };
    a.default_transform = function () {
        return dw.transform.create(a.name)
    };
    a.clone =
        function () {
            for (var b = a.default_transform(), c = a.params(), e, f = 0; f < c.length; ++f) {
                e = a[c[f]];
                b[c[f]] = a.clone_param(e)
            }
            return b
        };
    a.description_length = function () {
        return 0
    };
    a.comment = function () {
        return a.description().map(function (b) {
            if (typeOf(b) === "string")return b;
            return b.description()
        }).join(" ")
    };
    a.sample_apply = function (b) {
        return a.apply(b, {max_rows: 1E3, warn: true})
    };
    return a
};
dw.transform.create = function (d) {
    return dw[d]()
};
dw.transform.tableUpdate = function (d, a, b) {
    var c = {}, e = d.result();
    if (e === dw.COLUMN) {
        c.finish = function () {
            d._drop && d.columns(a).forEach(function (i) {
                a.removeColumn(i.name)
            })
        };
        if (d.update()) {
            c.update = function (i, l) {
                for (var m = 0; m < l.length; ++m)b[m][i] = l[m]
            };
            c.stats = function () {
                return {updatedCols: b}
            }
        } else {
            var f = [], g;
            switch (d.insert_position()) {
                case dw.INSERT_RIGHT:
                    g = b[b.length - 1].index();
                    break;
                case dw.INSERT_END:
                    g = a.length;
                    break
            }
            c.update = function (i, l) {
                for (var m = 0; m < l.length; ++m) {
                    if (m === f.length) {
                        var q = [];
                        f.push(q);
                        a.addColumn(d.name, q, dv.type.nominal, dw.string(), dw.role(), {index: g + f.length})
                    }
                    f[m][i] = l[m]
                }
            };
            c.stats = function () {
                return {newCols: f}
            }
        }
    } else if (e === dw.ROW) {
        var h = 0, k = a.map(function (i) {
            var l = [];
            l.name = i.name;
            l.type = i.type;
            return l
        }), j = b[0].index();
        c.update = function (i, l) {
            for (var m = 0; m < l.length; ++m) {
                for (var q = 0; q < j; ++q)k[q][h] = a[q][i];
                for (q = j + 1; q < k.length; ++q)k[q][h] = a[q][i];
                k[j][h] = l[m];
                ++h
            }
            return k[0].length
        };
        c.finish = function () {
            for (; a.cols();)a.removeColumn(0);
            k.forEach(function (i) {
                a.addColumn(i.name,
                    i, i.type)
            })
        };
        c.stats = function () {
            return {}
        }
    }
    return c
};
dw.transform.SPLIT = "split";
dw.transform.EXTRACT = "extract";
dw.transform.CUT = "cut";
dw.transform.MERGE = "merge";
dw.transform.FOLD = "fold";
dw.transform.UNFOLD = "unfold";
dw.transform.FILL = "fill";
dw.transform.FILTER = "filter";
dw.transform.DROP = "drop";
dw.transform.ROW = "row";
dw.transform.COPY = "copy";
dw.transform.LOOKUP = "lookup";
dw.transform.TRANSLATE = "translate";
dw.transform.EDIT = "edit";
dw.transform.SORT = "sort";
dw.transform.TRANSPOSE = "transpose";
dw.transform.STRING = "string";
dw.transform.INT = "int";
dw.transform.NUMBER = "number";
dw.transform.DATE = "date";
dw.transform.SET_TYPE = "set_type";
dw.transform.SET_ROLE = "set_role";
dw.transform.SET_NAME = "set_name";
dw.unfold = function (d) {
    var a = dw.transform(d);
    dv.ivar(a, [{name: "measure", initial: undefined}]);
    a.description = function () {
        return ["Unfold", dw.column_clause(a, a._column, "column", {
            editor_class: "unfold",
            single: true
        }), " on ", dw.column_clause(a, [a._measure], "measure", {single: true})]
    };
    a.apply = function (b, c) {
        c = c || {};
        var e = a.getTable(b);
        b = a.columns(e);
        var f = b.map(function (t) {
                return t.name
            }), g = e.map(function (t) {
                return t.name
            }).filter(function (t) {
                return f.indexOf(t) === -1 && a._measure != t
            }), h = e.rows(), k, j = [e[a._measure]],
            i = c.max_rows || 1E3, l = c.start_row || 0, m = c.end_row || h;
        m = Math.min(h, m);
        c = e.slice(l, m, {compress: true, compressAll: true}).query({
            dims: f.concat(g),
            vals: [dv.first(a._measure)],
            warn: c.warn
        });
        h = c[0].unique;
        var q = f.length, s = c.length - 1, o = g.length, r = [];
        dv.range(0, h + g.length).forEach(function () {
            r.push([])
        });
        k = c[0].length;
        if (i && i < k)k = i;
        for (l = l; l < m; ++l) {
            i = Math.floor(l / h);
            for (k = 0; k < g.length; ++k)r[k][i] = c[q + k][l];
            k = r[o + l % h];
            k.name = c[0][l];
            k[i] = c[s][l]
        }
        m = e.cols();
        for (c = 0; c < m; ++c)e.removeColumn(0);
        var u, n = [];
        r.forEach(function (t,
                            v) {
            u = v < o ? g[v] : t.name;
            e.addColumn(u, t, dv.type.nominal);
            v >= o && n.push(t.name)
        });
        return {
            toKeyRows: [-1], toHeaderCols: b, toValueCols: j, valueCols: n.map(function (t) {
                return e[t]
            }).filter(function (t) {
                return t != undefined
            })
        }
    };
    a.description_length = function () {
        if (a._measure === "State")return 1;
        return 0
    };
    a.well_defined = function (b) {
        if (a._column && a._column.length === 1 && a._measure && a._measure != a._column[0] && (!b || b.length >= 3))return true;
        return false
    };
    a.check_validity = function (b) {
        var c = a.valid_columns(b);
        return c.valid ?
            a.getTable(b)[a._measure] ? {valid: true} : {valid: false, errors: ["Invalid Measure"]} : c
    };
    a.name = dw.transform.UNFOLD;
    return a
};
dw.transpose = function (d) {
    var a = dw.transform(d);
    dv.ivara(a, []);
    a.description_length = function () {
        return 0
    };
    a.description = function () {
        return ["Transpose table"]
    };
    a.apply = function (b, c) {
        c = c || {};
        var e = a.getTable(b);
        a.columns(e);
        e.rows();
        a._row || dw.row();
        b = dv.range(0, e.rows()).map(function () {
            var h = [];
            h.name = "transpose";
            h.type = dv.type.nominal;
            return h
        });
        for (c = 0; c < e.cols(); ++c)for (var f = e[c], g = 0; g < e.rows(); ++g)b[g][c] = f[g];
        for (; e.cols();)e.removeColumn(0);
        b.forEach(function (h) {
            e.addColumn(h.name, h, h.type, dw.string(),
                undefined, {})
        });
        return {}
    };
    a.name = dw.transform.TRANSPOSE;
    return a
};
dw.sort = function (d) {
    var a = dw.transform(d);
    dv.ivara(a, [{name: "direction", initial: []}, {name: "as_type", initial: []}]);
    a.description_length = function () {
        return 0
    };
    a.description = function () {
        var b = ["Sort by ", dw.column_clause(a, a._column, "column")];
        a._direction && a._direction.length && a._direction[0] === "desc" && b.push(a._direction[0]);
        return b
    };
    a.apply = function (b, c) {
        c = c || {};
        b = a.getTable(b);
        var e = a.columns(b);
        b.rows();
        c = a._row || dw.row();
        var f = e.map(function (m) {
            m = a._as_type[0] || m.wrangler_type;
            if (!m)return dw.stringCompare;
            return m.comparison()
        }), g = [];
        for (c = 0; c < e.length; ++c)a._direction[c] === "desc" ? g.push(-1) : g.push(1);
        for (var h = dw.merge_sort(dv.range(0, b.rows()), function (m, q) {
            for (var s = 0; s < f.length; ++s) {
                var o = e[s];
                o = f[s](o[m], o[q]);
                if (o != 0)return g[s] * o
            }
            if (m < q)return -1;
            if (m == q)return 0;
            return 1
        }), k = b.slice(), j = 0; j < b.length; ++j) {
            var i = b[j], l = k[j];
            for (c = 0; c < b.rows(); ++c)i[c] = l[h[c]]
        }
        return {updatedCols: e}
    };
    a.name = dw.transform.SORT;
    return a
};
dw.wrangler_export = function (d, a) {
    a = a || {};
    switch (a.format || "csv") {
        case "csv":
            return dw.wrangler_export.csv(d);
        case "tsv":
            return dw.wrangler_export.tsv(d);
        case "rowjson":
            return dw.wrangler_export.rowjson(d);
        case "columnjson":
            return dw.wrangler_export.coljson(d);
        case "python":
            return dw.wrangler_export.python(a.wrangler);
        case "javascript":
            return dw.wrangler_export.javascript(a.wrangler)
    }
};
dw.wrangler_export.csv = function (d) {
    var a = "";
    a += d.names().map(dw.display_name).join(",") + "\n";
    for (var b = 0; b < d.rows(); ++b)a += d.row(b).join(",") + "\n";
    return a
};
dw.wrangler_export.tsv = function (d) {
    var a = "";
    a += d.names().map(dw.display_name).join("\t") + "\n";
    for (var b = 0; b < d.rows(); ++b)a += d.row(b).join("\t") + "\n";
    return a
};
dw.wrangler_export.coljson = function (d) {
    var a = "[";
    a += d.map(function (b) {
        return '{name: "' + dw.display_name(b.name) + '", values: [' + b.map(function (c) {
            if (Number(c) != c)c = "'" + c + "'";
            return c
        }).join(",") + "]}\n"
    }).join(",");
    a += "]";
    return a
};
dw.wrangler_export.rowjson = function (d) {
    for (var a = "[", b, c = 0; c < d.rows(); ++c) {
        if (c)a += ",\n";
        a += "{" + d.map(function (e) {
            b = e[c];
            if (b === undefined)b = "";
            if (Number(b) != b)b = "'" + b + "'";
            return dw.display_name(e.name) + ": " + b
        }).join(",") + "}"
    }
    a += "]";
    return a
};
dw.wrangler_export.javascript = function (d) {
    var a = function (c) {
        if (c === true)return "true";
        if (c === false)return "false";
        if (c === undefined)return "undefined";
        if (typeOf(c) === "object" || typeOf(c) === "function") {
            if (c.is_transform)return b(c);
            return JSON.stringify(c.toString().replace(/^\/|\/$/g, ""))
        }
        if (typeOf(c) === "array")return "[" + c.map(a) + "]";
        return JSON.stringify(c)
    }, b = function (c) {
        var e = "dw." + c.name + "()", f = c.params().map(function (g) {
            return "." + g.substr(1) + "(" + a(c[g]) + ")\n"
        }).join("\t");
        return e + f
    };
    return "w = dw.wrangle()\n" +
    d.filter(function (c) {
        return c.active()
    }).map(function (c) {
        return "w.add(" + b(c) + ")"
    }).join("\n") + "\n\nw.apply([t])\n\n\n"
};
dw.wrangler_export.python = function (d) {
    var a = function (c) {
        if (c === true)return "True";
        if (c === false)return "False";
        if (c === undefined)return "None";
        if (typeOf(c) === "object" || typeOf(c) === "function") {
            if (c.is_transform)return b(c);
            return dw.JSON.stringify(c.toString().replace(/^\/|\/$/g, ""))
        }
        if (typeOf(c) === "array")return "[" + c.map(a) + "]";
        return dw.JSON.stringify(c)
    }, b = function (c) {
        var e = c.name.split("_").map(function (g) {
            return g.charAt(0).toUpperCase() + g.slice(1)
        }).join(""), f = "dw." + e + "(";
        e = c.params().map(function (g) {
            return g.substr(1) +
            "=" + a(c[g])
        }).join(",\n" + dv.range(0, 10 + e.length).map(function () {
            return " "
        }).join(""));
        return f + e + ")"
    };
    return "from wrangler import dw\nimport sys\n\nif(len(sys.argv) < 3):\n\tsys.exit('Error: Please include an input and output file.  Example python script.py input.csv output.csv')\n\nw = dw.DataWrangler()\n" + d.filter(function (c) {
        return c.active()
    }).map(function (c) {
        return "\n# " + c.comment() + "\nw.add(" + b(c) + ")"
    }).join("\n") + "\n\nw.apply_to_file(sys.argv[1]).print_csv(sys.argv[2])\n\n"
};
dw.wrangler = function (d) {
    function a(p) {
        dw.log(p);
        var x = C.add(p);
        p.rows = x.rows();
        p.cols = x.cols();
        F = I.table(n).input(p).run(13);
        E = F[0];
        i();
        if (p.type === dw.engine.promote)z.working(); else p.type === dw.engine.param ? z.working() : z.first_suggestion()
    }

    function b() {
        dw.infer_type_transforms(n).forEach(function (p) {
            p.sample_apply([n])
        })
    }

    function c() {
        E = z.transform();
        j()
    }

    function e() {
        if (!L) {
            L = true;
            alert("Wrangler only supports up to 40 columns and 1000 rows.  We will preview only the first 40 columns and 1000 rows of data.")
        }
    }

    function f(p) {
        s(p.transform);
        dw.log({type: "highlight_suggestion", suggestion: p.transform})
    }

    function g(p) {
        p.sample_apply([n]);
        dw.summary.clear_cache();
        b();
        A.add(p);
        C.clear();
        a({type: dw.engine.execute, transform: p});
        q();
        jQuery("#scriptTransformContainer").scrollTop(1E5)
    }

    function h() {
        C.clear();
        a({type: dw.engine.clear})
    }

    function k(p) {
        C.clear();
        a({type: dw.engine.promote, transform: p})
    }

    function j() {
        s(E)
    }

    function i() {
        G.empty();
        dw.tmenu(G, {interaction: a, onclear: h}).draw();
        z = dw.editor(G, F, {
            onpromote: k, onhighlight: f,
            onselect: g, onedit: a, table: n
        }).draw()
    }

    function l() {
        var p = dw.jq("select").addClass("exportOptions"), x = jQuery('<form>\t\t<input type="radio" name="exportType" value="data" checked="checked"/> Data<br />\t\t<input type="radio" name="exportType" value="script" /> Script\t\t</form>');
        x.find(":radio").height(15).width(15).click(function () {
            p.empty();
            N()
        });
        var N = function () {
            if (x.find(":radio:checked").val() == "data") {
                y("csv", "Comma-Separated Values (CSV)");
                y("tsv", "Tab-Separated Values (TSV)");
                y("rowjson", "Row-Oriented JSON (One object per row)");
                y("columnjson", "Column-Oriented JSON (One array per column)");
                w.attr("value", dw.wrangler_export(n, {}));
                w.focus();
                w.select();
                dw.log({type: "export", params: {type: "csv"}})
            } else {
                y("python", "Python");
                y("javascript", "JavaScript");
                w.attr("value", dw.wrangler_export(n, {format: "python", wrangler: A}));
                w.focus();
                w.select();
                dw.log({type: "export", params: {type: "python"}});
                D.empty();
                D.append(dw.jq("a").attr("href", "help.html#export_script").attr("target", "_blank").append("Download the python runtime"))
            }
        }, y = function (O,
                         P) {
            dw.add_select_option(p, P, O)
        };
        p.change(function () {
            w.attr("value", dw.wrangler_export(n, {format: p.val(), wrangler: A}));
            jQuery(".exportHeader").removeClass("selectedExportHeader");
            jQuery(this).addClass("selectedExportHeader");
            w.focus();
            w.select();
            dw.log({type: "export", params: {type: p.val()}});
            D.empty();
            p.val() === "python" && D.append(dw.jq("a").attr("href", "help.html#export_script").attr("target", "_blank").append("Download the python runtime"));
            p.val() === "javascript" && D.append(dw.jq("a").attr("href", "help.html#export_script").attr("target",
                "_blank").append("Download the javascript runtime"))
        });
        jQuery("#table").hide();
        var B = dw.jq("div").attr("id", "uploadContainer");
        B.append(x);
        B.append(p);
        var D = dw.jq("span").attr("id", "scriptInstructions");
        B.append(D);
        jQuery("#profilerCenterPanel").prepend(B);
        y("csv", "Comma-Separated Values (CSV)");
        y("tsv", "Tab-Separated Values (TSV)");
        y("rowjson", "Row-Oriented JSON (One object per row)");
        y("columnjson", "Column-Oriented JSON (One array per column)");
        B.append(dw.jq("button").attr("id", "wranglerInputSubmit").append("Back to Wrangling").click(function () {
            B.remove();
            jQuery("#table").show()
        }));
        var w = dw.jq("textArea").attr("id", "wranglerInput");
        B.append(w);
        w.attr("value", dw.wrangler_export(n, {}));
        jQuery(".exportHeader:first").addClass("selectedExportHeader");
        w.focus();
        w.select();
        h();
        dw.log({type: "export", params: {type: "csv"}})
    }

    function m(p) {
        v = t.slice();
        dw.progress_call(A.apply, A, [v]);
        dw.log({type: "edit_script", params: p});
        n = v;
        h();
        H.draw()
    }

    function q() {
        var p = jQuery("#scriptTransformContainer").scrollTop();
        J.empty();
        Q = dw.script(J, A, {
            edit: function (x) {
                m(x)
            }, onexport: l,
            onedit: m, table: n
        }).draw();
        jQuery("#scriptTransformContainer").scrollTop(p)
    }

    function s(p) {
        dw.preview(K, n, p, M, C)
    }

    var o = d.tableContainer, r = d.previewContainer, u = d.transformContainer, n = d.table, t = n.slice(), v, K, M, E, I, F, z, H = {}, Q, A = dw.wrangle(), C, J = jQuery(document.createElement("div")).attr("id", "scriptContainer"), G = jQuery(document.createElement("div")).attr("id", "editorContainer");
    if (d.initial_transforms) {
        d.initial_transforms.forEach(function (p) {
            A.add(p)
        });
        A.apply([n])
    }
    u.append(J).append(G);
    I = dw.engine().table(n);
    var L = false;
    K = dw.vtable(o, {interaction: a, ontablechange: c, onexecute: g, onconfirm: e, wrangler: A});
    M = dw.vtable(r, {
        interaction: function () {
        }
    });
    C = dw.table_selection(K);
    H.draw = function () {
        F = I.table(n).run();
        j();
        i();
        q()
    };
    jQuery(document).bind("keydown", function (p) {
        var x = p && p.srcElement && p.srcElement.type;
        if (x != "text")switch (p.which) {
            case 8:
                break;
            case 9:
                z.promote();
                x != "textarea" && p.preventDefault();
                break;
            case 38:
                z.prev();
                p.preventDefault();
                break;
            case 40:
                z.next();
                p.preventDefault();
                break;
            case 13:
                E = z.transform();
                g(E);
                x != "textarea" && p.preventDefault();
                break;
            case 27:
                h();
                break
        }
    });
    b();
    H.draw();
    l();
    return H
};
