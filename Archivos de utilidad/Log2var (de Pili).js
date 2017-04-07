/**
 * Created by pilibastidas on 27/03/2017.
 */


var lineReader = require("line-reader");
var fs = require("fs");
var myLog = "./data/exampleLog.bin.log";
var myLog_2017_02_21_17_24_06 = {};



function parseFMT(logVar, arraydeLinea){

    try{
        logVar.FMT.push({});
    }
    catch(err){
        logVar.FMT = [];
        logVar.FMT.push({});
    }
    var columns = ["Type","Length","Name","Format","Columns"];
    for (var i = 1 ; i < arraydeLinea.length ; i++) {
        if(i < 5){
            logVar.FMT[logVar.FMT.length-1][columns[i-1]] = arraydeLinea[i];
        }
        else if(i == 5){
            logVar.FMT[logVar.FMT.length-1][columns[i-1]] = [];
            var mycols = arraydeLinea[i].split(",");
            for(var j = 0; j < mycols.length; j++){
                logVar.FMT[logVar.FMT.length-1][columns[i-1]].push(mycols[j]);
            }
        }
    }

}


function parseMSG(logVar, arraydeLinea){

    // Check if object exists and create one if it doesnt

    try{
        logVar[arraydeLinea[0]].push({});
    }
    catch(err){
        logVar[arraydeLinea[0]] = [];
        logVar[arraydeLinea[0]].push({});
    }


    // Search for the FMT value to get columns
    // TODO try to make this bisection search after a merge-sort of the FMT array by name to make the search faster
    for(var i = 0; i<logVar.FMT.length; i++){
        if(logVar.FMT[i].Name == arraydeLinea[0]){
            var columns = logVar.FMT[i].Columns;
            break;
        }
    }
    // Parse the columns
    for (var i = 1 ; i < arraydeLinea.length ; i++) {
        if(isNaN(Number(arraydeLinea[i]))){
            logVar[arraydeLinea[0]][logVar[arraydeLinea[0]].length-1][columns[i-1]] = arraydeLinea[i];
        }
        else{
            logVar[arraydeLinea[0]][logVar[arraydeLinea[0]].length-1][columns[i-1]] = Number(arraydeLinea[i]);
        }

    }

}


lineReader.eachLine(myLog, function(line,last) {

    var lineArr = line.split(", ");

    if(lineArr[0] == "FMT"){
        parseFMT(myLog_2017_02_21_17_24_06,lineArr);
    }
    else{
        console.log("Fin FMT");
        return false;
    }

});


lineReader.eachLine(myLog, function(line,last){

    var lineArr = line.split(", ");

    if(lineArr[0] != "FMT"){
        parseMSG(myLog_2017_02_21_17_24_06,lineArr);
    }
    if(last){
        console.log("FINAL");
    }
});

