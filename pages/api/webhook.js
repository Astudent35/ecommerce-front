import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";

const endpointSecret = "whsec_9f25553149702c8947d47fe16e1b956cef73408441854783c7538857a9ed73aa";

console.log("webhooking")

export default async function handler(req, res) {
  console.log("Handler function invoked");
  await mongooseConnect();
  
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    console.log(event);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log(`Received event: ${event}`);
  console.log(`Received event_type: ${event.type}`);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
        console.log(`Order ${orderId} marked as paid.`);
      } else {
        console.log(`Order ID or payment status missing for event: ${event.id}`);
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {
    bodyParser: false,
  },
};