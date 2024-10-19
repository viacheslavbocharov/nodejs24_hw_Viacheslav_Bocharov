const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();
const port = 3002;
const queue = 'message_queue';

app.post('/queue-establish', (req, res) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, { durable: false });
            console.log(`Waiting for messages in queue: ${queue}`);
          
            channel.consume(queue, (msg) => {
                console.log(`Received message: ${msg.content.toString()}`);
            }, { noAck: true });
        });
    });

    res.send('Service D is listening for messages...');
});

app.listen(port, () => {
    console.log(`Service D is running on port ${port}`);
});
