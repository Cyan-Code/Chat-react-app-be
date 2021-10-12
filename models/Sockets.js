

class Sockets {

  constructor( io ) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents () {
    // On Connection
    this.io.on('connection', (socket) => {

      // Todo: Validar el JWT valido && desconectar

      // Saber que usuario esta activo mediante el UID del token

      // Emitir todos los usuarios conectados

      // Socket Join
      
      // Escuchar cuando el cliente manda un mensaje
      // Mensaje personal

      // Disconnect
      // Marcar en la base dedatos que el usuario se desconecto

      // Emitir todos los usuarios conectados 
    })
  }

}


module.exports = Sockets