const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    assignedCode:{
        type:String,
        require:true
    },
    UserProvidedUrl:{
        type:String,
        require:true
    },
    UrlByServer:{
        type:String,
        require:true
    }
})

const appModel = mongoose.model('userUrlData',appSchema);

module.exports = appModel