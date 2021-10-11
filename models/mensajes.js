const {Schema, model} = require('mongoose');


const MensajeSchema = Schema({

  de: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  para: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia a la coleccion creada
    require: true
  },
  mensaje: {
    type: String,
    require: true
  }
},{
  timestamps: true
}
);

MensajeSchema.method('toJSON', function() {
  const{_v, ...object} = this.toObject();
  return object;
});

module.exports = model('Mensaje', MensajeSchema);

