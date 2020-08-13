const request = require('postman-request');

const forecast = (latitude, longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=f36f175ac7a3fc7984f1f734dcb853db&query=' + latitude + ',' + longitude + '&units=f'
    console.log(url);
request({url, json: true}, (error, {body}) => {
    if(error) {
        callback('Unable to connect to weather Service!', undefined);
    } else if(body.error) {
        callback('Unable to find Location', undefined)
    } else {
        const temp =JSON.parse(body.current.temperature);
        const feelslike =JSON.parse(body.current.feelslike);
        const humidity =JSON.parse(body.current.humidity);
        callback(undefined, body.current.weather_descriptions[0] +' .It is currently '+temp+' degrees out. It feels like '+feelslike+ ' degrees out. Humidity is ' + humidity + '%')
    }
}) 
}

module.exports = forecast;