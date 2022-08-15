const express = require("express");
const fetch=require("node-fetch");
const path = require("path");
const app = express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("dotenv").config();
app.set("engine view","ejs");
app.set("views",path.join(__dirname,"/views"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/weather/",async(req,res)=>{
    const location = await req.body.cityName;
    const url = `https://api.weatherbit.io/v2.0/current?city=${location}&key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    const city_name = await weatherData.data[0].city_name;
    const temperature = await weatherData.data[0].temp;
    const wind_speed = await weatherData.data[0].wind_spd;
    const description = await weatherData.data[0].weather.description;
    const icon_code = await weatherData.data[0].weather.icon;
    const precipitation = await weatherData.data[0].precip;
    res.render("weather.ejs",{city_name,temperature,wind_speed,description,icon_code,precipitation});
});
app.listen(port,()=>{
    console.log(`Listening to the port : ${port}`);
});