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

// GET /medias_habilidade
router.get("/", urlcodedParser, (req, res) =>{ 
   
    const query = `SELECT h.tipo_habilidade, AVG(n.valor_nota) AS media_habilidade
    FROM nota n
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN questao_habilidade qh ON q.id_questao = qh.id_questao_habilidade
    JOIN habilidade h ON qh.id_habilidade = h.id_habilidade
    GROUP BY h.tipo_habilidade`;

    let db = new sqlite3.Database(DBPATH);
    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows
        })
    });
})

module.exports = router;