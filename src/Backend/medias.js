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
// GET /medias/:id_turma
router.get('/:id_turma', (req, res) => {
    const id_turma = req.params.id_turma;

    const query = `SELECT av.data, AVG(n.valor_nota) AS media_notas
    FROM nota n
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN avaliacao av ON q.id_avaliacao = av.id_avaliacao
    JOIN turma t ON av.id_turma = t.id_turma
    WHERE t.id_turma = ?
    GROUP BY av.id_avaliacao`;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_turma], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows
        })
    })
})

// Exportando os endpoints de medias.js.
module.exports = router;