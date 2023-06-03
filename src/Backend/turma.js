// Importando as bibliotecas que serão utilizadas.
const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlcodedParser = bodyParser.urlencoded({ extended: true })

// Inicializando a aplicação.
const app = express();

// Definindo regras gerais da aplicação.
app.use(express.json())
app.use(cors());

// Importando o banco.
const DBPATH = 'bd_nova_freire.db'

// Iniciando a construção de endpoints
// POST /turma
app.post("/turma", urlcodedParser, (req, res) =>{
    // Criando variáveis para receber os dados da requisição.
    const {nome_turma, ano_turma} = req.body

    let db = new sqlite3.Database(DBPATH); // Abrindo o banco de dados.
    const query = "INSERT INTO turma(nome_turma, ano_turma) VALUES(?, ?)"; // Construindo a query para a requisição.

    db.run(query, [nome_turma, ano_turma], (error) =>{
        if (error) {
            res.status(500).json({error: "Erro ao criar turma."})
        }
        return res.status(200).json({
            status: "Turma criada com sucesso."
        })
    })
})


// GET /turma/:id_turma
app.get("/turma/:id_turma", urlcodedParser, (req, res) =>{
    // Pegando o id da turma.
    const id_turma = req.params.id_turma;
    
    // Fazendo a query de seleção.
    const query_selecao = "SELECT * FROM turma WHERE id_turma = ?"
    let db = new sqlite3.Database(DBPATH); // Abrindo o banco.

    db.all(query_selecao, [id_turma], (error, rows) => {
        if (error) {
            res.status(500).json({error: "Erro ao selecionar turma."})
        }
        return res.status(200).json({
            title: "Turma selecionada com sucesso.",    
            data: rows
        });
    });
});


// PUT /turma/:id_turma
app.put("/turma/:id_turma", urlcodedParser, (req, res) =>{
    const {nome_turma, ano_turma} = req.body;
    const id_turma = req.params.id_turma;


    const query = "UPDATE turma SET nome_turma = ?, ano_turma = ? WHERE id_turma = ?";
    let db = new sqlite3.Database(DBPATH);


    db.run(query, [nome_turma, ano_turma, id_turma], (error) =>{
        if (error) {
            res.status(500).json({error: "Erro ao atualizar turma."})
        }
        return res.status(200).json({
            status: "Turma atualizada com sucesso."
        })
    })
})


// DELETE /turma/:id_turma
app.delete("/turma/:id_turma", urlcodedParser, (req, res) => {
    const query_1 = "SELECT rowid, * FROM turma WHERE rowid = ?";

    let db = new sqlite3.Database(DBPATH) // Abrindo o banco de dados.

    const id_turma = req.params.id_turma;

    db.get(query_1, [id_turma], (err, rows) => {
        if (err) {
            res.status(500).json({error: "Erro ao deletar turma."})
        }
        else if(!rows) {
            res.status(404).json({error: "Turma não encontrada."})
        }
    })
    const query = "DELETE FROM turma WHERE rowid = ?";

    db.run(query, [id_turma], (error) => {
        if (error) {
            res.status(500).json({error: "Erro ao deletar turma."})
        }
        return res.status(200).json({
            status: "Turma deletada com sucesso."
        })
    })
})
