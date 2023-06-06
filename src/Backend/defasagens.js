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

// GET /defasagens
router.get('/', (req, res) =>{
    const query = `SELECT h.tipo_habilidade, COUNT(*) AS num_alunos
    FROM nota n
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN questao_habilidade qh ON q.id_questao = qh.id_questao_habilidade
    JOIN habilidade h ON qh.id_habilidade = h.id_habilidade
    WHERE n.valor_nota < 5
    GROUP BY h.tipo_habilidade
    ORDER BY COUNT(*) ASC
    LIMIT 3;
    `;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows 
        })  
    })
})

module.exports = router;