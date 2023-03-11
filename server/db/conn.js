const mongoose = require('mongoose');

const DB = 'mongodb+srv://kshipra:mLOqKv24XrYPlZ0g@cluster0.xrnqute.mongodb.net/cloudproject?retryWrites=true&w=majority';

mongoose.connect(DB).then(()=>{
    console.log("Connection successful");
}).catch((err)=>console.log("no connection"));