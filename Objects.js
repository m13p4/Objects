/**
 * Objects - collection of Objects
 * 
 * @version 1.0.0
 *
 * @author m13p4
 * @copyright Meliantchenkov Pavel
 */
var Objects = {};
if("undefined" !== typeof module)
{
    var IndexedObject = require("./IndexedObject.js"),
        LinkedObject  = require("./LinkedObject.js");

    module.exports = Objects;
}

if("function" === typeof IndexedObject) Objects.IndexedObject = IndexedObject;
if("function" === typeof LinkedObject)  Objects.LinkedObject = LinkedObject;
