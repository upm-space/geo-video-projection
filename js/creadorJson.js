/**
 * Created by Hctr on 30/05/2017.
 */

var fs=require("fs");

var filename="../data/citi-field.geo5.json";

if(fs.existsSync(filename)){
    fs.unlinkSync(filename);
}

fs.appendFileSync(filename,'{\n\t"type": "FeatureCollection",\n\t"features": [\n');

var x1=0, y1=0, x2=0, y2=0, x3=0, y3=0, x4=0, y4=0, coordinates;
var Lng=0, Lat=0, r=0.5, l2, a2, theta=0, alfa=0, time, length=3600;

coordinates=[[-2.5, 39.75], [-3.5, 39.75], [-3.5, 40.25], [-2.5, 40.25]];
//coordinates=[[-3.6957411360625363, 40.0924071741667589], [-3.6957380974202905, 40.0924071741667589], [-3.6957380974202905, 40.0923691964690150], [-3.6957411360625363, 40.0923691964690150], [-3.6957411360625363, 40.0924071741667589]];
l2 = Math.abs(coordinates[0][0] - coordinates[2][0])/2;
a2 = Math.abs(coordinates[0][1] - coordinates[2][1])/2;

for (var i=0; i<=length; i++){
    time=i*1000000*(6/length);
    theta=i*Math.PI/180*(360/length);
    alfa=i*Math.PI/180*(360/length);
    Lng = (coordinates[0][0] + coordinates[2][0])/2-r*(1-Math.cos(theta));
    Lat = (coordinates[0][1] + coordinates[2][1])/2+r*Math.sin(theta);

    x1=(Lng+l2*Math.cos(alfa)+a2*Math.sin(alfa)).toFixed(13), y1=(Lat-a2*Math.cos(alfa)+l2*Math.sin(alfa)).toFixed(13);
    x2=(Lng-l2*Math.cos(alfa)+a2*Math.sin(alfa)).toFixed(13), y2=(Lat-a2*Math.cos(alfa)-l2*Math.sin(alfa)).toFixed(13);
    x3=(Lng-l2*Math.cos(alfa)-a2*Math.sin(alfa)).toFixed(13), y3=(Lat+a2*Math.cos(alfa)-l2*Math.sin(alfa)).toFixed(13);
    x4=(Lng+l2*Math.cos(alfa)-a2*Math.sin(alfa)).toFixed(13), y4=(Lat+a2*Math.cos(alfa)+l2*Math.sin(alfa)).toFixed(13);

    /*
    x1=(coordinates[0][0]-r*(1-Math.cos(theta))).toFixed(13), y1=(coordinates[0][1]+r*Math.sin(theta)).toFixed(13);
    x2=(coordinates[1][0]-r*(1-Math.cos(theta))).toFixed(13), y2=(coordinates[1][1]+r*Math.sin(theta)).toFixed(13);
    x3=(coordinates[2][0]-r*(1-Math.cos(theta))).toFixed(13), y3=(coordinates[2][1]+r*Math.sin(theta)).toFixed(13);
    x4=(coordinates[3][0]-r*(1-Math.cos(theta))).toFixed(13), y4=(coordinates[3][1]+r*Math.sin(theta)).toFixed(13);
    */

    if(i>=length){
        fs.appendFileSync(filename,'\t\t{\n\t\t\t"geometry":{\n\t\t\t\t"type": "Polygon",\n\t\t\t\t"coordinates": [[['+x1+', '+y1+'], ['+x2+', '+y2+'], ['+x3+', '+y3+'], ['+x4+', '+y4+'], ['+x1+', '+y1+']]]\n\t\t\t},\n\t\t\t"TimeUS": '+time+',\n\t\t\t"Alpha": '+alfa+',\n\t\t\t"type":"Feature",\n\t\t\t"properties": {\n\t\t\t\t"wallColor": "rgb(190, 190, 190)",\n\t\t\t\t"roofColor": "rgb(175, 175, 175)"\n\t\t\t}\n\t\t}\n');
    }else{
        fs.appendFileSync(filename,'\t\t{\n\t\t\t"geometry":{\n\t\t\t\t"type": "Polygon",\n\t\t\t\t"coordinates": [[['+x1+', '+y1+'], ['+x2+', '+y2+'], ['+x3+', '+y3+'], ['+x4+', '+y4+'], ['+x1+', '+y1+']]]\n\t\t\t},\n\t\t\t"TimeUS": '+time+',\n\t\t\t"Alpha": '+alfa+',\n\t\t\t"type":"Feature",\n\t\t\t"properties": {\n\t\t\t\t"wallColor": "rgb(190, 190, 190)",\n\t\t\t\t"roofColor": "rgb(175, 175, 175)"\n\t\t\t}\n\t\t},\n');
    }
}

fs.appendFileSync(filename,'\t]\n}');