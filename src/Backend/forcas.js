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

// GET /forcas/:id_aluno
router.get('/:id_aluno', (req, res) =>{

    const query = `SELECT h.tipo_habilidade, a.nome_aluno, n.valor_nota AS media
    FROM aluno a
    JOIN nota n ON n.id_aluno = a.id_aluno
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN questao_habilidade qh ON q.id_questao = qh.id_questao
    JOIN habilidade h ON qh.id_habilidade = h.id_habilidade
    WHERE a.id_aluno = ? 
    GROUP BY h.tipo_habilidade, a.nome_aluno
    ORDER BY n.valor_nota DESC
    LIMIT 3;
    ;`

    const id_aluno = req.params.id_aluno;


    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_aluno],(error, rows) => {
        if (error) {
            return res.json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        });
    })
})

// Exportando os endpoints de forcas.js.
module.exports = router;