/**
 * Created by pilibastidas on 10/03/2017.
 */

var lineReader = require('line-reader');
var fileName = "/Users/pilibastidas/Desktop/Logs/FIXED_WING/1/5 21-02-2017 21-51-00.bin.log"
//var fileName = "/Users/pilibastidas/Desktop/Logs/FIXED_WING/1/2017-02-21 17-24-06.log";
var commands = [];
// var commandObj = {type:"",number:0};

function includeCommand(commandName){
    var existe = false;

    if (commands.length == 0){
        commands.push([commandName,1])
    }
    else {
        for(var i = 0 ; i < commands.length ; i++){
            if(commandName == commands[i][0]){
                commands[i][1]++;
                existe = true;
                break;
            }
        }
        if(!existe){
            commands.push([commandName,1])
        }
    }


}

function printCommands(){
    for(var i = 0 ; i< commands.length; i++){
        console.log(commands[i][0] + "TOTAL: " + commands[i][1])
        }
}

lineReader.eachLine(fileName, function(line,last) {

    var lineArr = line.split(",");

    if(lineArr[0]) {
        if(lineArr[0].length > 0){
            includeCommand(lineArr[0]);
        }
    }


    // if(line.includes('CAM')){
    //     console.log(line);
    // }

    // do whatever with the line
    if(last){
    console.log("FINAL");
    printCommands();
    }

});