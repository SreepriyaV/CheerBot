const request = require('request');

module.exports = (req, res) => {
    if (req.body.result.action === 'joke') {
        const jokeName = req.body.result.parameters['joke_name'];
        const apiUrl = 'https://icanhazdadjoke.com/slack';

        request({
            uri: apiUrl,
            methos: 'GET',
        }, (err, response, body) => {
            const jokeText = JSON.parse(body).attachments[0].text;
console.log("joke",jokeText);
            return res.json({
                speech: jokeText,
                displayText: jokeText,
                source: 'joke_name'
            });
        })
    }
}