const GETTY_IMAGES_API_KEY = 'kaeje9nsqmtk3y3regg6kfvk';

const request = require('request');

module.exports = (req, res) => {
    if (req.body.result.action === 'image') {
        const imageName = req.body.result.parameters['image_name'];
        const apiUrl = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=' + imageName;

        request({
            uri: apiUrl,
            methos: 'GET',
            headers: {'Api-Key': GETTY_IMAGES_API_KEY}
        }, (err, response, body) => {
            const imageUri = JSON.parse(body).images[0].display_sizes[0].uri;
console.log("img",imageUri);
            return res.json({
                speech: imageUri,
                displayText: imageUri,
                source: 'image_name'
            });
        })
    }

    else  if (req.body.result.action === 'joke') {
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