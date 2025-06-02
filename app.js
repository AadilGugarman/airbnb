const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js')
const methodOverride = require('method-override');
const ejsMate = require ('ejs-mate');


const port = 8080;
const MongoURL = 'mongodb://127.0.0.1:27017/airbnb'

app.set('viewengine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
app.use(express.urlencoded ({extended: true}));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs' , ejsMate);

main().then((res)=>{
    console.log('connected to DB')
}).catch((err) =>{
  console.log(err)
})
async function main(){
    await mongoose.connect(MongoURL)
}


app.get('/listings/:id/edit' , async (req, res)=>{
    let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render('listings/edit.ejs', {listing})
})

app.get('/listings/new' , (req , res)=>{
    res.render('listings/new.ejs')
})

app.get('/listings/:id' , async (req , res)=>{
     let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render('listings/show.ejs' , {listing});
})

app.get('/listings' , async (req , res)=>{
    let allListings =await Listing.find();
    res.render('listings/home.ejs' , {allListings})
})

app.get('/' , (req , res)=>{
 res.send('HI I AM ROOT')
})

app.post('/listings' , async (req , res )=>{
    let newListing = new Listing (req.body.listing);
    await newListing.save();
    res.redirect('/listings')
})

app.put('/listings/:id' , async (req , res)=>{
    let {id} = req.params;
     let newlist = await Listing.findByIdAndUpdate(id , {...req.body.listing});
     res.redirect(`/listings/${id}`)
})

app.delete('/listings/:id' , async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
});

app.listen(port , ()=>{
     console.log('app is listening')
})

