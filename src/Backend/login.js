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

//Validação de login
router.post ("/", (req, res) => {
    let email = req.body.email
    let senha = req.body.senha
  
    console.log(email, senha);
  
    const query = "SELECT email, senha FROM professor WHERE email = ? AND senha = ?";
    let db = new sqlite3.Database(DBPATH);
  
    db.get(query, [email, senha], (error, row) => {
        if(error) {
            res.status(500).json({ error: error })
            return res.end();
        }
        console.log(row)
        if(typeof row == "undefined") {
          res.status(401).json({ error: error})
          return res.end();
        }
        let token = jwt.sign({ data: email}, secretKey, {expiresIn: 60*60*3})
        return res.status(200).json({
            token: token
        });
    });
  })

    // Exportando os endpoints de login.js.
    module.exports = router;