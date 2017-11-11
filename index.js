const express = require("express");
const bodyParser = require("body-parser");


const app = express();

const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");
const searchController = require('./controllers/search');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log(" Webhook Server listening to , port 5000"));

app.get("/", verificationController);
app.post("/", messageWebhookController);
app.post('/search', searchController);

