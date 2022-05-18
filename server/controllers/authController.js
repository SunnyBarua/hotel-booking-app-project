import jwt from "jsonwebtoken"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/userModel.js"
const register=catchAsyncErrors(async(req,res)=>{
    console.log(req.body)
    const {name,email,password}=req.body

    if(!name) return res.status(400).send("Name is required!")
    if(!password || password.length <6) return res.status(400).send("Password is required and should be min 6 characters long!")

    let userExist=await User.findOne({email}).exec()
    if (userExist) {
        return res.status(400).send("Email is taken")
    }
    const user=new User(req.body)

    await user.save();
    console.log("USER CREATED",user)
    return res.json({ ok: true })
})

const login=catchAsyncErrors(async(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body

    let user=await User.findOne({email}).exec()
    console.log("USER Exist!!",user)

    if(!user) res.status(400).send("User with that email not found!!")

    user.comparePassword(password,(err,match)=>{
        console.log("Compare Password in login err",err)
        if(!match || err) return res.status(400).send("Wrong Password")
        console.log("GENERATE A TOKEN THEN SEND A RESPONSE TO CLIENT")
        let token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d',
        })
        res.json({
            token,
            user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            stripe_account_id:user.stripe_account_id,
            stripe_seller:user.stripe_seller,
            stripeSession:user.stripeSession
        }})

    })

})

const allUsers=async(req,res)=>{
    const users=await User.find({})
    res.json(users)
}

const deleteUser=async(req,res)=>{
    console.log(req.params.userId);
    let deletedUser=await User.findByIdAndDelete(req.params.userId).exec();
    res.json(deletedUser);
}

const getUserProfile=catchAsyncErrors(async(req,res)=>{
    
    const user=await User.findById(req.user._id)
    console.log("USER INFO",user)
    if(user){
        res.json({ 
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            stripe_account_id:user.stripe_account_id,
            stripe_seller:user.stripe_seller,
            stripeSession:user.stripeSession
        })

    }

    else{
        res.status(404)
        throw new Error('User not found!')
    }
    
})

export {
    register, login, allUsers, deleteUser, getUserProfile
}

