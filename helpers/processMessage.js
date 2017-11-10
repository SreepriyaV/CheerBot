
const API_AI_TOKEN = '4a2ba6369f024593b701a4b6117acbfe';
const FACEBOOK_ACCESS_TOKEN = 'EAATlEqIf4W8BAMBp48PadCugUhISW9jZCpZBloTLwP34G7xCqLxGRZBEZA47XUpvpczC2mYKZB3IQdxrc8c55vgELGzjvbPGwZC1ZCHHtp174gV2FUJp0vZCOiszVxoCeCIkWKw8CFgeMlN8H0iZCNpC5DZBifwOJah7NPkh6ZB4stH5QZDZD';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

const apiAiClient = require('apiai')(API_AI_TOKEN);

const sendImage = (senderId, imageUri) => {
    return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: imageUri }
                }
            }
        }
    });
};

const sendJoke = (senderId, jokeText) => {
    console.log("postingngtofb", jokeText);
    return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
             message: { text: jokeText },
        }
    });
};


const sendTextMessage = (senderId, text) => {
    console.log(text);
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        },
    },(error, response) => {
      if (error) {
          console.log('Error sending message: ', error);
      } else if (response.body.error) {
          console.log('Error: ', response.body.error);
      } });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'CheerBot_co'});

   apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        if (response.result.metadata.intentName === 'images.search') {
            sendImage(senderId, result);
        } else if (response.result.metadata.intentName === 'jokes.search') {
            sendJoke(senderId, result);
        }
        
        else {
            sendTextMessage(senderId, result);
        }
    });


    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};