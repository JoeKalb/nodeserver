const fetch = require('node-fetch');
const { CONFIG } = require('./config');


module.exports.grabTwitchData = function(req, res, next){
  let call = 'https://api.twitch.tv/kraken/oauth2/token?client_id={client_ID}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={redirect}';
  console.log(CONFIG);
  call = call.replace('{client_ID}', CONFIG.client_id)
				.replace('{client_secret}', CONFIG.client_secret)
				.replace('{code}', req.params.code)
				.replace('{redirect}', CONFIG.redirect_uri);
  let promise = fetch(call, {
    method: "POST"
  }).then((twitchRes) => {
    return twitchRes.json();
  }).then((data) => {
    console.log(data);
    res.json({ data });
  }).catch((err) => {
    console.log(err);
  })
}
