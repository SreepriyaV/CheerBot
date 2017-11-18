
const API_AI_TOKEN = '4a2ba6369f024593b701a4b6117acbfe';
const FACEBOOK_ACCESS_TOKEN = 'EAATlEqIf4W8BAAuVFn6OY6A0mZBAdzJZCaxHhBp7ZASzadUHL8TNvHWqCrq67PSUbl4UloeDGNYldYbCYLvq9XOyCZB3s7PuPFegZAFwKNFET87Dbnv0wBpMoDoMpk1D5eS7KyTCcZBr8Os3jcfmRQg3BuDtaYBUt0nos1nhbu1QZDZD';
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

const sendGif = (senderId, gifUri) => {
    console.log("from front", gifUri)
    return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: gifUri }
                }
            }
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
            if(result=="Sorry, can you say that again?")
                {sendTextMessage(senderId, result);}
            else
            {sendImage(senderId, result);}
        } else if (response.result.metadata.intentName === 'jokes.search') {
            sendJoke(senderId, result);
        }
        else if (response.result.metadata.intentName === 'gifs.search') {
            sendGif(senderId, result);
        }
        
        else {
            sendTextMessage(senderId, result);
        }
    });


    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};