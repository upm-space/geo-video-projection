/*
 * Con este Script el objetivo es crear un Array de objetos JSON
 * con el contenido de ubicación, orientación en función del tiempo.
 *
 * OJO: JSON (ejemplo de Luis).html es lo mismo que esto!
 *
 * Dani: Mi idea sería usar este script para crear todas las clases de datos, utilizar estas funciones para
 * a partir de un log "limpio" (que esté formateado a nuestro antojo solo con datos útiles) generar el JSON.
*/

function init(){
	var myObj = {
		type : 'CAM',
		latitude : '42.7865677',
		MyArray :[{dato:"999"},{dato:"888"}]
	}
	console.log(myObj.type);
	myObj.type = "STR";
	console.log(myObj.type);
	console.log(myObj.MyArray[1]);
}


function telemetria(){
	var telemetria = [];


	var cam1 = returnCamObj();
	cam1.latitude = 0.34;
	telemetria.push(cam1);

	var cam2 = returnCamObj();
	cam2.latitude = 0.35;
	telemetria.push(cam2);

	var att1 = returnAttObj();
	att1.heading = 4;
	telemetria.push(att1);

	/*
	 console.log(telemetria[0].latitude);
	 console.log(telemetria[1].latitude);
	 console.log(telemetria[2].heading);
	 console.log(telemetria);
	 */
	for(var i = 0; i < telemetria.length; i++){
		if(telemetria[i].type == "CAM"){
			console.log(telemetria[i].latitude);
		}
		if(telemetria[i].type == "ATT"){
			console.log(telemetria[i].heading);
		}
	}

}


function returnCamObj() {
	return {
		type:"CAM",
		latitude : 0,
		longitude : 0,
		altitude : 0
	}
}


function returnAttObj(){
	return {
		type : "ATT",
		heading : 0,
		tilt : 0
	}
}
