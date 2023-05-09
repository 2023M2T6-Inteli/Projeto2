// Importando as bibliotecas necessárias.
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors")
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })



// Inicializando a aplicação.
const app = express();

// Definindo as regras gerais.
app.use(express.json())
app.use(cors())


// Importando o banco de dados.
const DBPATH = 'data/bd_nova_freire.db'


// Criando endpoints
// POST /professor
app.post("/professor",  urlencodedParser,(req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body

    let db = new sqlite3.Database(DBPATH)
    const query = "INSERT INTO professor(nome_professor, email, senha, cargo, celular, cep, idade) VALUES(?, ?, ?, ?, ?, ?, ?)";
    
    db.run(query, [nome_professor, email , senha, cargo, celular, cep, idade], (error) => {
        if (error) {
            throw new Error(error)
        }
        return res.status(201).json({
            title: "Professor criado com sucesso"
        })
    })
})

// PUT /professor
app.put("/professor/:id", urlencodedParser, (req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body

    // Pegando os dados do backend
    let db = new sqlite3.Database(DBPATH)
    const query = "UPDATE professor SET nome_professor = ?, email = ?, senha = ?, cargo = ?, celular = ?, cep = ?, idade = ? WHERE id_professor = ?"

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade, req.params.id_professor], (error) => {
        if (error) {
            throw new Error(error)
        }
        return res.status(200).json({
            title: "Professor atualizado com sucesso."
        })
    })
})


app.get("/professor", urlencodedParser, (req, res) => {
    
    let db = new sqlite3.Database(DBPATH)

    const query = "SELECT id_professor, * FROM professor WHERE id_professor = ?"

    db.get(query, [req.params.id_professor], (error, rows) => {
        if(error) {
            throw new Error(error)
        }

        return res.status(200).json({
            title: "Pofessor pegado com sucesso.",
            professor: rows
        })
    })
})

const port = 3000

// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})