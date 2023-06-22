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
// POST /alocacao
router.post("/", urlcodedParser, (req, res) => {
    const {id_professor, id_escola, id_turma} = req.body;

    const query = "INSERT INTO alocacao(id_professor, id_escola, id_turma) VALUES(?, ?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_professor, id_escola, id_turma], (error) => {
        if(error){
            res.status(500).json({error: error})
        }
        return res.status(200).json({
            title: "Alocacação criada com sucesso."
        })
    })
})
// GET /alocacao/:id_alocacao
router.get("/:id_alocacao", urlcodedParser, (req, res) => {
    const id_alocacao = req.params.id_alocacao;

    const query = "SELECT rowid, * FROM alocacao WHERE id_alocacao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_alocacao], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Alocação encontrada.",
            data: rows
        })
    })
})

// Exportando os endpoints de alocacao.js.
module.exports = router;