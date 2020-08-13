const path = require('path');
const express = require('express');
const hbs =require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath =path.join(__dirname,'../templates/partials');
app.use(express.static(publicDirPath));
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.get('',(req, res) => {
    res.render('index', {
        'title': 'weather app',
        'name': 'ashwanth',
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        'name': 'Ashwanth',
        'title': 'Weather-app'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'message': 'Help me!!. I am in trouble',
        'name': 'Ashwanth',
        'title': 'Help-me!!!'
    })
})
// app.get('/help',(req, res) => {
//     res.send([{
//         name: 'Ashwanth'
//     },{
//         name: 'Ranjith'
//     }]);
// })
// app.get('/about',(req, res) => {
//     res.send("<h1>About!!!</h1>");
// })

app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({
            'error':"you must provide an address!!"
        })
    }

geocode(req.query.address, (error, {latitude, longitude,location} ={}) => {
    if(error) {
        return res.send({error})
    }
forecast(latitude, longitude, (error, forecastData) => {
    if(error) {
        return res.send({error})
    }

    res.send({
        forecast: forecastData,
        location,
        address: req.query.address
    })
})
})
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            'error':'You must provide an search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'name': 'Ashwanth',
        'title': '404',
        'errorMsg': 'Help Article not found!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'name': 'Ashwanth',
        'title': '404',
        'errorMsg': '404. Page not found!!'
    })
})
app.listen(3000, ()=> {
    console.log("Server is up on port 3000")
})