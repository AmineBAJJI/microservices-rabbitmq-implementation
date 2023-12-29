const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Producer = require("./producer");
const producer = new Producer();

app.use(bodyParser.json());

app.post("/sendLog", async (req, res, next) => {
  try {
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send();
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server started...");
});
