const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({

  nombre: {
    type: String,
    require: true
  },  
  email: {
    type: String,
    require: true,
    uniquie: true
  },
  password: {
    type: String,
    require: true
  },
  online: {
    type: Boolean,
    default: false
  }

});

UsuarioSchema.method('toJSON', function() {
  const{_v, _id, password, ...object} = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Usuario', UsuarioSchema);

