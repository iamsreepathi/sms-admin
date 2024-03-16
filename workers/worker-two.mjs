import * as amqp from "amqplib";

async function subscribe(queue, exchange) {
  try {
    const connection = await amqp.connect("amqp://admin:secret@localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
      console.log("Terminating worker");
    });

    await channel.assertExchange(exchange, "fanout", { durable: false });
    await channel.assertQueue(queue, { exclusive: true });
    await channel.bindQueue(queue, exchange, "");

    await channel.consume(
      queue,
      (message) => {
        if (message) {
          const payload = JSON.parse(message.content.toString());
          console.log(payload);
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for logs. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
}

const queue = "worker2";
const exchange = "sms";
subscribe(queue, exchange);
