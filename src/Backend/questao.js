// Importando as bibliotecas que serão utilizadas.
const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlcodedParser = bodyParser.urlencoded({ extended: true })

// Inicializando a aplicação.
const router = express.Router();

// Definindo regras gerais da aplicação.
router.use(express.json())
router.use(cors());

// Importando o banco.
const DBPATH = 'bd_nova_freire.db'

// Iniciando a construção de endpoints
// POST /questao
router.post("/", urlcodedParser, (req, res) => {
    const {numero, id_avaliacao} = req.body;
    
    const query = "INSERT INTO questao(numero, id_avaliacao) VALUES(?, ?)";
    let db = new sqlite3.Database(DBPATH);
    
    db.run(query, [numero, id_avaliacao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão criada com sucesso."
        });
    });
});

// PUT /questao/id_questao
router.put("/:id_questao", urlcodedParser, (req, res) => {
    const {numero} = req.body;
    const id_questao = req.params.id_questao;

    const query = "UPDATE questao SET numero = ? WHERE id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [numero, id_questao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão atualizada com sucesso."
        });
    });
});


// GET /questão/:id_questao
router.get("/:id_questao", urlcodedParser, (req, res) => {
    const id_questao = req.params.id_questao;

    const query = "SELECT rowid, * FROM questao WHERE id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_questao], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão pega com sucesso.",
            data: rows
        })
    })
})

// GET /questão/:id_questao
router.get("/", urlcodedParser, (req, res) => {

    const query = "SELECT * FROM questao";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão pega com sucesso.",
            data: rows
        })
    })
})

// DELETE /questao/:id_questao
router.delete("/:id_questao", urlcodedParser, (req, res) => {
    const id_questao = req.params.id_questao;

    const query_selecao = "SELECT rowid, * FROM questao WHERE id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_questao], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        else if(!rows) {
            return res.status(404).json({
                title: "Questão não encontrada."
            })
        }
    })

    const query = "DELETE FROM questao WHERE id_questao = ?";
    db.run(query, [id_questao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão deletada com sucesso."
        })
    })
})

module.exports = router;