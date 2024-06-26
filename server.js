const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortner')
  
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.get('/',async (req,res)=>{
    const shorturls = await ShortUrl.find()
    res.render('index',{shorturls: shorturls})
})

app.post('/shortUrls',async(req,res)=>{
   await ShortUrl.create({
        full: req.body.fullUrl
    })
    res.redirect('/')

})
app.listen(process.env.PORT || 8080);