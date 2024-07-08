import mongo from 'mongoose';

const userSchema = new mongo.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    cartData:{type:Object,default:{}}
} , {minimize:false})


const userModel = mongo.models.user || mongo.model("user",userSchema);


export default userModel;