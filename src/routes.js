const express=require('express');
const multer=require('multer');

const UserContoller=require('./controllers/UserController');
const EventController=require('./controllers/EventController');

const Router=express.Router();
const uploadConfig=require('./config/upload');
const uploader=multer(uploadConfig)


Router.get('/status',(req,res)=>{
    res.send({status:200})
});

//Event
Router.get('/event/:eventId',EventController.getEventById)
Router.post('/event', uploader.single("thumbnail"),EventController.createEvent)



//User
Router.post('/user/register',UserContoller.createUser)
Router.get('/user/:userId', UserContoller.getUserById)

module.exports=Router;

