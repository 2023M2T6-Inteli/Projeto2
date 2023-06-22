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
// POST professor
router.post("/", urlcodedParser, (req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body;

    const query = "INSERT INTO professor(nome_professor, email, senha, cargo, celular, cep, idade) VALUES(?, ?, ?, ?, ?, ?, ?)"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Professor criado com sucesso."
        });
    });
});


// PUT /professor/:id_professor
router.put("/:id_professor", urlcodedParser, (req, res) => {
    const { nome_professor, email, senha, cargo, celular, cep, idade } = req.body;
    const id_professor = req.params.id_professor;

    const query = "UPDATE professor SET nome_professor = ?, email = ?, senha = ?, cargo = ?, celular = ?, cep = ?, idade = ? WHERE id_professor = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade, id_professor], (error) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Perfil atualizado com sucesso."
        });
    });
    db.close();
});


// GET /professor/:id_professor
router.get("/:id_professor", (req, res) => {
    const id_professor = req.params.id_professor;

    const query = "SELECT rowid, * FROM professor WHERE id_professor = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_professor], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Professor encontrado.",
            data: rows
        });
    });
});

// DELETE /professor/:id_professor
router.delete("/:id_professor", urlcodedParser, (req, res) => {
    const id_professor = req.params.id_professor;

    const query_selecao = "SELECT rowid, * FROM professor WHERE id_professor = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_professor], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error });
        }
        else if(!rows) {
            return res.status(404).json({
                title: "Professor não encontrado."
            })
        }
    })

    const query = "DELETE FROM professor WHERE id_professor = ?"
    db.run(query, [id_professor], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Professor deletado com sucesso."
        })
    })
})

// Exportando os endpoints de professor.js.
module.exports = router;