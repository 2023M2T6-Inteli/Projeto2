// Importando as bibliotecas necessárias.
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors")
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })



// Inicializando a aplicação.
const app = express();

// Definindo as regras gerais.
app.use(express.json())
app.use(cors())


// Importando o banco de dados.
const DBPATH = 'data/bd_nova_freire.db'


// Criando endpoints
// POST /professor
app.post("/professor",  urlencodedParser,(req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body // Pegando os itens da requisição

    let db = new sqlite3.Database(DBPATH) // Abre o banco
    const query = "INSERT INTO professor(nome_professor, email, senha, cargo, celular, cep, idade) VALUES(?, ?, ?, ?, ?, ?, ?)";
    
    db.run(query, [nome_professor, email , senha, cargo, celular, cep, idade], (error) => { // Fazendo a query com os itens da requisição
        if (error) {
            throw new Error(error) // Travando o sistema e trazendo informações sobre o erro.
        }
        return res.status(201).json({ // Retornando o status de itens criados 
            title: "Professor criado com sucesso" // Mostrando um json com a resposta.
        })
    })
})

// PUT /professor
app.put("/professor/:id", urlencodedParser, (req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body

    // Pegando os dados do backend
    let db = new sqlite3.Database(DBPATH)
    const query = "UPDATE professor SET nome_professor = ?, email = ?, senha = ?, cargo = ?, celular = ?, cep = ?, idade = ? WHERE id_professor = ?"

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade, req.params.id_professor], (error) => {
        if (error) {
            throw new Error(error)
        }
        return res.status(200).json({
            title: "Professor atualizado com sucesso."
        })
    })
})

// get /professor:id_professor
app.get("/professor", urlencodedParser, (req, res) => {
    
    let db = new sqlite3.Database(DBPATH)

    const query = "SELECT id_professor, * FROM professor WHERE id_professor = ?"

    db.get(query, [req.params.id_professor], (error, rows) => {
        if(error) {
            throw new Error(error)
        }

        return res.status(200).json({
            title: "Pofessor pegado com sucesso.",
            professor: rows
        })
    })
})

// get/aluno/:id_aluno Selecionando um aluno em especifico e rebendo os dados.
app.get("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH)

    const query_select = "SELECT id_aluno, * FROM aluno WHERE id_aluno = ?"
    
    db.get(query_select, (error, rows) => {
        throw new Error(error);
    })
    return res.status(200).json({
        title: "Aluno retornado com sucesso.",
        aluno: rows
    })
})

app.put("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH)

    const {nome_aluno, situacao, forcas, defasagens} = req.body

    const query = "UPDATE aluno SET nome_aluno = ?, situacao = ?, forcas = ?, desafagens = ? WHERE id_aluno = ?"

    db.run(query, [nome_aluno, situacao, forcas, defasagens], (error) => {
        if(error) {
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Aluno atualizado com sucesso."
        })
    })
})


const port = 3000

// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})