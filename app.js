const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function (req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function (req,res){
    const query=req.body.cityName;
    const apiKey="a8e2fa6ed8fa7282a7ff9c9d9a48be5d";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function (response){
        //console.log(response.statusCode);
        response.on("data",function (data) {
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const des=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            //console.log(temp,des);
            res.write(`<h1>Temperature in ${query} is ${temp} degree Celcius.</h1>`);
            res.write(`<p>Weather is currently ${des}.</p>`);
            res.write(`<img src="${imageURL}">`);
            res.send();

        })
    });
});

app.listen(3000,function () {
   console.log("Server is running on port 3000."); 
});



    