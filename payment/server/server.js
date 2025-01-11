const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Razorpay = require('razorpay');

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_lp5llVYWLJVEnq',
    key_secret: 'A41UY6aUgOkF4k2tk8qwb6kM'
});

app.post('/create-order', async (req, res) => {
    const { name, email, phone, amount, razorpay_payment_id } = req.body;

    try {
        // Log incoming order details for debugging
        console.log("Received order details:", { name, email, phone, amount, razorpay_payment_id });

        // Create the order in your backend database
        // This is where you save the order details including the payment ID
        const orderDetails = {
            name,
            email,
            phone,
            amount,
            payment_id: razorpay_payment_id,
            order_id: "order_" + new Date().getTime() // Example order ID
        };

        console.log("Saving order details:", orderDetails); // Debug statement
        
        // Save orderDetails in your database here

        res.json({ success: true, order_id: orderDetails.order_id });
    } catch (error) {
        console.error("Error creating order:", error);
        res.json({ success: false, message: 'Failed to create order' });
    }
});

const PORT = 3000; // Change this to 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
