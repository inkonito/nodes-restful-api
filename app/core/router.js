var restify = require('restify')
    , fs = require('fs'),
    corsMiddleware = require('restify-cors-middleware')


var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  })

var server = restify.createServer();

server
    .use(restify.plugins.fullResponse())
    .use(restify.plugins.bodyParser())
    .pre(cors.preflight)
    .use(cors.actual)

// Tire Start
server.get("/tires", controllers.tire.listTires)
server.post("/tires", controllers.tire.createTire)
server.put("/tires/:id", controllers.tire.updateTire)
server.del("/tires/:id", controllers.tire.deleteTire)
server.get("/tires/:id", controllers.tire.viewTire)


var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })