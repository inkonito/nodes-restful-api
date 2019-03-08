var mongoose = require('mongoose')
    , fs = require('fs')
    , models_path = process.cwd() + '/app/models'

console.log("connecting to mongo");
/*
mongoose.Promise = global.Promise;
var db = mongoose.connection;

const options = {
    useMongoClient: true,
    reconnectTries: 1,
    reconnectInterval: 1000,
    bufferMaxEntries: 0,
  };
  const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/angular", options);

db.on('error', function (err) {
    console.log('MongoDB connection error:', err);
}).on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.connect("mongodb://127.0.0.1:27017/angular", options);
}).on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

connection.once('open', function() {
    console.log('MongoDB connection is established');
});
*/

function connect() {
    const options = {
      useMongoClient: true,
    };
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1:27017/angular", options);
    return mongoose.connection;
  }
  connect()
  .on('error', (error) => {
    console.log(`Unable to establish connection to mongodb`, error);
    process.exit(10);
  })
  .on('disconnected', connect)

  .once('open', () => {
    console.log(`Connection to mongodb established`);
  })


fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js'))
        require(models_path + '/' + file)
});