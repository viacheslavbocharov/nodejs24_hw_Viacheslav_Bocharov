const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/message', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('http://localhost:3001/message-recieve', { message });
        res.send('Message sent to Consumer!');
    } catch (error) {
        res.status(500).send('Error sending message to Consumer');
    }
});

app.listen(port, () => {
    console.log(`Producer is listening on port ${port}`);
});
