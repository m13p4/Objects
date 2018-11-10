/**
 * LinkedObject
 * 
 * @version 1.0.0
 *
 * @author m13p4
 * @copyright Meliantchenkov Pavel
 */
function LinkedObject()
{
    var obj = {}, linkedObject, first = {p: false, n: false}, last = first, c;
    
    function _set(key, value)
    {
        var toSet = obj[key];
        if("undefined" === typeof obj[key])
        {
            _push(key, value);
        }
        else toSet[2] = value;
    }
    function _push(key, value)
    {
        var toPush = {
            p: last,  //prev
            n: false, //next
            v: value, //value
            k: key    //key
        };

        last.n = toPush;

        last = toPush;
        obj[key] = toPush;
    }
    function _get(key)
    {
        var toGet = obj[key];
        if("undefined" !== typeof toGet)
            return toGet.v;
    }
    function _current()
    {
        return c.v;
    }
    function _start()
    {
        c = first;
    }
    function _end()
    {
        c = {p: last, n: false};
    }
    function _next()
    {
        c = c.n;
        return c !== false;
    }
    function _prev()
    {
        c = c.p;
        return c !== false && c !== first;
    }
    
    function _for(callback)
    {
        if("function" === typeof callback)
        {
            var current = first.n;
            while(current)
            {
                callback(current.k, current.v);
                current = current.n;
            }
        }
    }
    
    linkedObject = {
        set:     _set,
        push:    _push,
        get:     _get,
        start:   _start,
        end:     _end,
        next:    _next,
        prev:    _prev,
        current: _current,
        for:     _for
    };
    
    return linkedObject;
}

if("undefined" !== typeof module) module.exports = LinkedObject;
