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

// POST /aluno
router.post('/', urlcodedParser, (req, res) => {
    const nome_aluno = req.body.nome_aluno;
    const id_turma = req.body.id_turma;
    let id_aluno; 
  
    const queryAluno = 'INSERT INTO aluno(nome_aluno) VALUES (?)';
    const queryRegistro = 'INSERT INTO registro(id_turma, id_aluno) VALUES (?, ?)';
  
    let db = new sqlite3.Database(DBPATH);
  
    db.run(queryAluno, [nome_aluno], function (error) {
      if (error) {
        res.status(500).json({ error: error });
        return;
      }
  
      id_aluno = this.lastID; // Assign this.lastID to the id_aluno variable
  
      db.run(queryRegistro, [id_turma, id_aluno], function (error) {
        if (error) {
          res.status(500).json({ error: error });
          return;
        }
  
        res.status(200).json({
          title: 'Aluno e Registro criados com sucesso.',
        });
      });
    });
  });
  
  

// GET /aluno/:id_aluno
router.get("/:id_aluno", urlcodedParser, (req, res) => {
    const id_aluno = req.params.id_aluno;

    const query = "SELECT * FROM aluno WHERE id_aluno = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_aluno], (error, rows) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Aluno pego com sucesso.",
            data: rows
        })
    })
})


// GET /nota/aluno/:id_aluno
router.get("/nota/:id_nota", urlcodedParser, (req, res) => {
    const id_nota = req.params.id_nota;

    const query = "SELECT aluno.valor_nota, habilidade.id_habilidade FROM desempenho JOIN aluno ON aluno.id_aluno = desempenho.id_aluno JOIN habilidade ON habilidade.id_habilidade = desempenho.id_habilidade WHERE desempenho.id_nota = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_nota], (error, rows) => {
        if (error) {
            return res.json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        });
    });
});



// PUT /aluno/:id_aluno
router.put("/:id_aluno", urlcodedParser, (req, res) => {
    const id_aluno = req.params.id_aluno;
    const {nome_aluno} = req.body;

    const query = "UPDATE aluno SET nome_aluno = ? WHERE id_aluno = ?"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_aluno, id_aluno], (error) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Aluno alterado com sucesso."
        })
    })
})


// DELETE /aluno/:id_aluno
router.delete("/:id_aluno", urlcodedParser, (req, res) => {
    const id_aluno = req.params.id_aluno;

    const query_1 = "SELECT rowid, * FROM aluno WHERE rowid = ?";
    let db = new sqlite3.Database(DBPATH);

    db.get(query_1, [id_aluno], (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        }
        else if(!rows) {
            res.status(404).json({
                title: "Aluno não encontrado."
            })
        }
    })
    const query = "DELETE FROM aluno WHERE rowid = ?"

    db.run(query, [id_aluno], (error) => {
        if (error) {
            res.status(400).json({
                error: error
            })
        }
        return res.status(200).json({
            title: "Aluno removido com sucesso."
        })
    })
})

// Exportando os endpoints de aluno.js.
module.exports = router;