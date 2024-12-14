const mongoose = require('mongoose')

const mongoDbConnection = (url)=>{
    mongoose.connect(url)
    .then(()=>{
        console.log('Mongodb connect successfully with',process.env.DB_CONNECT_LOCALHOST==='true'?'{localhost}':'{atlas cloud}');
    }).catch((err)=>{
        console.log('connection refuse with mongoDB ' , err)
    })
}

module.exports = {mongoDbConnection};