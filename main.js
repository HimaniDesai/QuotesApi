const request = require('request');

//let apiKey = '392e5b9bd00f4c5c35a0533f7abbac5d';
//let city = 'portland';
let url = `https://random-math-quote-api.herokuapp.com/`
console.log("request starts");
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body);
    let message = ` ${weather.quote}`;
    console.log(message);
  }
});