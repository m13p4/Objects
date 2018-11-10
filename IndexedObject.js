/**
 * IndexedObject
 * 
 * @version 1.0.0
 *
 * @author m13p4
 * @copyright Meliantchenkov Pavel
 */
var IndexedObject = function(init)
{
    var obj = {}, index = [], map = {}, indexObj;
    
    function _get(key)
    {
        if("undefined" === typeof key) return obj;
        if("undefined" !== typeof map[key]) return obj[key];
    }
    function _set(key, val)
    {
        if("undefined" === typeof map[key]) 
        {
            obj[key] = val;
            map[key] = index.length;
            indexObj.length = index.push(key);
        }
        else obj[key] = val;
    }
    function _delete(key)
    {
        if(map[key])
        {
            delete index[map[key]];
            delete obj[key];
            delete map[key];
        }
    }
    function _for(callback)
    {
        if("function" === typeof callback)
            for(var i = 0; i < index.length; i++) 
                if("undefined" !== typeof index[i])
                    callback(index[i], obj[index[i]]);
    }
    function _byIndex(indexKey)
    {
        if("undefined" !== typeof index[indexKey])
            return obj[index[indexKey]];
    }
    
    indexObj = {
        get:     _get,
        set:     _set,
        delete:  _delete,
        for:     _for,
        byIndex: _byIndex,
        length:  0
    };
    
    if(init) for(var i in init) _set(i, init[i]);
    
    return indexObj;
};

module.exports = IndexedObject;
