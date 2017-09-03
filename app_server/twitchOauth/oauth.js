const fetch = require('node-fetch');
const { CONFIG } = require('./config');


module.exports.grabTwitchTokens = function(req, res, next){
  console.log(req.params.code);
  let call = 'https://api.twitch.tv/kraken/oauth2/token?client_id={client_ID}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={redirect}';
  call = call.replace('{client_ID}', CONFIG.client_id)
      .replace('{client_secret}', CONFIG.client_secret)
      .replace('{code}', req.params.code)
      .replace('{redirect}', CONFIG.redirect_uri);
  let promise = fetch(call,{
    method: "POST"
  }).then((twitchResponse) => {
    return twitchResponse.json();
  }).then((tokens) => {
    res.status(200).json(tokens);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
}
