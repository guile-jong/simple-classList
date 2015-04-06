/*jshint browser: true
 */
(function (exports) {
    "use strict";

    var DOMClassList = exports.DOMClassList = (function () {
        if ('classList' in document.documentElement) {
            return {
                has: function (el, cname) {
                    assertElement(el, cname, 'has');
                    return el.classList.contains(cname);
                },
                add: function (el, cname) {
                    assertElement(el, cname, 'add');
                    el.classList.add(cname);
                },
                remove: function (el, cname) {
                    assertElement(el, cname, 'remove');
                    el.classList.remove(cname);
                },
                toggle: function (el, cname) {
                    assertElement(el, cname, 'toggle');
                    el.classList.toggle(cname);
                }
            };
        } else {
            return {
                has: function (el, cname) {
                    assertElement(el, cname, 'has');
                    return el.className && ((" " + el.className + " ").lastIndexOf(" " + cname + " ") > -1);
                },
                add: function (el, cname) {
                    assertElement(el, cname, 'add');
                    if (!el.className) {
                        el.className = cname;
                    } else if (!DOMClassList.has(el, cname)) {
                        el.className += " " + cname;
                    }
                },
                remove: function (el, cname) {
                    assertElement(el, cname, 'remove');
                    if (el.className) {
                        el.className = (" " + el.className + " ").replace(" " + cname + " ", " ").replace(/^\s+|\s+$/g, '');
                    }
                },
                toggle: function (el, cname) {
                    assertElement(el, cname, 'toggle');
                    if (el.className && DOMClassList.has(el, cname)) {
                        DOMClassList.remove(el, cname);
                    } else {
                        DOMClassList.add(el, cname);
                    }
                }
            };
        }
    })();

    function assertElement(el, cname, method) {
        if (!el) {
            throw new Error('el is not valid, el : ' + el + ', method : ' + method + ', className : ' + cname);
        }
    }

})(window);