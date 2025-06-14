const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js');

const MongoURL = 'mongodb://127.0.0.1:27017/airbnb'


main().then((res)=>{
    console.log('connected to DB')
}).catch((err) =>{
  console.log(err)
})
async function main(){
    await mongoose.connect(MongoURL)
}

const initDB =async ()=>{
    await Listing.insertMany(initData.data)

}
initDB();