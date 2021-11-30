const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs') // handlebars is the template engine with Express...
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// it must be instalated previously to work properly due that it's a npm module...
// npm i hbs

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Monroe'
    })
})

app.get('/about/', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'David Monroe'
    })
})

app.get('/help/', (req, res) => {
    res.render('help', {
        title: 'Help',
        header: 'Help page',
        paragraph: 'This is a help page',
        name: 'David Monroe'
    })
})

app.get('/weather/', (req, res) => {
    if (!req.query.address) {
        return res.send('<h1> Must provide address </h1>')
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })

    })
})



app.get('/products/', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Oops, article not found :/'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found :('
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
