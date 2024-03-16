import * as amqp from "amqplib";

export default async function publishMessage(queue, payload) {
  let connection;
  try {
    console.log(process.env.RABBITMQ_URL);
    connection = await amqp.connect("amqp://admin:secret@localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    // NB: `sentToQueue` and `publish` both return a boolean
    // indicating whether it's OK to send again straight away, or
    // (when `false`) that you should wait for the event `'drain'`
    // to fire before writing again. We're just doing the one write,
    // so we'll ignore it.
    channel.sendToQueue(queue, Buffer.from(payload));
    console.log(" [x] Sent '%s'", payload);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
}
