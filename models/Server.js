// Servidor de express
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path');
const Sockets = require('./Sockets');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Coneccion DB
    dbConnection()

    // Http server
    this.server = http.createServer(this.app)

    // Configuracion de Sockets
    this.io = socketio(this.server, {cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }});
  }

  middelwares () {
    this.app.use( express.static( path.resolve(__dirname, '../public') ) )
    // CORS
    this.app.use( cors() )
  }

  consgurarSockets() {
    new Sockets( this.io );
  }

  execute() {
    // inicializar middelwares()
    this.middelwares();

    // Inicializar sockets
    this.consgurarSockets()

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en 8080', this.port);
    });
  }

}


module.exports = Server
