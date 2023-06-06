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

// Iniciando a construção de endpoints
// POST /turma
router.post("/", urlcodedParser,(req, res) => {
  // Criando variáveis para receber os dados da requisição.
  const { nome_turma, ano_turma } = req.body;

  let db = new sqlite3.Database(DBPATH); // Abrindo o banco de dados.
  const query = "INSERT INTO turma(nome_turma, ano_turma) VALUES(?, ?)"; // Construindo a query para a requisição.

  db.run(query, [nome_turma, ano_turma], (error) => {
    if (error) {
      res.status(500).json({ error: "Erro ao criar turma." });
    } else {
      res.status(200).json({
        status: "Turma criada com sucesso.",
      });
    }
  });
  db.close()
});

// GET /turma/:id_turma
router.get("/:id_turma", urlcodedParser,(req, res) => {
  // Pegando o id da turma.
  const id_turma = req.params.id_turma;
  // Fazendo a query de seleção.
  console.log(id_turma)
  const query_selecao = "SELECT rowid, * FROM turma WHERE id_turma = ?";
  let db = new sqlite3.Database(DBPATH); // Abrindo o banco.

  db.run(query_selecao, [id_turma], (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Não foi possível selecionar a turma." });
    } else {
      console.log(rows)
      res.status(200).json({
        title: "Turma selecionada com sucesso.",
      });
    }
    db.close()
  });
});

router.get("/", urlcodedParser,(req, res) => {
  const query = "SELECT * FROM turma";
  let db = new sqlite3.Database(DBPATH);

  db.all(query, [], (error, rows) => {
    if (error) {
      res.status(500).json({
        error: "Erro ao selecionar turma.",
      });
    } else {
      res.status(200).json({
        title: "Turmas selecionadas com sucesso.",
        data: rows,
      });
    }
  });
  db.close()
});

// PUT /turma/:id_turma
router.put("/:id_turma", urlcodedParser,(req, res) => {
  const { nome_turma, ano_turma } = req.body;
  const id_turma = req.params.id_turma;

  const query =
    "UPDATE turma SET nome_turma = ?, ano_turma = ? WHERE id_turma = ?";
  let db = new sqlite3.Database(DBPATH);

  db.run(query, [nome_turma, ano_turma, id_turma], (error) => {
    if (error) {
      res.status(500).json({ error: "Erro ao atualizar turma." });
    } else {
      res.status(200).json({
        status: "Turma atualizada com sucesso.",
      });
    }
  });
  db.close()
});

// DELETE /turma/:id_turma
router.delete("/:id_turma", urlcodedParser,(req, res) => {
  const query_1 = "SELECT rowid, * FROM turma WHERE rowid = ?";

  let db = new sqlite3.Database(DBPATH); // Abrindo o banco de dados.
  const id_turma = req.params.id_turma;

  db.get(query_1, [id_turma], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erro ao deletar turma." });
    } else if (!rows) {
      res.status(404).json({ error: "Turma não encontrada." });
    } else {
      const query = "DELETE FROM turma WHERE rowid = ?";

      db.run(query, [id_turma], (error) => {
        if (error) {
          res.status(500).json({ error: "Erro ao deletar turma." });
        } else {
          res.status(200).json({
            status: "Turma deletada com sucesso.",
          });
        }
      });
    }
  });
  db.close()
});

module.exports = router;
