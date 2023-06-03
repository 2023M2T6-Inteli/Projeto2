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
// POST /desempenho
app.post("/desempenho", urlcodedParser, (req, res) => {
    const {valor_desempenho, id_aluno, id_habilidade} = req.body;

    const query = "INSERT INTO desempenho (valor_desempenho, id_aluno, id_habilidade) VALUES (?, ?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_desempenho, id_aluno, id_habilidade], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Desempenho adicionado com sucesso."
        })
    })
})


// GET /desempenho/id_desempenho
app.get("/desempenho/:id_desempenho", urlcodedParser, (req, res) => {
    const id_desempenho = req.params.id_desempenho;

    const query = "SELECT rowid, * FROM desempenho WHERE id_desempenho = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_desempenho], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Desempenho encontrado.",
            data: rows
        })
    })
})


// PUT /desempenho/:id_desempenho
app.put("/desempenho/:id_desempenho", urlcodedParser, (req, res) => {
    const id_desempenho = req.params.id_desempenho;
    const {valor_desempenho, id_aluno, id_habilidade} = req.body

    const query = "UPDATE desempenho SET valor_desempenho = ? id_aluno = ? id_habilidade = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_desempenho, id_aluno, id_habilidade, id_desempenho], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Desempenho atualizado com sucesso."
        })
    })
})

// DELETE /desempenho/:id_desempenho
app.delete("/desempenho/:id_desempenho", urlcodedParser, (req, res) => {
    const id_desempenho = req.params.id_desempenho;

    const query_selecao = "SELECT rowid, * FROM desempenho WHERE id_desempenho = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_desempenho], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        else if(!rows) {
            return res.status(404).json({
                title: "Desempenho não encontrado."
            })
        }
    })
    const query = "DELETE FROM desempenho WHERE id_desempenho = ?";
    db.run(query, [id_desempenho], (error) => {
        if(error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Desempenho deletado com sucesso."
        })
    })
})