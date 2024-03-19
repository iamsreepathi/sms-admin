// import { PrismaClient } from "@prisma/client";
import * as amqp from "amqplib";

const client = new PrismaClient();

async function processMessage(payload) {
  const teacher = await client.teacher.findFirst();
  console.log(teacher);
  console.log(payload);
}

async function subscribe(queue, exchange) {
  try {
    const connection = await amqp.connect("amqp://admin:secret@localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      if (client) await client.$disconnect();
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
          processMessage(payload)
            .then(() => console.log("Message is processed."))
            .catch((err) => {
              console.warn(err);
            });
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for logs. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
    if (client) await client.$disconnect();
  }
}

const queue = "worker1";
const exchange = "sms";
subscribe(queue, exchange);
