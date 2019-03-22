'use strict';

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
const path=require("path");
//const server=require("http").createServer(app);
//const io=require("socket.io")(server);
app.post('/webhook',(req,res) =>{

var w=search();

        return res.json({
          speech: w,
          displayText: w,
          source: "joke"
        }); 
});  

var r;
function search()
{
	r=undefined;
	const request = require('request');

var key = "AIzaSyCJuRDLJZNS5yO2MhWxlCN-4FnC4L1Rs8g";
   var location = "-33.8670522,151.1957362";
  var radius = 16000;
  var sensor = false;
  var types = "restaurant";
//let apiKey = '392e5b9bd00f4c5c35a0533f7abbac5d';
//let city = 'portland';
let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCJuRDLJZNS5yO2MhWxlCN-4FnC4L1Rs8g&location=-33.8670522,151.1957362&radius=16000&sensor=true&types=restaurant';
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
  
    let sdata = JSON.parse(data);
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
    }
   else {
    console.log(sdata.status);
    result=sdata.status;
    r=message;
   }
  }

});
	while(r == undefined){
		require('deasync').runLoopOnce();
	}
		
	return r;
}
app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});