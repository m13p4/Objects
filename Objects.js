/**
 * Objects - collection of Objects
 * 
 * @version 1.0.0
 *
 * @author m13p4
 * @copyright Meliantchenkov Pavel
 */
var Objects = {
    LinkedObject: require("./LinkedObject.js"),
    IndexedObject: require("./IndexedObject.js")
};

if("undefined" !== typeof module) module.exports = Objects;
