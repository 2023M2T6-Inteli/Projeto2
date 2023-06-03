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
// POST avaliacao
app.post("/avaliacao", urlcodedParser, (req, res) => {
    const {nome_avaliacao, data} = req.body;

    const query = "INSERT INTO avaliacao(nome_avaliacao, data) VALUES (?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_avaliacao, data], (error) => {
        if(error) {
            throw new Error(error)
        }
        return res.status(200).json({
            title: "Avaliação cadastrada com sucesso."
        })
    })
})

// PUT avaliacao/:id_avaliacao
app.put("/avaliacao/:id_avaliacao", urlcodedParser, (req, res) => {
    const {nome_avaliacao, data} = req.body;
    const id_habilidade = req.params.id_avaliacao;

    const query = "UPDATE avaliacao SET nome_avaliacao = ? data = ? WHERE id_avaliacao = ?"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_avaliacao, data, id_habilidade], (error) => {
        if(error) {
            res.status(500).json({
                title: "Não foi possível atualizar o usuário."
            })
        }
        return res.status(200).json({
            title: "Usuário atualizado com sucesso."
        })
    })
})

// GET /avaliacao/:id_avaliacao
app.get("/avaliacao/:id_avaliacao", urlcodedParser, (req, res) => {
    const id_avaliacao = req.params.id_avaliacao;

    const query = "SELECT rowid, * FROM avaliacao WHERE id_avaliacao = ?"
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_avaliacao], (error, rows) => {
        if (error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Avaliação pega com sucesso.",
            data: rows
        })
    })
})

// GET /avaliacao
app.get("/avaliacao", urlcodedParser, (req, res) => {
    const id_avaliacao = req.params.id_avaliacao;

    const query = "SELECT * FROM avaliacao";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [id_avaliacao], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Avaliações pegas com sucesso.",
            data: rows
        })
    })
})

// DELETE /avaliacao/:id_avaliacao
app.delete("/avaliacao/:id_avaliacao", urlcodedParser, (req, res) => {
    const id_avaliacao = req.params.id_avaliacao;

    const query_selecao = "SELECT rowid, * FROM avaliacao WHERE id_avaliacao = ?"
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_avaliacao], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        else if(!rows) {
            res.status(200).json({
                title: "Avaliação não encontrada."
            })
        }
    })
    
    const query = "DELETE FROM avaliacao WHERE id_avaliacao = ?";
    db.run(query, [id_avaliacao], (error) => {
        if(error) {
            res.status(500).json({
                title: "Impossivel deletar usuário."
            })
        }
        return res.status(200).json({
            title: "Usuário deletado com sucesso."
        })
    })
})