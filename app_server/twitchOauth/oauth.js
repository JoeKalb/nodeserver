const fetch = require('node-fetch');
const { CONFIG } = require('./config');


module.exports.grabTwitchData = function(req, res, next){
  let header = new Headers();
  header.append('Accept', 'application/vnd.twitchtv.v5+json');
  header.append('Client-ID', CONFIG.client_id);
  header.append('Authorization', 'OAuth ' + this.state.tokens.access_token);
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
