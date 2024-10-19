const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();
const port = 3001;
const queue = 'message_queue';

app.use(express.json());

app.post('/message', (req, res) => {
    const { message } = req.body;

    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`Sent message: ${message}`);
        });
    });

    res.send('Message sent to queue');
});

app.listen(port, () => {
    console.log(`Service C is running on port ${port}`);
});
