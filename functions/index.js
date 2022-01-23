const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51K1wDdSGyflrBEBDtqMQgUAshSZvi1K2acbLXbWQGS6GM4ADZPjVthDEp5gLfYgWg1xF8mqts6CZtI3s4cV0SK0u00NgYlL8Vv"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_resquest, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved !!!", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_Secret,
  });
});
exports.api = functions.https.onRequest(app);
