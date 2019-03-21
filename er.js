'use strict';
var dotenv = require('dotenv');
dotenv.load();
var https = require('follow-redirects').https;
//var google = require('google');
const express = require("express");
const bodyParser = require("body-parser");
//const uuidv1 = require('uuid/v1');
const request=require("request");
var deasync = require('deasync');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
var placeDetails = function() {
	this.places = [];
}
const path=require("path");

  app.post('/webhook',(req,res) =>{
    //var city="delhi";
   	var jokes=req.body.result.parameters.place;
  //	if(city == null)
  //		city="Delhi";
        var w=getCoordinates(387001);
        return res.json({
          speech: w,
          displayText: w,
          source: "Places"
        }); 
  });

var result;
function PlaceResponse(response) {
	var p;
	var data = "";
	var sdata = "";
	var PD = new placeDetails();

	response.on('data', function(chunk) {
		data += chunk;
	});
	response.on('end', function() {
		sdata = JSON.parse(data);
		if (sdata.status === 'OK') {
			console.log('Status: ' + sdata.status);
			console.log('Results: ' + sdata.results.length);
			for (p = 0; p < sdata.results.length; p++) {
				PD.places.push(sdata.results[p]);
			}
			for (r = 0; r < sdata.results.length; r++) {
				console.log('----------------------------------------------');
        console.log(PD.places[r].name);
        
        console.log('Place ID (for Place Detail search on Google):' + PD.places[r].place_id);
        console.log('Rating: ' + PD.places[r].rating);
        console.log('Vicinity: ' + PD.places[r].vicinity);
        result=PD.places[r].name+'Place ID (for Place Detail search on Google):' + PD.places[r].place_id+'Rating: ' + PD.places[r].rating+'Vicinity: ' + PD.places[r].vicinity;
			}
		} else {
      console.log(sdata.status);
      result=sdata.status;
    }
    return result;
	});
}
function placeSearch(latitude, longitude, radius) {
	result=https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=restaurant&key=AIzaSyCJuRDLJZNS5yO2MhWxlCN-4FnC4L1Rs8g',
		method: 'GET'},
    PlaceResponse).end();
    return result;
}
function CoordinateResponse(response) {
	var data = "";
	var sdata = "";
	var latitude = "";
	var longitude = "";

	response.on('data', function(chunk) {
		data += chunk;
	});
	response.on('end', function() {
        sdata = JSON.parse(data);
        latitude=-33.8670522;
        longitude=151.1957362;
		//latitude = sdata.results[0].geometry.viewport.northeast.lat;
		//longitude = sdata.results[0].geometry.viewport.northeast.lng;
    result=placeSearch(latitude, longitude, 50000);
    return result;
	});
}
function getCoordinates(zipcode) {
	result=https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/geocode/json?address=' + zipcode + '&key=AIzaSyCJuRDLJZNS5yO2MhWxlCN-4FnC4L1Rs8g',
		method: 'GET'},
    CoordinateResponse).end();
    return result;
    while(result == undefined){
      require('deasync').runLoopOnce();
    }
      
    return result;
}


	
  

app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
 