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

// Criando os endpoints
// GET /aluno
router.get('/', (req, res) =>{
    const query = `SELECT AVG(n.valor_nota) AS media_aluno, a.nome_aluno
    FROM aluno a
    JOIN nota n ON a.id_aluno = n.id_aluno
    GROUP BY nome_aluno`;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Alunos pegos com sucesso.",
            data: rows 
        })
    }) 
})

// Exportando os endpoints de alunos.js.
module.exports = router;