// importar o pacote
const mongoose = require('mongoose');

// definir o esquema "schema"
const usuarioSchema = mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
  
});

// exportar o modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
