

class Sockets {

  constructor( io ) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents () {
    // On Connection
    this.io.on('connection', (socket) => {
      
      console.log('Connected')
      // Todo: Validar el JWT valido && desconectar

      // Saber que usuario esta activo mediante el UID del token

      // Emitir todos los usuarios conectados

      // Socket Join
      
      // Escuchar cuando el cliente manda un mensaje
      // Mensaje personal

      // Disconnect
      socket.on('disconnect', () => {
        console.log('cliente desconectado')
      })

      // Marcar en la base dedatos que el usuario se desconecto

      // Emitir todos los usuarios conectados 
    })
  }

}


module.exports = Sockets