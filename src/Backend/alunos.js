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
router.get('/:id_turma', (req, res) =>{
    
    const query = `
  SELECT COALESCE(AVG(n.valor_nota), 'Sem dados') AS media_aluno, a.nome_aluno, a.id_aluno
  FROM aluno a
  LEFT JOIN nota n ON a.id_aluno = n.id_aluno
  JOIN registro r ON a.id_aluno = r.id_aluno
  JOIN turma t ON r.id_turma = t.id_turma
  WHERE t.id_turma = ?
  GROUP BY nome_aluno
`;


    const id_turma = req.params.id_turma;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_turma], (error, rows) => {
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