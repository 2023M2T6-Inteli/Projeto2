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
// POST /nota
app.post("/nota", urlcodedParser, (req, res) => {
    const {valor_nota, id_aluno, id_questao} = req.body

    const query = "INSERT INTO nota(valor_nota, id_aluno, id_questao) VALUES(?, ?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_nota, id_aluno, id_questao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Nota criada com sucesso."
        })
    })
})


// PUT /nota/:id_nota
app.put("/nota/:id_nota", urlcodedParser, (req, res) => {
    const id_nota = req.params.id_nota;
    const {valor_nota, id_aluno, id_questao} = req.body;

    const query = "UPDATE nota SET valor_nota = ? id_aluno = ? id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_nota, id_aluno, id_questao, id_nota], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Nota atualizada com sucesso."
        })
    })
})

// GET /nota
app.get("/nota", urlcodedParser, (req, res) => {
    const query = "SELECT * FROM alunos";

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        })
    })
})

app.get("/nota/:valor_nota", urlcodedParser, (req, res) => {
    const valor_nota = req.params.valor_nota;

    const query = "SELECT valor_nota >= valor_nota FROM nota";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [valor_nota], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        })
    })
})

// DELETE /nota/:id_nota
app.delete("/nota/:id_nota", urlcodedParser, (req, res) => {
    const id_nota = req.params.id_nota;

    const query_selecao = "SELECT rowid, * FROM nota WHERE id_nota = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_nota], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        else if(!rows) {
            return res.status(404).json({
                title: "Nota não encontrada."
            })
        }
    })
    const query = "DELETE FROM nota WHERE id_nota = ?";

    db.run(query, [id_nota], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Nota deletada com sucesso."
        })
    })
})
