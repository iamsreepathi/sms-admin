import * as amqp from "amqplib";

export default async function publishMessage(exchange, payload) {
  let connection;
  try {
    connection = await amqp.connect("amqp://admin:secret@localhost");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(payload)));
    console.log(" [x] Sent '%s'", payload);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
}

const payload = {
  id: 1,
  rating: 3,
};
const exchange = "sms";
publishMessage(exchange, payload).then(() => {
  console.log("Message sent.");
});

console.log("Finished");
