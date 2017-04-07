/**
 * Created by Héctor on 05/04/2017.
 */


function obtainFootprints(xCP,yCP,altitude,hv,focal,AnchSens,LargSens,omega,phi,bearing,rumbo){
    return feedProjection(xCP,yCP,altitude,hv,focal,AnchSens,LargSens,omega,phi,bearing,rumbo);
}

var coordinates=[];
for (var j=0;j<3613;j++){
    var xCP=-3, yCP=90, HCP=1000, hv=0, AnchSens=0.3, LargSens=0.5, f=0.1, omega=Math.PI/10, phi=Math.PI/20, kappa=Math.PI/2, rumbo=0;
    var result=obtainFootprints(xCP,yCP,HCP,hv,f,AnchSens,LargSens,omega,phi,kappa,rumbo);
    coordinates.push(result);
    document.getElementById("resultado").innerHTML += result+"\n";
}

/*
 * @param xCP CoordenadaX del centroide
 * @param yCP CoordenadaY del centroide
 * @param HCP Altura de vuelo con respecto al home expresda en metros
 * @param hv Dejarlo siempre a cero
 * @param f Focal de la cámara
 * @param AnchSens Ancho del sensor expresado en milimetros
 * @param LargSens Largo del sensor expresado en milimetros
 * @param omega
 * @param phi
 * @param kappa orientación con respecto al norte
 * @param rumbo Dejarlo a cero. De momento no se usa
 * @returns {Array} un array de cuatro elementos (los cuatro puntos). cada elemento contiene un array de tres elementos (X,Y,Z)
 */

function feedProjection(xCP,yCP,HCP,hv,f,AnchSens,LargSens,omega,phi,kappa,rumbo){

    //For proj4 to work, meteor add proj4:proj4 is needed.
    proj4.defs([
        [   'EPSG:4326',
            '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
    ]);
    var utmzone;

    var XCP=xCP, YCP=yCP;

    do {xCP-=360} while (xCP>180);
    do {xCP+=360} while (xCP<-180);
    do {yCP-=360} while (yCP>90);
    do {yCP+=360} while (yCP<-90);

    if(-180<=xCP && xCP<-174){utmzone = '1'}
    if(-174<=xCP && xCP<-168){utmzone = '2'}
    if(-168<=xCP && xCP<-162){utmzone = '3'}
    if(-162<=xCP && xCP<-156){utmzone = '4'}
    if(-156<=xCP && xCP<-150){utmzone = '5'}
    if(-150<=xCP && xCP<-144){utmzone = '6'}
    if(-144<=xCP && xCP<-138){utmzone = '7'}
    if(-138<=xCP && xCP<-132){utmzone = '8'}
    if(-132<=xCP && xCP<-126){utmzone = '9'}
    if(-126<=xCP && xCP<-120){utmzone = '10'}
    if(-120<=xCP && xCP<-114){utmzone = '11'}
    if(-114<=xCP && xCP<-108){utmzone = '12'}
    if(-108<=xCP && xCP<-102){utmzone = '13'}
    if(-102<=xCP && xCP<-96){utmzone = '14'}
    if(-96<=xCP && xCP<-90){utmzone = '15'}
    if(-90<=xCP && xCP<-84){utmzone = '16'}
    if(-84<=xCP && xCP<-78){utmzone = '17'}
    if(-78<=xCP && xCP<-72){utmzone = '18'}
    if(-72<=xCP && xCP<-66){utmzone = '19'}
    if(-66<=xCP && xCP<-60){utmzone = '20'}
    if(-60<=xCP && xCP<-54){utmzone = '21'}
    if(-54<=xCP && xCP<-48){utmzone = '22'}
    if(-48<=xCP && xCP<-42){utmzone = '23'}
    if(-42<=xCP && xCP<-36){utmzone = '24'}
    if(-36<=xCP && xCP<-30){utmzone = '25'}
    if(-30<=xCP && xCP<-24){utmzone = '26'}
    if(-24<=xCP && xCP<-18){utmzone = '27'}
    if(-18<=xCP && xCP<-12){utmzone = '28'}
    if(-12<=xCP && xCP<-6){utmzone = '29'}
    if(-6<=xCP && xCP<0){utmzone = '30'}
    if(0<=xCP && xCP<6){utmzone = '31'}
    if(6<=xCP && xCP<12){utmzone = '32'}
    if(12<=xCP && xCP<18){utmzone = '33'}
    if(18<=xCP && xCP<24){utmzone = '34'}
    if(24<=xCP && xCP<30){utmzone = '35'}
    if(30<=xCP && xCP<36){utmzone = '36'}
    if(36<=xCP && xCP<42){utmzone = '37'}
    if(42<=xCP && xCP<48){utmzone = '38'}
    if(48<=xCP && xCP<54){utmzone = '39'}
    if(54<=xCP && xCP<60){utmzone = '40'}
    if(60<=xCP && xCP<66){utmzone = '41'}
    if(66<=xCP && xCP<72){utmzone = '42'}
    if(72<=xCP && xCP<78){utmzone = '43'}
    if(78<=xCP && xCP<84){utmzone = '44'}
    if(84<=xCP && xCP<90){utmzone = '45'}
    if(90<=xCP && xCP<96){utmzone = '46'}
    if(96<=xCP && xCP<102){utmzone = '47'}
    if(102<=xCP && xCP<108){utmzone = '48'}
    if(108<=xCP && xCP<114){utmzone = '49'}
    if(114<=xCP && xCP<120){utmzone = '50'}
    if(120<=xCP && xCP<126){utmzone = '51'}
    if(126<=xCP && xCP<132){utmzone = '52'}
    if(132<=xCP && xCP<138){utmzone = '53'}
    if(138<=xCP && xCP<144){utmzone = '54'}
    if(144<=xCP && xCP<150){utmzone = '55'}
    if(150<=xCP && xCP<156){utmzone = '56'}
    if(156<=xCP && xCP<162){utmzone = '57'}
    if(162<=xCP && xCP<168){utmzone = '58'}
    if(168<=xCP && xCP<174){utmzone = '59'}
    if(174<=xCP && xCP<=180){utmzone = '60'}

    var utm = "+proj=utm"+ " +zone="+ utmzone + "+ellps=GRS80 +units=m +no_defs"

    var center = proj4('EPSG:4326',utm,[XCP,YCP]);

    xCP=center[0];
    yCP=center[1];

    kappa = kappa * Math.PI / 180 + Math.PI/2;
    f = f / 1000; // pasamos de milímetros a metros
    AnchSens = AnchSens / 1000; // pasamos de milímetros a metros
    LargSens = LargSens / 1000; // pasamos de milímetros a metros
    var DiagSens= Math.sqrt((AnchSens*AnchSens)+(LargSens*LargSens));
    var DiagTerr=DiagSens*(HCP-hv)/f;

    var a11= Math.cos(phi)*Math.cos(kappa), a21=-Math.cos(phi)*Math.sin(kappa), a31=Math.sin(phi),a12=Math.cos(omega)*Math.sin(kappa)+Math.sin(omega)*Math.sin(phi)*Math.cos(kappa);
    var a22=Math.cos(omega)*Math.cos(kappa)-Math.sin(omega)*Math.sin(phi)*Math.sin(kappa), a32= -Math.sin(omega)*Math.cos(phi), a13=Math.sin(omega)*Math.sin(kappa)-Math.cos(omega)*Math.sin(phi)*Math.cos(kappa);
    var a23=Math.sin(omega)*Math.cos(kappa)+Math.cos(omega)*Math.sin(phi)*Math.sin(kappa), a33=Math.cos(omega)*Math.cos(phi);

    var MatrizRotT=[[a11,a12,a13],[a21,a22,a23],[a31,a32,a33]];

    var CP=[[xCP],[yCP],[HCP]];
    var CNsingiroT=[[xCP],[yCP],[HCP-hv]];


    /*
     var p1singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
     var p2singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(AnchSens,LargSens)+Math.PI/2)],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(AnchSens,LargSens)+Math.PI/2)],[CNsingiroT[2][0]]];
     var p3singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens)+Math.PI)],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens)+Math.PI)],[CNsingiroT[2][0]]];
     var p4singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(AnchSens,LargSens)+3*Math.PI/2)],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(AnchSens,LargSens)+3*Math.PI/2)],[CNsingiroT[2][0]]];
     */

    //constante 1.315 introducida para cuadrar el error de hacerlo en estas coordenadas(trabajando en epsg:3857)
    /*
     var p1singiroT=[[CNsingiroT[0][0] + 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
     var p2singiroT=[[CNsingiroT[0][0] - 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
     var p3singiroT=[[CNsingiroT[0][0] - 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
     var p4singiroT=[[CNsingiroT[0][0] + 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
     */


    var p1singiroT=[[CNsingiroT[0][0] + DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
    var p2singiroT=[[CNsingiroT[0][0] - DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
    var p3singiroT=[[CNsingiroT[0][0] - DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
    var p4singiroT=[[CNsingiroT[0][0] + DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];


    var p1giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p1singiroT,CP)),CP);
    var p2giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p2singiroT,CP)),CP);
    var p3giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p3singiroT,CP)),CP);
    var p4giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p4singiroT,CP)),CP);

    //CN=MatrizRotT*(CNsingiroT-CP)'+CP';
    //var CN=multiplyMatrix(MatrizRotT,arraySum(true,arraySum(false, CNsingiroT,CP),CP));
    var CN = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, CNsingiroT,CP)),CP);

    var returned4Points = [];
    returned4Points.push([p1giro[0],p1giro[1]],CN[3]);
    returned4Points.push([p2giro[0],p2giro[1]],CN[3]);
    returned4Points.push([p3giro[0],p3giro[1]],CN[3]);
    returned4Points.push([p4giro[0],p4giro[1]],CN[3]);

    var footprints= [];
    function returnFootprints(points) {
        var i = 0;
        points.forEach(function (point) {
            if (point != null) {
                footprints.push(point);
            }
            i++;
        });
    }
    returnFootprints(returned4Points);

    var footprints2= [];
    function footprints2wgs84(points) {
        var i = 0;
        points.forEach(function (point) {
            if (point != null) {
                var temp = proj4(utm,'EPSG:4326',[point[0][0],point[1][0]]);
                footprints2.push(temp);
            }
            i++;
        });
    }
    footprints2wgs84(footprints);

    return footprints2;
}

/**
 *
 * @param sumSub booleano, true = suma
 * @param a
 * @param b
 * @returns {Array}
 */

function arraySum(sumSub,a,b){
    var counterRow = 0;
    var counterLine = 0;
    var result = [];
    a.forEach(function(itemRow){
        var newRow = []
        itemRow.forEach(function (itemLine) {
            if(sumSub) {
                newRow.push(itemLine + b[counterRow][counterLine]);
            }else{
                function obtainFootprints(xCP,yCP,altitude,hv,focal,AnchSens,LargSens,omega,phi,bearing){
                    return feedProjection(xCP,yCP,altitude,hv,focal,AnchSens,LargSens,omega,phi,bearing,0);
                }

                obtainFootprints(xCP,yCP,HCP,hv,f,AnchSens,LargSens,omega,phi,kappa);

                /**
                 *
                 * @param xCP CoordenadaX del centroide
                 * @param yCP CoordenadasY del centroide
                 * @param HCP Altura de vuelo con respecto al home expresda en metros
                 * @param hv Dejarlo siempre a cero
                 * @param f Focal de la cámara
                 * @param AnchSens Ancho del sensor expresado en milimetros
                 * @param LargSens Largo del sensor expresado en milimetros
                 * @param omega
                 * @param phi
                 * @param kappa orientación con respecto al norte
                 * @param rumbo Dejarlo a cero. De momento no se usa
                 * @returns {Array} un array de cuatro elementos (los cuatro puntos). cada elemento contiene un array de tres elementos (X,Y,Z)
                 */

                function feedProjection(xCP,yCP,HCP,hv,f,AnchSens,LargSens,omega,phi,kappa,rumbo){
                    //var xCP=10000, yCP=10000, HCP=1000, hv=600, AnchSens=0.3, LargSens=0.5, f=0.1,omega=pi/10, phi=pi/20, kappa=pi/ 6;

                    //For proj4 to work, meteor add proj4:proj4 is needed.
                    proj4.defs([
                        [
                            'EPSG:4326',
                            '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
                    ]);
                    var utmzone;

                    if(-180<=xCP && xCP<-174){utmzone = '1'}
                    if(-174<=xCP && xCP<-168){utmzone = '2'}
                    if(-168<=xCP && xCP<-162){utmzone = '3'}
                    if(-162<=xCP && xCP<-156){utmzone = '4'}
                    if(-156<=xCP && xCP<-150){utmzone = '5'}
                    if(-150<=xCP && xCP<-144){utmzone = '6'}
                    if(-144<=xCP && xCP<-138){utmzone = '7'}
                    if(-138<=xCP && xCP<-132){utmzone = '8'}
                    if(-132<=xCP && xCP<-126){utmzone = '9'}
                    if(-126<=xCP && xCP<-120){utmzone = '10'}
                    if(-120<=xCP && xCP<-114){utmzone = '11'}
                    if(-114<=xCP && xCP<-108){utmzone = '12'}
                    if(-108<=xCP && xCP<-102){utmzone = '13'}
                    if(-102<=xCP && xCP<-96){utmzone = '14'}
                    if(-96<=xCP && xCP<-90){utmzone = '15'}
                    if(-90<=xCP && xCP<-84){utmzone = '16'}
                    if(-84<=xCP && xCP<-78){utmzone = '17'}
                    if(-78<=xCP && xCP<-72){utmzone = '18'}
                    if(-72<=xCP && xCP<-66){utmzone = '19'}
                    if(-66<=xCP && xCP<-60){utmzone = '20'}
                    if(-60<=xCP && xCP<-54){utmzone = '21'}
                    if(-54<=xCP && xCP<-48){utmzone = '22'}
                    if(-48<=xCP && xCP<-42){utmzone = '23'}
                    if(-42<=xCP && xCP<-36){utmzone = '24'}
                    if(-36<=xCP && xCP<-30){utmzone = '25'}
                    if(-30<=xCP && xCP<-24){utmzone = '26'}
                    if(-24<=xCP && xCP<-18){utmzone = '27'}
                    if(-18<=xCP && xCP<-12){utmzone = '28'}
                    if(-12<=xCP && xCP<-6){utmzone = '29'}
                    if(-6<=xCP && xCP<0){utmzone = '30'}
                    if(0<=xCP && xCP<6){utmzone = '31'}
                    if(6<=xCP && xCP<12){utmzone = '32'}
                    if(12<=xCP && xCP<18){utmzone = '33'}
                    if(18<=xCP && xCP<24){utmzone = '34'}
                    if(24<=xCP && xCP<30){utmzone = '35'}
                    if(30<=xCP && xCP<36){utmzone = '36'}
                    if(36<=xCP && xCP<42){utmzone = '37'}
                    if(42<=xCP && xCP<48){utmzone = '38'}
                    if(48<=xCP && xCP<54){utmzone = '39'}
                    if(54<=xCP && xCP<60){utmzone = '40'}
                    if(60<=xCP && xCP<66){utmzone = '41'}
                    if(66<=xCP && xCP<72){utmzone = '42'}
                    if(72<=xCP && xCP<78){utmzone = '43'}
                    if(78<=xCP && xCP<84){utmzone = '44'}
                    if(84<=xCP && xCP<90){utmzone = '45'}
                    if(90<=xCP && xCP<96){utmzone = '46'}
                    if(96<=xCP && xCP<102){utmzone = '47'}
                    if(102<=xCP && xCP<108){utmzone = '48'}
                    if(108<=xCP && xCP<114){utmzone = '49'}
                    if(114<=xCP && xCP<120){utmzone = '50'}
                    if(120<=xCP && xCP<126){utmzone = '51'}
                    if(126<=xCP && xCP<132){utmzone = '52'}
                    if(132<=xCP && xCP<138){utmzone = '53'}
                    if(138<=xCP && xCP<144){utmzone = '54'}
                    if(144<=xCP && xCP<150){utmzone = '55'}
                    if(150<=xCP && xCP<156){utmzone = '56'}
                    if(156<=xCP && xCP<162){utmzone = '57'}
                    if(162<=xCP && xCP<168){utmzone = '58'}
                    if(168<=xCP && xCP<174){utmzone = '59'}
                    if(174<=xCP && xCP<=180){utmzone = '60'}

                    var utm = "+proj=utm"+ " +zone="+ utmzone + "+ellps=GRS80 +units=m +no_defs"

                    var center = proj4('EPSG:4326',utm,[xCP,yCP]);

                    xCP=center[0];
                    yCP=center[1];

                    kappa = kappa * Math.PI / 180 + Math.PI/2;
                    f = f / 1000; // pasamos de milímetros a metros
                    AnchSens = AnchSens / 1000; // pasamos de milímetros a metros
                    LargSens = LargSens / 1000; // pasamos de milímetros a metros
                    var DiagSens= Math.sqrt((AnchSens*AnchSens)+(LargSens*LargSens));
                    var DiagTerr=DiagSens*(HCP-hv)/f;

                    var a11= Math.cos(phi)*Math.cos(kappa), a21=-Math.cos(phi)*Math.sin(kappa), a31=Math.sin(phi),a12=Math.cos(omega)*Math.sin(kappa)+Math.sin(omega)*Math.sin(phi)*Math.cos(kappa);
                    var a22=Math.cos(omega)*Math.cos(kappa)-Math.sin(omega)*Math.sin(phi)*Math.sin(kappa), a32= -Math.sin(omega)*Math.cos(phi), a13=Math.sin(omega)*Math.sin(kappa)-Math.cos(omega)*Math.sin(phi)*Math.cos(kappa);
                    var a23=Math.sin(omega)*Math.cos(kappa)+Math.cos(omega)*Math.sin(phi)*Math.sin(kappa), a33=Math.cos(omega)*Math.cos(phi);

                    var MatrizRotT=[[a11,a12,a13],[a21,a22,a23],[a31,a32,a33]];

                    var CP=[[xCP],[yCP],[HCP]];
                    var CNsingiroT=[[xCP],[yCP],[HCP-hv]];

                    /*
                     var p1singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                     var p2singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(AnchSens,LargSens)+Math.PI/2)],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(AnchSens,LargSens)+Math.PI/2)],[CNsingiroT[2][0]]];
                     var p3singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens)+Math.PI)],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens)+Math.PI)],[CNsingiroT[2][0]]];
                     var p4singiroT2=[[CNsingiroT[0][0]+ DiagTerr/2*Math.sin(Math.atan2(AnchSens,LargSens)+3*Math.PI/2)],[CNsingiroT[1][0]+ DiagTerr/2*Math.cos(Math.atan2(AnchSens,LargSens)+3*Math.PI/2)],[CNsingiroT[2][0]]];
                     */

                    //constante 1.315 introducida para cuadrar el error de hacerlo en estas coordenadas(trabajando en epsg:3857)
                    /*
                     var p1singiroT=[[CNsingiroT[0][0] + 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                     var p2singiroT=[[CNsingiroT[0][0] - 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                     var p3singiroT=[[CNsingiroT[0][0] - 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                     var p4singiroT=[[CNsingiroT[0][0] + 1.315*DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - 1.315*DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                     */


                    var p1singiroT=[[CNsingiroT[0][0] + DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                    var p2singiroT=[[CNsingiroT[0][0] - DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] + DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                    var p3singiroT=[[CNsingiroT[0][0] - DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];
                    var p4singiroT=[[CNsingiroT[0][0] + DiagTerr/2*Math.sin(Math.atan2(LargSens,AnchSens))],[CNsingiroT[1][0] - DiagTerr/2*Math.cos(Math.atan2(LargSens,AnchSens))],[CNsingiroT[2][0]]];



                    var p1giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p1singiroT,CP)),CP);
                    var p2giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p2singiroT,CP)),CP);
                    var p3giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p3singiroT,CP)),CP);
                    var p4giro = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, p4singiroT,CP)),CP);

                    //CN=MatrizRotT*(CNsingiroT-CP)'+CP';
                    //var CN=multiplyMatrix(MatrizRotT,arraySum(true,arraySum(false, CNsingiroT,CP),CP));
                    var CN = arraySum(true,multiplyMatrix(MatrizRotT,arraySum(false, CNsingiroT,CP)),CP);
                    var returned4Points = [];
                    returned4Points.push([p1giro[0],p1giro[1]],CN[3]);
                    returned4Points.push([p2giro[0],p2giro[1]],CN[3]);
                    returned4Points.push([p3giro[0],p3giro[1]],CN[3]);
                    returned4Points.push([p4giro[0],p4giro[1]],CN[3]);

                    var footprints= [];
                    function returnFootprints(points) {
                        var i = 0;
                        points.forEach(function (point) {
                            if (point != null) {
                                footprints.push(point);
                            }
                            i++;
                        });
                    }
                    returnFootprints(returned4Points);

                    var footprints2= [];
                    function footprints2wgs84(points) {
                        var i = 0;
                        points.forEach(function (point) {
                            if (point != null) {
                                var temp = proj4(utm,'EPSG:4326',[point[0][0],point[1][0]]);
                                footprints2.push(temp);
                            }
                            i++;
                        });
                    }
                    footprints2wgs84(footprints);

                    return footprints2;

                }

                /**
                 *
                 * @param sumSub booleano, true = suma
                 * @param a
                 * @param b
                 * @returns {Array}
                 */

                function arraySum(sumSub,a,b){
                    var counterRow = 0;
                    var counterLine = 0;
                    var result = [];
                    a.forEach(function(itemRow){
                        var newRow = []
                        itemRow.forEach(function (itemLine) {
                            if(sumSub) {
                                newRow.push(itemLine + b[counterRow][counterLine]);
                            }else{
                                newRow.push(itemLine - b[counterRow][counterLine])
                            }
                            counterLine++;
                        });
                        result.push(newRow);
                        counterLine = 0;
                        counterRow++;
                    });
                    return result;
                }

                function multiplyMatrix(a, b) {
                    var aNumRows = a.length, aNumCols = a[0].length,
                        bNumRows = b.length, bNumCols = b[0].length,
                        m = new Array(aNumRows);  // initialize array of rows
                    for (var r = 0; r < aNumRows; ++r) {
                        m[r] = new Array(bNumCols); // initialize the current row
                        for (var c = 0; c < bNumCols; ++c) {
                            m[r][c] = 0;             // initialize the current cell
                            for (var i = 0; i < aNumCols; ++i) {
                                m[r][c] += a[r][i] * b[i][c];
                            }
                        }
                    }
                    return m;
                }

                /*
                 function multiplyMatrix(matrixA, matrixB){
                 var result = new Array();//declare an array
                 var resu = new Array();

                 if((matrixA.length==0) || matrixB.length==0){
                 console.log("ERROR: one matrix has no elements");
                 return null;
                 }

                 numRowsMatrixA = matrixA.length;
                 numColsMatrixB = matrixB[0].length;


                 //iterating through first matrix rows
                 for (var i = 0; i < numRowsMatrixA; i++){
                 //iterating through second matrix columns
                 resu = new Array();
                 for (var j = 0; j < numColsMatrixB; j++){
                 var suma= 0;
                 //calculating sum of pairwise products
                 for (var k = 0; k < numRowsMatrixA; k++){
                 suma += parseInt(matrixA[i][k])*parseInt(matrixB[k][j]);
                 }//for 3
                 resu.push(suma);
                 }//for 2
                 result.push(resu);
                 }//for 1
                 return result;
                 }// function multiplyMatrix//
                 */


                newRow.push(itemLine - b[counterRow][counterLine])
            }
            counterLine++;
        });
        result.push(newRow);
        counterLine = 0;
        counterRow++;
    });

    return result;
}


function multiplyMatrix(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

/*
 function multiplyMatrix(matrixA, matrixB){
 var result = new Array();//declare an array
 var resu = new Array();

 if((matrixA.length==0) || matrixB.length==0){
 console.log("ERROR: one matrix has no elements");
 return null;
 }

 numRowsMatrixA = matrixA.length;
 numColsMatrixB = matrixB[0].length;


 //iterating through first matrix rows
 for (var i = 0; i < numRowsMatrixA; i++){
 //iterating through second matrix columns
 resu = new Array();
 for (var j = 0; j < numColsMatrixB; j++){
 var suma= 0;
 //calculating sum of pairwise products
 for (var k = 0; k < numRowsMatrixA; k++){
 suma += parseInt(matrixA[i][k])*parseInt(matrixB[k][j]);
 }//for 3
 resu.push(suma);
 }//for 2
 result.push(resu);
 }//for 1
 return result;
 }// function multiplyMatrix
 */
