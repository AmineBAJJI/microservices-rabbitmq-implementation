const amqp = require("amqplib");

async function consumeMessages() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange("logExchange", "direct");

    const q = await channel.assertQueue("WarningAndErrorsQueue");

    await channel.bindQueue(q.queue, "logExchange", "Warning");
    await channel.bindQueue(q.queue, "logExchange", "Error");

    channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content);
      console.log(data);
      channel.ack(msg);
    });
  } catch (connectionError) {
    console.error("Error connecting to AMQP server:", connectionError);
  }
}

consumeMessages();
