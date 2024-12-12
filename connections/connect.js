const mongoose = require('mongoose')

const mongoDbConnection = (url)=>{
    mongoose.connect(url)
    .then(()=>{
        console.log('mongoDB connection successfully');
    }).catch((err)=>{
        console.log('connection refuse with mongoDB ' , err)
    })
}

module.exports = {mongoDbConnection};