import mongo from 'mongoose';


const orderSchema = new mongo.Schema({
userId:{type:String,require:true},
item:{type:Array,require:true},
amount:{type:Number,require:true},
address:{type:Object,require:true},
status:{type:String,default:"Food Processing"},
date:{type:Date,default:Date.now()},
payment:{type:Boolean,default:false}
})

const orderModel = mongo.models.order || mongo.model("order",orderSchema);

export default orderModel;