// modules =================================================
var express = require('express');

var app = express();
//app.disable('x-powered-by');
var browserSync = require('browser-sync');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jsforce = require('jsforce');

// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 5004; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
// pass our application into our routes

var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://test.salesforce.com'
});
conn.login('ajeet.kumar@utilitarianlab.com.los', 'ajeet@2022', function(err, userInfo) {
    if (err) {
        console.log('Errorr::'+err);
         return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
});

require('./app/routes')(app, conn);


app.get('/api/list_user', async function(req, res) {
    var records = [];
    await conn.query("SELECT Id, Name FROM Account", function(err, result) {
        if (err) { return console.error(err); }
        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
        for (var i = 0; i < result.records.length; i++) {
            console.log("total : " + result.records[i].Name);
        }
        res.send(JSON.stringify(result.records));
        //return result.records;
    });

    //res.send(JSON.stringify(result.records));
    //res.send('asdf');
    //res.send(JSON.stringify({ value: 1 }));

})

// start app ===============================================
app.listen(process.env.PORT || 5003);
/*const host = '0.0.0.0';
const porttttt = process.env.PORT || 5000;
app.listen(porttttt, host, function() {
    console.log("Server started.......");
  });*/
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose 