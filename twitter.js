require('dotenv').load();
const Twit = require('twit');

const t = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

exports.default = (id, twitteruser, searchterm, items) => {
  const text = `Hello there ${twitteruser}, we've found ${items.length} items on buyee that match ${searchterm}. Please go to http://localhost:8000/${id}`;

  t.post('direct_messages/new', {
    screen_name: twitteruser,
    text: encodeURIComponent(text),
  }, (err, data, response) => {
    console.log(response);
  });
};

