const express = require('express');
const app = express();
const port = 3001;


app.use(express.json());

app.post('/message-recieve', (req, res) => {
    const { message } = req.body;
    console.log(`Message received: ${message}`);
    res.send('Message received!');
});

app.listen(port, () => {
    console.log(`Consumer is listening on port ${port}`);
});
