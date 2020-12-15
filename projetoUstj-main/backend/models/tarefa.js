// importar o pacote
const mongoose = require('mongoose');

// definir o esquema "schema"
const tarefaSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataConclusao: { type: Date, required: true },
    dataCadastro: { type: Date, required: true },
    idUsuario: { type: String, required: true }
});

// exportar o modelo
module.exports = mongoose.model('Tarefa', tarefaSchema);
