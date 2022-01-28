const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=409cfb3b5a89a56ab00c7140b3af39e1&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services :(', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It's ${body.current.temperature} outside. But it feels like ${body.current.feelslike}. With a wind speed of: ${body.current.wind_speed}mph.`)
        }
    })

}

module.exports = forecast