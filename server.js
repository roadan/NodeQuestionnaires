var express = require('express'),
    everyauth = require('everyauth'),
    routes = require('./routes');


//nodequestionnaires


everyauth.azureacs
  .identityProviderUrl('https://nodeqacs.accesscontrol.windows.net/v2/wsfederation/')
  .entryPath('/auth/azureacs')
  .callbackPath('/auth/azureacs/callback')
  .signingKey('fsFZ7kFWosQndob50Fg+h6Jt8CLOyPQUdCZjnq84MY0=')
  .realm('http://nodequestionnaires.com/')
  .homeRealm('') // if you want to use a default idp (like google/liveid)
  .tokenFormat('swt')  // only swt supported for now
  .findOrCreateUser( function (session, acsUser) { 
    return acsUser;
  })
  .redirectPath('/');

  var app = express.createServer(
    express.bodyParser(),
    express.static(__dirname + "/public"),
    express.cookieParser(),
    express.session({ secret: 'l1k2j3h4g5' }),
    express.bodyParser(), 
    express.methodOverride(),
    everyauth.middleware()
);

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});
    
// home page
  app.get('/', function(req, res) {
      res.render('main', { title: 'Language Data Collector', layout:  'layout.jade', everyauth: everyauth });
  });

app.listen(process.env.PORT || 3000);

everyauth.helpExpress(app);