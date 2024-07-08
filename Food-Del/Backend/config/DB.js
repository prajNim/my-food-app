import mongo from 'mongoose';

export const connectDB = async () => {

    await (await mongo.connect('mongodb+srv://prajaktanimbalkar04:test1234@cluster0.ryarmxz.mongodb.net/food-del')).isObjectIdOrHexString(()=>console.log('DB Connected'))
}