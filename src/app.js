const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express()

console.log('Directory name:'+ __dirname)
//Define path for express config
const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

console.log(publicDir)
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sujal K S'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sujal K S'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sujal K S'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Sujal K S',
        message:'Help Info'
    })
})

//app.use(express.static(path.join(__dirname,'../public')))

// app.get('',(req,res)=>{

// res.send('<h1> Weather </h1>')

// })

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
        error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


    // res.send({
    //     forecast:'Snowing',
    //     location:'Bangalore',
    //   address:req.query.address
    // })


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sujal K S',
    errorMesage:'Help Article Not found'
})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sujal K S',
        errorMessage:'Page Not Found'
    })
})

//app.com

app.listen(5000,()=>{
    console.log('Server is up on port 5000')
})