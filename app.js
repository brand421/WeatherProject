const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "b562f772c47ef48094d572cbe**********";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descr = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h2>The weather is currently " + descr + "</h2>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<img src=" + imageURL + ">");
            // res.write(icon);
            res.send();          
        });
    });
    console.log("Post received");
});



app.listen(3000, function() {
    console.log("Server is running on port 3000");
})