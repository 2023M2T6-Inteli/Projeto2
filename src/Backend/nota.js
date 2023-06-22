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
// POST /nota
router.post("/", urlcodedParser, (req, res) => {
    const {valor_nota, id_aluno, id_questao} = req.body

    const query = "INSERT INTO nota(valor_nota, id_aluno, id_questao) VALUES(?, ?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_nota, id_aluno, id_questao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Nota criada com sucesso."
        })
    })
})


// PUT /nota/:id_nota
router.put("/:id_nota", urlcodedParser, (req, res) => {
    const id_nota = req.params.id_nota;
    const { valor_nota, id_aluno, id_questao } = req.body;

    const query = "UPDATE nota SET valor_nota = ?, id_aluno = ?, id_questao = ? WHERE id_nota = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_nota, id_aluno, id_questao, id_nota], (error) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Nota atualizada com sucesso."
        });
    });
});


// GET /nota
router.get("/", urlcodedParser, (req, res) => {
    const query = "SELECT * FROM nota";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            return res.status(400).json({ error: error });
        }

        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        });
    });
});


// GET /nota/:valor_nota
router.get("/:valor_nota", urlcodedParser, (req, res) => {
    const valor_nota = req.params.valor_nota;

    const query = "SELECT * FROM nota WHERE valor_nota >= ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [valor_nota], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        });
    });
});



// DELETE /nota/:id_nota
router.delete("/:id_nota", urlcodedParser, (req, res) => {
    const id_nota = req.params.id_nota;

    const query_selecao = "SELECT rowid, * FROM nota WHERE id_nota = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_nota], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        else if(!rows) {
            return res.status(404).json({
                title: "Nota não encontrada."
            })
        }
    })
    const query = "DELETE FROM nota WHERE id_nota = ?";

    db.run(query, [id_nota], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Nota deletada com sucesso."
        })
    })
})

// Exportando os endpoints de nota.js.
module.exports = router;