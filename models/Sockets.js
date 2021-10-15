const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensajes
} = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

  constructor( io ) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents () {
    // On Connection
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])
      if(!valido) {
        console.log('socket no identificado: from Sockets.js')
        return socket.disconnect();
      }
      await usuarioConectado(uid); // Conexion permitida
      socket.join(uid);

      // Emitir todos los usuarios conectados
      this.io.emit('lista-usuarios', await getUsuarios());
      
      // Escuchar cuando el cliente manda un mensaje
      socket.on('mensaje-personal', async (payload) => {
        const mensaje = await grabarMensajes(payload);
        this.io.to(payload.para).emit('mensaje-personal', mensaje);
        this.io.to(payload.de).emit('mensaje-personal', mensaje);
      })

      // Disconnect
      socket.on('disconnect', async () => {
        await usuarioDesconectado(uid);
        this.io.emit('lista-usuarios', await getUsuarios());
      })

    })
  }

}


module.exports = Sockets