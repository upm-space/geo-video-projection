/**
 * Created by Hctr on 30/05/2017.
 */

var fs=require("fs");

var filename="../data/citi-field.geo4.json";

if(fs.existsSync(filename)){
    fs.unlinkSync(filename);
};

fs.appendFileSync(filename,'{\n\t"type": "FeatureCollection",\n\t"features": [\n');

var x1=0, y1=0, x2=0, y2=0, x3=0, y3=0, x4=0, y4=0, coordinates, r=0.5, theta=0, time, length=36;

coordinates=[[-2.75, 39.5], [-3.25, 39.5], [-3.25, 40.5], [-2.75, 40.5]];

for (var i=0; i<=length; i++){
    time=1000000*i/6;
    theta=i*Math.PI/18;
    x1=(coordinates[0][0]-r*(1-Math.cos(theta))).toFixed(3), y1=(coordinates[0][1]+r*Math.sin(theta)).toFixed(3);
    x2=(coordinates[1][0]-r*(1-Math.cos(theta))).toFixed(3), y2=(coordinates[1][1]+r*Math.sin(theta)).toFixed(3);
    x3=(coordinates[2][0]-r*(1-Math.cos(theta))).toFixed(3), y3=(coordinates[2][1]+r*Math.sin(theta)).toFixed(3);
    x4=(coordinates[3][0]-r*(1-Math.cos(theta))).toFixed(3), y4=(coordinates[3][1]+r*Math.sin(theta)).toFixed(3);

    if(i==length){
        fs.appendFileSync(filename,'\t\t{\n\t\t\t"geometry":{\n\t\t\t\t"type": "Polygon",\n\t\t\t\t"coordinates": [[['+x1+', '+y1+'], ['+x2+', '+y2+'], ['+x3+', '+y3+'], ['+x4+', '+y4+'], ['+x1+', '+y1+']]]\n\t\t\t},\n\t\t\t"TimeUS": '+time+',\n\t\t\t"type":"Feature",\n\t\t\t"properties": {\n\t\t\t\t"wallColor": "rgb(190, 190, 190)",\n\t\t\t\t"roofColor": "rgb(175, 175, 175)"\n\t\t\t}\n\t\t}\n');
    }else{
        fs.appendFileSync(filename,'\t\t{\n\t\t\t"geometry":{\n\t\t\t\t"type": "Polygon",\n\t\t\t\t"coordinates": [[['+x1+', '+y1+'], ['+x2+', '+y2+'], ['+x3+', '+y3+'], ['+x4+', '+y4+'], ['+x1+', '+y1+']]]\n\t\t\t},\n\t\t\t"TimeUS": '+time+',\n\t\t\t"type":"Feature",\n\t\t\t"properties": {\n\t\t\t\t"wallColor": "rgb(190, 190, 190)",\n\t\t\t\t"roofColor": "rgb(175, 175, 175)"\n\t\t\t}\n\t\t},\n');
    };
}

fs.appendFileSync(filename,'\t]\n}');