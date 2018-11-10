/**
 * test IndexedObject & LinkedObject
 * 
 * @author m13p4
 * @copyright Meliantchenkov Pavel
 */
function getNanoSec()
{
    var s = process.hrtime();
    return s[0]+(s[1]/1e9);
}
function printRow(row)
{
    console.log(row);
}
function fill(str, fillChar, len, andersrum)
{
    var fillStr = (new Array(Math.floor(len)+1)).join(fillChar);
    if(andersrum)
        return (str+fillStr).slice(0, len);
    return (fillStr+str).slice(-len);
}
function round(val)
{
    return fill(Math.round(val * 1e15) / 1e15, "0", 15, true);
}
function printResultTable(res)
{
    var row, i, cellLen = 23, sum = {}, len, cells = [], c;
    
    for(i in res)
    {
        len = res[i].length;
        cells.push(i);
    }
    
    row = "|";
    for(c = 0; c < cells.length; c++)
        row += fill("","‾",(c === 0 ? cellLen/2 : cellLen)+1)+"|";
    printRow(row);
    
    row = "|";
    for(c = 0; c < cells.length; c++)
        row += fill(cells[c]," ",c === 0 ? cellLen/2 : cellLen)+" |";
    printRow(row);
        
    for(i = 0; i < len; i++)
    {
        row = "|";
        for(c = 0; c < cells.length; c++)
            row += fill("","-",(c === 0 ? cellLen/2 : cellLen)+1)+"|";
        printRow(row);
        
        row = "|";
        for(c = 0; c < cells.length; c++)
            row += fill(c === 0 ? res[cells[c]][i][0] : "write: " + round(res[cells[c]][i][0])," ",c === 0 ? cellLen/2 : cellLen)+" |";
        printRow(row);
        
        row = "|";
        for(c = 0; c < cells.length; c++)
            row += fill(c === 0 ? res[cells[c]][i][1] : "read: " + round(res[cells[c]][i][1])," ",c === 0 ? cellLen/2 : cellLen)+" |";
        printRow(row);
    }
    
    row = "|";
    for(c = 0; c < cells.length; c++)
        row += fill("","_",(c === 0 ? cellLen/2 : cellLen)+1)+"|";
    printRow(row);
}

var Objects = require('./Objects.js'),
    t = 0, 
    toTest = [
         Math.floor(Math.random() * (1e2 - 1e1)) + 1e1
        ,Math.floor(Math.random() * (1e3 - 1e2)) + 1e2
        ,Math.floor(Math.random() * (1e4 - 1e3)) + 1e3
        ,Math.floor(Math.random() * (1e5 - 1e4)) + 1e4
        ,Math.floor(Math.random() * (1e6 - 1e5)) + 1e5
        ,Math.floor(Math.random() * (1e7 - 1e6)) + 1e6
//        ,Math.floor(Math.random() * (1e8 - 1e7) + 1e7) // <= memory err
    ], 
    results = {
        "Elements": [],
        "Array": [],
        "Object": [],
        "IndexedObject ForLoop":  [],
        "IndexedObject CallBack": [],
        "LinkedObject While": [],
        "LinkedObject CallBack": []
    };
    
for(; t < toTest.length; t++)
{
    var 
    obj = {},
    arr = [],
    
    indexObj = Objects.IndexedObject(),
    linkObj = Objects.LinkedObject(),
    
    toCreate = toTest[t],
    startTime, 
    runTime,
    SUM_check = 0, SUM = 0, i, c;

    results["Elements"][t] = ["",toTest[t]]; 
    results["Array"][t] = []; 
    results["Object"][t] = []; 
    results["IndexedObject CallBack"][t] = []; 
    results["IndexedObject ForLoop"][t] = []; 
    results["LinkedObject While"][t] = [];
    results["LinkedObject CallBack"][t] = [];
    
    console.log("test "+toCreate+" elements");


    //Write Array
    startTime = getNanoSec();
    for(var i = 0; i < toCreate; i++) arr.push(i+1);
    runTime = getNanoSec()-startTime;
    results["Array"][t][0] = runTime;

    //Write Object
    startTime = getNanoSec();
    for(var i = 0; i < toCreate; i++) obj[i] = i+1;
    runTime = getNanoSec()-startTime;
    results["Object"][t][0] = runTime;

    //Write IndexedObject
    startTime = getNanoSec();
    for(var i = 0; i < toCreate; i++) indexObj.set(i, i+1);
    runTime = getNanoSec()-startTime;
    results["IndexedObject CallBack"][t][0] = runTime;
    results["IndexedObject ForLoop"][t][0] = runTime;
    
    //Write LinkedObject
    startTime = getNanoSec();
    for(var i = 0; i < toCreate; i++) linkObj.push(i, i+1);
    runTime = getNanoSec()-startTime;
    results["LinkedObject While"][t][0] = runTime;
    results["LinkedObject CallBack"][t][0] = runTime;
    
    //////////////////////////////////////////////////////////////

    //Read Array
    SUM = 0;
    startTime = getNanoSec();
    for(i = 0; i < arr.length; i++) SUM += arr[i];
    runTime = getNanoSec()-startTime;
    results["Array"][t][1] = runTime;
    SUM_check = SUM;
    

    //Read Object
    SUM = 0;
    startTime = getNanoSec();
    for(i in obj) SUM += obj[i];
    runTime = getNanoSec()-startTime;
    results["Object"][t][1] = SUM === SUM_check ? runTime : 0;


    //Read IndexedObject (callback)
    SUM = 0;
    startTime = getNanoSec();
    indexObj.for((key, val) => { SUM += val; });
    runTime = getNanoSec()-startTime;
    results["IndexedObject CallBack"][t][1] = SUM === SUM_check ? runTime : 0;


    //Read IndexedObject (for-loop)
    SUM = 0;
    startTime = getNanoSec();
    for(i = 0; i < indexObj.length; i++) SUM += indexObj.byIndex(i);
    runTime = getNanoSec()-startTime;
    results["IndexedObject ForLoop"][t][1] = SUM === SUM_check ? runTime : 0;


    //Read LinkedObject (while)
    var key;
    SUM = 0;
    startTime = getNanoSec();
    linkObj.start();
    while(false !== (key = linkObj.next())) SUM += linkObj.current();
    runTime = getNanoSec()-startTime;
    results["LinkedObject While"][t][1] = SUM === SUM_check ? runTime : 0;
    
    
    //Read LinkedObject (callback)
    SUM = 0;
    startTime = getNanoSec();
    linkObj.for((key,val)=>{ SUM += val; });
    runTime = getNanoSec()-startTime;
    results["LinkedObject CallBack"][t][1] = SUM === SUM_check ? runTime : 0;
}

printResultTable(results);
