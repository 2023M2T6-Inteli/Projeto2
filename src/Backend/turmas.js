const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlcodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

// Definindo regras gerais da aplicação.
router.use(express.json());
router.use(cors());

// Importando o banco.
const DBPATH = 'bd_nova_freire.db';

// GET turmas
router.get("/", urlcodedParser,(req, res) =>{

    // Fazendo a query de seleção.
    const query_selecao = "SELECT nome_turma FROM turma"
    let db = new sqlite3.Database(DBPATH); // Abrindo o banco.
  
    db.all(query_selecao, [], (error, rows) => {
        if (error) {
            res.status(500).json({error: "Erro ao selecionar turma."})
        }
        return res.status(200).json({
            title: "Turmas selecionada com sucesso.",    
            data: rows
        });
    });
});

// Exportando os endpoints de turmas.js.
module.exports = router;