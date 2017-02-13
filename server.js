require('dotenv').load();

const Datastore = require('nedb');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = new Datastore({ filename: './db/watching.db', autoload: true });
const app = express();
app.use(express.static(path.join(`${__dirname}/dist`)));
app.use(bodyParser.urlencoded({ extended: true }));

require('es6-promise').polyfill();
require('isomorphic-fetch');
const htmlToJson = require('html-to-json');
const v = require('voca');

// Get items from buyee
function getBuyeeItems(searchterm) {
  return new Promise((resolve) => {
    function formatPrice(price) {
      const trimmedPrice = v.trim(price);
      return v.substring(trimmedPrice, 0, v.indexOf(trimmedPrice, 'n') + 1);
    }
    function formatLocalPrice(price) {
      const trimmedPrice = v.trim(price);
      return v.replace(v.substring(trimmedPrice, v.indexOf(trimmedPrice, '(')), /\(|\)/g, '');
    }

    const BUYEE_URL = `https://buyee.jp/item/search/query/${searchterm}?translationType=1`;
    const buyeeItems = [];

    fetch(BUYEE_URL)
      .then(response => response.text())
      .then((body) => {
        htmlToJson.parse(body, ['.product_whole', {
          link: $doc => $doc.find('a').attr('href'),
          image: $doc => $doc.find('img.product_image').attr('src'),
          bids: $doc => $doc.find('.buyeeicon-bids').text(),
          title: $doc => $doc.find('.product_title').text(),
          price: $doc => $doc.find('.product_price').text(),
          buyout: $doc => $doc.find('.product_bidorbuy').text(),
          remaining: $doc => $doc.find('.product_remaining').text(),
        }]).done((items) => {
          items.forEach((item) => {
            const trimmedTitle = v.trim(item.title);
            const price = formatPrice(item.price);
            const localPrice = formatLocalPrice(item.price);

            let buyout = null;
            let localBuyout = null;
            if (!item.buyout.includes('ー')) {
              buyout = formatPrice(item.buyout);
              localBuyout = formatLocalPrice(item.buyout);
            }

            const buyeeItem = {
              link: `http://buyee.jp${item.link}`,
              image: item.image,
              bids: item.bids,
              title: trimmedTitle,
              price,
              localPrice,
              buyout,
              localBuyout,
              remaining: item.remaining,
            };

            buyeeItems.push(buyeeItem);
          });

          resolve(buyeeItems);
        });
      });
  });
}

// CRON JOB for Buyee
const CronJob = require('cron').CronJob;
const twitterBot = require('./twitter');

new CronJob('00 * * * * *', () => { //eslint-disable-line
  console.log('running cron');
  db.find({}, (err, watchlists) => {
    watchlists.forEach((watchlist) => {
      getBuyeeItems(watchlist.searchterm).then((items) => {
        const newWatchlist = {
          searchterm: watchlist.searchterm,
          twitter: watchlist.twitter,
          items,
        };
        db.update({ _id: watchlist._id }, newWatchlist, {}, (error) => { //eslint-disable-line
          if (error) throw error;
          twitterBot(watchlist._id, watchlist.twitter, watchlist.searchterm, items); // eslint-disable-line
        });
      });
    });
  });
}, null, true, 'Europe/London');

// API Watchlist
app.get('/api/watchlist/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, watchlist) => {
    if (err) throw err;
    res.json(watchlist);
  });
});

app.post('/api/watchlist', (req, res) => {
  let twitteruser = req.body.twitter;
  if (!twitteruser) {
    twitteruser = null;
  } else if (twitteruser.includes('@')) {
    twitteruser = twitteruser.replace('@', '');
  }

  const searchterm = req.body.searchterm;
  getBuyeeItems(searchterm).then((items) => {
    db.insert({
      searchterm,
      twitter: twitteruser,
      items,
    }, (err, watchlist) => {
      if (err) throw err;
      res.redirect(`/${watchlist._id}`); //eslint-disable-line
    });
  });
});

app.get('/api/watchlist/delete/:id', (req, res) => {
  // Find the id and delete it
  db.findOne({ _id: req.params.id }, (err, item) => {
    if (err) throw err;
    db.remove({ _id: item._id }, {}, (error) => { //eslint-disable-line
      if (error) throw error;
      res.redirect('/');
    });
  });
});

// SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(3000);
