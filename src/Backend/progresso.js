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

// GET /progresso
router.get('/', (req, res) =>{
    const query = `SELECT AVG(valor_nota) AS progresso
    FROM nota`

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Progresso recebido com sucesso.",
            data: rows 
        })  
    })
})


module.exports = router;