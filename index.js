const line = require('@line/bot-sdk');

const client = new line.Client({
    channelAccessToken: process.env.ACCESS_TOKEN
    
});

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log(req);

    if (req.query.message || (req.body && req.body.events)) {
        if (req.body && req.body.events[0]) {
            message = {
                type: "text",
                text: req.body.events[0].message.text
            }
            console.log(message);
            if (req.body.events[0].replyToken) {
                client.replyMessage(req.body.events[0].replyToken, message);
            }
        }
        else {
            context.res = {
                status: 200,
                body: req.query.message
            };
        }
    }
    else {
        context.res = {
            status: 200,
            body: "Please check the query string in the request body"
        };
    };
};
