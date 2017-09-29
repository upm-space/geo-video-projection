/**
 * Created by pilibastidas on 27/03/2017.
 */



var myLogPath = "../data/2017-09-21 19-33-33.log";
var lineReader = require("line-reader");
var fs = require("fs");



function log2Var(locLog,callback) {

    var myLogVar = {};

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

    function parseMSG(logVar, arraydeLinea) {

        // Check if object exists and create one if it doesnt

        try {
            logVar[arraydeLinea[0]].push({});
        }
        catch (err) {
            logVar[arraydeLinea[0]] = [];
            logVar[arraydeLinea[0]].push({});
        }

        // Search for the FMT value to get columns
        //TODO try to make this bisection search after a merge-sort of the FMT array by name to make the search faster
        for (var i = 0; i < logVar.FMT.length; i++) {
            if (logVar.FMT[i].Name == arraydeLinea[0]) {
                var columns = logVar.FMT[i].Columns;
                break;
            }
        }
        // Parse the columns
        for (var i = 1; i < arraydeLinea.length; i++) {
            if (isNaN(Number(arraydeLinea[i]))) {
                logVar[arraydeLinea[0]][logVar[arraydeLinea[0]].length - 1][columns[i - 1]] = arraydeLinea[i];
            }
            else {
                logVar[arraydeLinea[0]][logVar[arraydeLinea[0]].length - 1][columns[i - 1]] = Number(arraydeLinea[i]);
            }

        }

    }

    lineReader.eachLine(locLog, function (line, last) {

        var lineArr = line.split(", ");

        if (lineArr[0] == "FMT") {
            parseFMT(myLogVar, lineArr);
        }
        else {
            console.log("Fin FMT");
            return false;
        }

    });

    lineReader.eachLine(locLog, function (line, last) {

        var lineArr = line.split(", ");

        if (lineArr[0] !== "FMT") {
            parseMSG(myLogVar, lineArr);
        }
        if (last) {
            console.log("FINAL");
            callback(myLogVar);
        }
    });

}

// Esta funcion la uso para formatear strings como en java
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function printObj2JSON(myLogVar){
    var result = '{\n';
    var separ1 = "";
    for (var key1 in myLogVar){
        if (key1 == "FMT"){
            continue;
        }
        result +=  separ1 + '\t"' + key1 + '" : [\n';
        var separ2 = "";
        for (var j = 0; j < myLogVar[key1].length; j++){
            result += separ2 + '\t\t{\n';
            var separ3= "";
            for (var key2 in myLogVar[key1][j]){
                if(key2 == "Columns"){
                    //result += String.format(separ3 + '\t\t\t{0} : "[{1}]"', key2 , myLogVar[key1][j][key2]);

                    result += separ3 + '\t\t\t"' + key2 + '" : [ ';
                    var separ4 = "";
                    for (var k = 0; k < myLogVar[key1][j][key2].length; k++){
                        result += separ4 + '"' + myLogVar[key1][j][key2][k] + '"';
                        if (separ4 == ""){
                            separ4 = ", ";
                        }
                    }
                    result += " ]";
                }
                else if(isNaN(Number(myLogVar[key1][j][key2]))){
                    result += String.format(separ3 + '\t\t\t"{0}" : "{1}"', key2 , myLogVar[key1][j][key2]);
                }
                else{
                    result += String.format(separ3 + '\t\t\t"{0}" : {1}', key2 , Number(myLogVar[key1][j][key2]));
                }

                if (separ3 == ""){
                    separ3 = ",\n";
                }
            }
            result += '\n\t\t}';
            if (separ2 == ""){
                separ2 = ",\n"
            }

        }
        result += "\n\t]";
        if (separ1 == ""){
            separ1 = ",\n"
        }
    }
    result += "\n}";
    return result;

}

log2Var(myLogPath, function(tryVAr){

    // TODO use this var in another script
    //console.log(tryVAr);
    // Make a JSON object properly spaced
    var DataJSON = "../data/2017-09-21 19-33-33.json";
    if(fs.existsSync(DataJSON)){
        fs.unlinkSync(DataJSON);
    }
    fs.appendFileSync(DataJSON, printObj2JSON(tryVAr));

});