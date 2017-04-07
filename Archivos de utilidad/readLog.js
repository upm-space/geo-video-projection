// var fs = require('fs')

var fs = require('graceful-fs');

function getTime(){
	var time = new Date();
	var hrs = time.getHours();
	var min = time.getMinutes();
	var sec = time.getSeconds();
	var mil = time.getMilliseconds();
	return hrs.toString() + ":" + min.toString() + ":" + sec.toString() + ":" + mil.toString();
}

function newLineToFile( file, string ){
	fs.appendFile( file, string + '\n' , function (err) { if (err) return console.log(err); } );
}

function fakeLogGenerate( file, dataSize ) {
	var fakeLog = file;
	console.log(typeof(fakeLog));

	if (typeof file == 'undefined') {
		var fakeLog = 'data/fakeLog.txt';
		console.log("El fakeLog.txt está en data/");
	}
	if (typeof dataSize == 'undefined') {
		var dataSize = 8000;
		console.log("Por defecto definimos un log de 8000 puntos");
	}
	if(fs.existsSync(fakeLog))
		fs.unlinkSync(fakeLog);

	console.log("The fake Log is being generated...");

	console.log(getTime());
	for (var i=0; i<dataSize; i++) {
		newLineToFile( fakeLog , getTime() + ' , ' + i + ' , ' + ('fakedata-'+i) );
	}
	if (i == dataSize-1 ) console.log('Appended all successfully!');
	console.log(getTime());
}

fakeLogGenerate();

/**
 *
 * */
/**
 * Created by pilibastidas on 10/03/2017.
 */
/**
 *
 * */

console.log("Now reading the Log...");

var lineReader = require('line-reader');
var fileName = "data/exampleLog.bin.log";
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

console.log("Log successfully scanned...");

// setInterval()


// node js/readLog.js