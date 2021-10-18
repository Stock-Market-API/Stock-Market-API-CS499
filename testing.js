const Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'PkKseo3f5GALlC6FbYTPof2xofIOOOqxsfeIJ2Lx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '2FokkUXZSKpMu65pSht3JHfeaGUKcwmbg4E5ISJ3';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

async function getstocks(){


// ================ Gets the user object Testing ================================
const OwnerQuery = new Parse.Query('User');
OwnerQuery.equalTo('username', 'Dibba');
const Owner = await OwnerQuery.first();


// ================ Update Testing ================================
const stockQuery = new Parse.Query('Portfolio')
stockQuery.equalTo('stockOwner', Owner);
stockQuery.equalTo('stockName', 'TSLA');
const stockResult = await stockQuery.find()
for(let result of stockResult){
    console.log(result.get('stockName'));
    console.log(result.get('sharesBought'));
    result.set('sharesBought', 200);
    result.save().then((result) => {
    console.log(result.get('sharesBought'));
    });
}

// ================ READ Testing ================================
const portfolioQuery = new Parse.Query('Portfolio');
portfolioQuery.equalTo('stockOwner', Owner);
let queryResults = await portfolioQuery.find();

// Let's show the results
for (let result of queryResults) {
  // You access `Parse.Objects` attributes by using `.get`
  console.log(result.get('stockName'));
}
}

getstocks();