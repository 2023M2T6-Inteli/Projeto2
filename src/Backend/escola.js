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
// POST escola
router.post("/", urlcodedParser, (req, res) => {
    const {nome_escola} = req.body;
    
    const query = "INSERT INTO escola(nome_escola) VALUES(?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_escola], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola criada com sucesso."
        })
    })
})

// PUT /escola/:id_escola
router.put("/:id_escola", urlcodedParser, (req, res) => {
    const id_escola = req.params.id_escola;
    const {nome_escola} = req.body;

    const query = "UPDATE escola SET nome_escola = ? WHERE id_escola = ?";
    let db = new sqlite3.Database(DBPATH)
    db.run(query, [nome_escola, id_escola], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola alterada com sucesso."
        })
    })
})


// GET /escola/:id_escola
router.get("/:id_escola", urlcodedParser, (req, res) => {
    const id_escola = req.params.id_escola;

    const query = "SELECT rowid, * FROM escola WHERE id_escola = ?";
    let db = new sqlite3.Database(DBPATH);
    db.all(query, [id_escola], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola encontrada.",
            data: rows
        })
    })
})

// DELETE /escola/:id_escola
router.delete("/:id_escola", urlcodedParser, (req, res) => {
    const id_escola = req.params.id_escola;

    const query_selecao = "SELECT rowid, * FROM escola WHERE id_escola = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_escola], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        if(!rows) {
            return res.status(404).json({
                title: "Escola não encontrado."
            })
        }
    })
    const query = "DELETE FROM escola WHERE id_escola = ?"
    db.run(query, [id_escola], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola deletado com sucesso."
        })
    })
})

// Exportando os endpoints de escola.js.
module.exports = router;