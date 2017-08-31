const fetch = require('node-fetch');
require('./config');


module.exports.grabTwitchData = function(req, res, next){
  console.log("Recieved request of: " + req.params.code);
  let call = 'https://api.twitch.tv/kraken/oauth2/token?client_id={client_ID}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={redirect}';
  console.log(call);
  let newCall = call.replace('{client_ID}', CONFIG.client_id)
				.replace('{client_secret}', CONFIG.client_secret)
				.replace('{code}', req.params.code)
				.replace('{redirect}', CONFIG.redirect_uri);
  console.log("URL call: " + newCall);
  let promise = fetch(call, {
    method: "POST"
  }).then((twitchRes) => {
    console.log(twitchRes.json());
    return twitchRes.json();
  }).then((data) => {
    res.json({ data });
  }).catch((err) => {
    console.log(err);
  })
  res.json({is : "here"});
}
