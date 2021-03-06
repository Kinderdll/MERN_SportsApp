const Event = require('../models/Event');
const User= require('../models/User');
module.exports={
    async createEvent(req,res){
        const {title,description,price} =req.body;
        const {user_id} = req.headers;
        const {filename} = req.file

        const user=await User.findById(user_id);
        if(!user){
            return res.status(400).json({message: 'User doesnt exists'})
        }

        const event =await Event.create({
            title,
            description,
            price,
            user:user_id,
            thumbnail:filename
        })

        return res.json(event);
    },

    async getEventById(req,res){
        const {eventId}=req.params;
        const event =await Event.findById(eventId);
        if(!event){
            return res.status(400).json({message:'Event doesnt exists'})
        }
        else{
            return res.json(event);
        }
    }
}