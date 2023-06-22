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
// POST habilidade
router.post("/", urlcodedParser, (req, res) => {
    const {tipo_habilidade, ano_habilidade} = req.body;

    const query = "INSERT INTO habilidade(tipo_habilidade, ano_habilidade) VALUES(?, ?)"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [tipo_habilidade, ano_habilidade], (error, rows) => {
        if(error) {
            res.status(400).json({
                error: error
            })
        }
        return res.status(200).json({
            title: "Habilidade criada com sucesso.",
            data: rows
        })
    })
})


// PUT /habilidade/:id_habilidade
router.put("/:id_habilidade", urlcodedParser, (req, res) => {
    const { tipo_habilidade, ano_habilidade } = req.body;
    const id_habilidade = req.params.id_habilidade;

    const query = "UPDATE habilidade SET tipo_habilidade = ?, ano_habilidade = ? WHERE id_habilidade = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [tipo_habilidade, ano_habilidade, id_habilidade], (error) => {
        if (error) {
            return res.status(400).json({
                error: error
            });
        }
        
        return res.status(200).json({
            title: "Habilidade atualizada com sucesso."
        });
    });
});


// GET /habilidade/:id_habilidade
router.get("/:id_habilidade", urlcodedParser, (req, res) => {
    const id_habilidade = req.params.id_habilidade;

    const query = "SELECT rowid, * FROM habilidade WHERE id_habilidade = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_habilidade], (error, rows) =>{
        if(error) {
            res.status(500).json({
                title: "Não foi possível selecionar a habilidade."
            })
        }
        return res.status(200).json({
            title: "Habilidade pega com sucesso.",
            data: rows
        })
    })
})

// GET /habilidade
router.get("/", urlcodedParser, (req, res) => {
    const query = "SELECT * FROM habilidade";
    let db = new sqlite3.Database(DBPATH);


    db.all(query, [], (error, rows) => {
        if(error) {
            res.status(500).json({
                error: error
            });
        };
        return res.status(200).json({
            title: "Habilidades selecionadas com sucesso.",
            data: rows
        });
    });
});


// DELETE /habilidade/:id_habilidade
router.delete("/:id_habilidade", urlcodedParser, (req, res) => {
    const id_habilidade = req.params.id_habilidade;

    const query_selecao = "SELECT rowid, * FROM habilidade WHERE id_habilidade = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_habilidade], (error, rows) => {
        if(error) {
            res.status(500).json({
                title: "Erro em pegar a habilidade."
            });
        }
        else if(!rows) {
            res.status(500).json({
                title: "Habilidade não encontrado."
            })
        }
    });
    const query = "DELETE FROM habilidade WHERE rowid = ?";
    db.run(query, [id_habilidade], (error) => {
        if(error) {
            res.status(500).json({
                title: "Erro em deletar o habilidade."
            })
        }
        return res.status(200).json({
            title: "Habilidade deletado com sucesso."
        })
    })
});

// Exportando os endpoints de habilidade.js.
module.exports = router;