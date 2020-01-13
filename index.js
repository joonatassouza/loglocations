const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.get('/log', (req, res) => {
  try {
    var obj = JSON.parse(fs.readFileSync('public/locations.json', 'utf8'));

    const location = JSON.parse(req.query.locations)

    obj.locations.push(location);

    fs.writeFile('public/locations.json', JSON.stringify(obj), 'utf8', () => { console.log('deu certo?') });

    return res.json(location)
  } catch (e) {
    console.log('error grave ');
    console.log(e.message);
    return res.status(500).json(e.message)
  }
});

app.listen(4444);
