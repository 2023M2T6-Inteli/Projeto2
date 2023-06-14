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
// GET /registro/:id_registro
router.get("/:id_registro", urlcodedParser, (req, res) => { // Iniciando o caminho da requisição.

    let db = new sqlite3.Database(DBPATH) // Abrindo o banco de dados
    const query = "SELECT registro.id_registro, turma.id_turma, aluno.id_aluno FROM registro JOIN aluno ON registro.id_aluno = aluno.id_aluno JOIN turma ON registro.id_turma = turma.id_turma WHERE registro.id_registro = ?";

    db.get(query, [req.params.id_registro], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Registro pego com sucesso.",
            data: rows
        })
    })
})

// Exportando os endpoints de registro.js.
module.exports = router;