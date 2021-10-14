const { usuarioConectado, usuarioDesconectado } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

  constructor( io ) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents () {
    // On Connection
    this.io.on('connection', async (socket) => {
      //console.log(socket.handshake.query['x-token']); // solo se extrae el token que viene en el query
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']) // Regres un arreglo
      if(!valido) {
        console.log('socket no identificado: from Sockets.js')
        return socket.disconnect(); // asi sabemos quien esta conectado por el uid
      }
      await usuarioConectado(uid);
      // Todo: Validar el JWT valido && desconectar

      // Saber que usuario esta activo mediante el UID del token

      // Emitir todos los usuarios conectados

      // Socket Join
      
      // Escuchar cuando el cliente manda un mensaje
      // Mensaje personal

      // Disconnect
      socket.on('disconnect', async () => {        
        await usuarioDesconectado(uid);
      })

      // Marcar en la base dedatos que el usuario se desconecto

      // Emitir todos los usuarios conectados 
    })
  }

}


module.exports = Sockets