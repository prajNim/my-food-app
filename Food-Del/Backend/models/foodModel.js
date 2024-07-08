import mongo from 'mongoose';

const foodSchema = new mongo.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true},
})


const foodModel = mongo.models.food || mongo.model("food",foodSchema)

export default foodModel;