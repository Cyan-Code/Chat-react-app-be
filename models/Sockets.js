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
      //console.log(socket.handshake.query['x-token']); // solo se extrae el token que viene en el query
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']) // Regres un arreglo
      if(!valido) {
        console.log('socket no identificado: from Sockets.js')
        return socket.disconnect(); // asi sabemos quien esta conectado por el uid
      }
      await usuarioConectado(uid); // Conexion permitida
      // Todo: Validar el JWT valido && desconectar

      // Unir al usuario a una sala de chat (generalmente se ingresan mas de una persona)
      socket.join(uid); // el nombre de la sala es el uid del user

      // Saber que usuario esta activo mediante el UID del token

      // Emitir todos los usuarios conectados
      this.io.emit('lista-usuarios', await getUsuarios()) // Mirar porque aqui tiene el await (espere al prodictode esta funcion)

      
      // Escuchar cuando el cliente manda un mensaje
      socket.on('mensaje-personal', async (payload) => {
        const mensaje = await grabarMensajes(payload); // Si la funcion es resulve una promesa debo esperarla donde sea que la invoque
        this.io.to(payload.para).emit('mensaje-personal', mensaje) // Enviando el mensaje a la sala especifica (que recibo)
        this.io.to(payload.de).emit('mensaje-personal', mensaje) // Enviando el mensaje a la sala especifica (que envio)
      })

      // Disconnect
      socket.on('disconnect', async () => {        
        await usuarioDesconectado(uid);
        this.io.emit('lista-usuarios', await getUsuarios()) // para refrescar en tiempo real cuando un usuario se desconecta
      })

      // Marcar en la base dedatos que el usuario se desconecto

      // Emitir todos los usuarios conectados 
    })
  }

}


module.exports = Sockets