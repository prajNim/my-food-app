import orderModel from "../models/orderModel.js";
//import Stripe from "stripe";
import userModel from "../models/UserModel.js";

//const stripe = new Stripe(process.env.STRIPE_SECERET_KEY);

//placing user order form frontend
const placeOrder = async (req, res) => {

    const frontend_URL = 'http://localhost:5173';
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            item: req.body.item,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // const line_items = req.body.items.map((item) => ({
        //     price_data: {
        //         currency: currency,
        //         product_data: {
        //             name: item.name
        //         },
        //         unit_amount: item.price * 100 
        //     },
        //     quantity: item.quantity
        // }))

        // line_items.push({
        //     price_data: {
        //         currency: currency,
        //         product_data: {
        //             name: "Delivery Charge"
        //         },
        //         unit_amount: deliveryCharge * 100
        //     },
        //     quantity: 1
        // })

        // const session = await stripe.checkout.sessions.create({
        //     success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
        //     line_items: line_items,
        //     mode: 'payment',
        // });
      

        res.json({ success: true, session_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
//users orders for forenend

const userOrder = async(req,res) => {
try {

    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
    
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}

}

//listing orders for admin panel
const listOrders = async(req,res) =>{
try {
  
const orders = await orderModel.find({});
res.json({success:true,data:orders})


} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}

}




const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    res.json({ success: false, message: "Not  Verified" });
  }
};

//updating the order status
const updateStatus = async (req, res) => {
  console.log(req.body);
  try {
      await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
      res.json({ success: true, message: "Status Updated" })
  } catch (error) {
      res.json({ success: false, message: "Error" })
  }

}


export { placeOrder, verifyOrder ,userOrder ,listOrders,updateStatus};
