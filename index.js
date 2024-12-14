const express =  require('express');
const {mongoDbConnection} = require('./connections/connect');
const cors = require('cors');

// import route file
const appRoute = require('./routes/appRoute');

// connection to mongoDb database
mongoDbConnection('mongodb://127.0.0.1:27017/UrlShortener');



// configure app server
const app = express();
app.use(express.json());


// setup cores for server request
const allowedServer = ['http://localhost:3000','https://vishalkumar07.me']

app.use(cors({
    origin(origin,callback){
        if(!origin || allowedServer.indexOf(origin) !== -1){
            callback(null,true);
        }else{
            callback(new Error('Cors not allow for this origin'));
        }
    },
    credentials:true
}))

// setup default router
app.get('/default',(req,res)=>{
    try{
        res.status(200).json({msg:'we are live now'});
    }catch(err){
        res.status(400).json({msg:'internal server errors'});
    }
})

// setup customized router
app.use('/',appRoute);

// setup default port
const PORT = 8001;


// make server listen on default port
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})