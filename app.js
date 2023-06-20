const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="243282079b11d9eb88cff3eb128fed98"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData =JSON.parse(data)
            console.log(weatherData);
            const temp=weatherData.main.temp;
            const des=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png"
            // console.log(imageURL)
            res.write("<h1>The temperature in "+query+" is "+temp+" degree</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
            
            console.log(temp)
        })
    });
})



app.listen(3000,function(req,res){
    console.log("Port is running on 3000!!!");
})