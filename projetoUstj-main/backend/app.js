// importar pacotes necessários
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importar modelos
const Tarefa = require('./models/tarefa');
const Usuario = require('./models/usuario');

// efetuar a conexão com o mongodb na cloud
mongoose.connect('mongodb+srv://user_base:senha_user@cluster0.69cnq.mongodb.net/app-mean?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log("Conexão ok")
    }).catch((err) => {
        console.log("Sem conexão");
        console.log(err);
    });

app.use(bodyParser.json()); // converte o corpo das requisições para json

app.use((req, res, next) => { // adiciona headers para habilitar o CORS (Cross-Origin Resource Sharing)
    console.log(':D');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Endpoint para consultar as tarefas de um determinado usuário
app.get('/api/tarefas/:idUsuario', (req, res, next) => {
    const idUsuario = req.params.idUsuario;
    Tarefa.find({ idUsuario: idUsuario }).then((tarefas) => {
        res.status(200).json({ mensagem: 'Tarefas consultadas com sucesso', tarefas: tarefas });
    });
});

// Endpoint para adicionar uma nova tarefa
app.post('/api/tarefas', (req, res, next) => {
    console.log(req.body);
    const tarefa = new Tarefa({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        dataConclusao: req.body.dataConclusao,
        dataCadastro: req.body.dataCadastro,
        idUsuario: req.body.idUsuario
    });

    tarefa.save((err, doc) => {
        res.status(201).json({ mensagem: 'Tarefa inserido com sucesso!', id: tarefa._id });
    });
});

// Endpoint para atualizar uma tarefa
app.put('/api/tarefas/:id', (req, res, next) => {
    const tarefa = new Tarefa({
        _id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        dataCadastro: req.body.dataCadastro,
        dataConclusao: req.body.dataConclusao,
        idUsuario: req.body.idUsuario
    });
    Tarefa.updateOne({ _id: req.params.id }, tarefa).then(() => {
        res.status(200).json({ mensagem: 'Atualização realizada com sucesso!' });
    });

});

// Endpoint para deletar uma tarefa
app.delete('/api/tarefas/:id', (req, res, next) => {
    console.log(req.params);
    Tarefa.findByIdAndDelete(req.params.id, (err, doc) => {
        res.status(200).end();
    });
});

// Endpoint para efetuar o login
app.post('/api/login', (req, res, next) => {
    const usuario = new Usuario({
        email: req.body.email,
        senha: req.body.senha,
    });

    Usuario.findOne({ email: req.body.email, senha: req.body.senha }, ((err, doc) => {
        if (doc != null) {
            res.status(200).json(doc);
        } else {
            res.status(401).end();
        }
    }));
});

// Endpoint para cadastrar um usuário
app.post('/api/usuarios', (req, res, next) => {
    const usuario = new Usuario({
        email: req.body.email,
        senha: req.body.senha
    });

    usuario.save((err, doc) => {
        res.status(201).json({ mensagem: 'Usuário inserido com sucesso!', id: usuario._id });
    });
})

// exporta a API
module.exports = app;