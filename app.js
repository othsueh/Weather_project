const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/',function(req,res){
    const query = req.body.cityName;
    const apiKey = '68e5145117f981f7e8d10fdffe0ba00e';
    const unit = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
    https.get(url,function(response){
        const {statusCode} = response;
        const statusImageUrl = `https://http.cat/${statusCode}`;
        console.log(statusCode);
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius. The weather is currently ${description}.</h1>`);
            res.write(`<img src=${iconUrl} alt = 'weatherIcon' style = "object-position: center;">`);
            res.write(`<img src=${statusImageUrl} alt = 'httpCat' width = 300px style = "object-position: center;">`);
            res.send(); 
        })
    });
})
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
    // const object = {
    //     name: 'Thomas',
    //     favouritefood: 'Ramen'
    // }
    // console.log(JSON.stringify(object));
    // res.send(object);
})

app.listen(3990,function(){
    console.log('Server is running on port 3990');
})