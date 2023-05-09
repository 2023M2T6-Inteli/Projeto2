// Importando as bibliotecas necessárias.
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors")



// Inicializando a aplicação.
const app = express();

// Definindo as regras gerais.
app.use(express.json())
app.use(cors())


// Importando o banco de dados.
const DBPATH = '.data/bd_nova_freire.db'


// Criando endpoints
app.post("/professor", (req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body

    let db = new sqlite3.Database(DBPATH)

    const query = "INSERT INTO professor(nome_professor, email, senha, cargo, celular, cep, idade) VALUES(?, ?, ?, ?, ?, ?, ?)"

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade], (error) => {
        if (error) {
            throw new Error(error)
        }
        return res.status(201).json({
            title: "Professor criado com sucesso"
        })
    })
})

const port = 3000

// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})