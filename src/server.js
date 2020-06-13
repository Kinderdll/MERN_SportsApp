const express =require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
const PORT=process.env.PORT || 8000;
const cors=require('cors');
const Router=require('./routes');
if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

//Server Config

app.use(cors());
app.use(express.json())




try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log('MongoDB connected ')
}
catch{

}
app.use("/files", express.static(path.resolve(__dirname, "..","files")))
app.use(Router);
app.listen(PORT,()=>{console.log(`Listening on ${PORT}`)})