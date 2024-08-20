const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/submit-form', (req, res) => {
    const data = req.body;
    const fileName = `${Date.now()}_${data.name.replace(/\s+/g, '_')}.json`;
    const filePath = path.join(__dirname, 'submissions', fileName);

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while saving the data.' });
        } else {
            res.json({ message: 'Form submitted successfully!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});