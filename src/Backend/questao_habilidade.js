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

// GET /questao-habilidade/:id_questao_habilidade
router.get("/:id_questao_habilidade", urlcodedParser, (req, res) =>{
    let db = new sqlite3.Database(DBPATH);
    const query = "SELECT questao_habilidade.id_questao_habilidade, habilidade.id_habilidade, questao.id_questao FROM questao_habilidade JOIN habilidade ON questao_habilidade.id_habilidade = habilidade.id_habilidade JOIN questao ON questao_habilidade.id_questao = questao.id_questao WHERE id_questao_habilidade = ?";

    db.all(query, [req.params.id_questao_habilidade], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão habilidade pego com sucesso.",
            data: rows
        });
    });
});

// Exportando os endpoints de questao_habilidade.js.
module.exports = router;