const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    console.log("Request Body:", req.body);
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            console.log("Order created for new user:", req.body.email);
            res.status(200).json({ success: true });
        } else {
            await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
            console.log("Order updated for existing user:", req.body.email);
            res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        if (myData) {
            res.json({ orderData: myData.order_data });
        } else {
            res.json({ orderData: [] });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
