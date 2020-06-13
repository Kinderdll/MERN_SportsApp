const User=require('../models/User');
const bcrypt=require('bcrypt');

module.exports={
    async createUser(req,res){
        try{
            const {firstName,lastName,password,email} = req.body;
           
            const UserExists=await User.findOne({email});
            if(!UserExists) {
                const hashedPassword= await bcrypt.hash(password,10)
                const user=await User.create({
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                });

                return res.json(user)
            }

            return res.status(400).json({
                message:'User/email already exists'
            })


        }
        catch(err){
            throw Error(`Couldnt create User : ${user}`)
        }
    },
    async getUserById (req,res){
        const {userId} =req.params;

        try{
            const user=await User.findById(userId);
            return res.send(user)
        }
        catch(err)
        {
            return res.status(400).json({
                message:'User ID not found'
            })
        }
    }

    
}