const functions = require('firebase-functions');
const express = require('express');
const cors= require('cors');
const stripe = require('stripe')('sk_test_51JjqsEHTKlZHNvGdA0ZZZjLBcvYrfWdfQqG4ylGAT5zyyP53ZqK1vv5x5Ujjzo3CeL99BxRTpNMPFoBP5YCmJMlk00Gr5ihFGO'); //clva secreta

const app= express();

app.use(cors({
    origin: true
}))

app.use(express.json());

//ruta del pago
//lso pagos se pueden ver en la pagina de stripe
app.post('/payment/create', async(req,res)=>{
    try{
        const {amount, shipping} = req.body;
        const paymentIntent = await stripe.paymentIntent.create({
            shipping,
            amount,
            currency: 'usd'
        })

        res 
        .status(200)
        .send(paymentIntent.client_secret)

    }catch(err){
        res
    .status(500)
.json({
    statusCode: 500,
    message: err.message
})}
})

app.get('*', (req,res)=>{
    res 
    .status(404)
    .send('404, Not found')
})

exports.api = functions.https.onRequest(app);