// Importando as bibliotecas necessárias.
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;



// Inicializando a aplicação.
const app = express();

// Definindo as regras gerais.
app.use(express.json());
app.use(cors());


// Importando o banco de dados.
const DBPATH = 'data/bd_nova_freire.db';


// Criando endpoints
// POST /professor
app.post("/professor",  urlencodedParser,(req, res) => {                                       6
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body; // Pegando os itens da requisição

    let db = new sqlite3.Database(DBPATH); // Abre o banco
    const query = "INSERT INTO professor(nome_professor, email, senha, cargo, celular, cep, idade) VALUES(?, ?, ?, ?, ?, ?, ?)";
    
    db.run(query, [nome_professor, email , senha, cargo, celular, cep, idade], (error) => { // Fazendo a query com os itens da requisição
        if (error) {
            throw new Error(error) // Travando o sistema e trazendo informações sobre o erro.
        }
        return res.status(201).json({ // Retornando o status de itens criados 
            title: "Professor criado com sucesso" // Mostrando um json com a resposta.
        });
    });
});

// PUT /professor
app.put("/professor/:id_professor", urlencodedParser, (req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body // Recebendo o corpo da requisição e guardando nas respectivas constantes.

    // Pegando os dados do backend
    let db = new sqlite3.Database(DBPATH); // Abrindo o banco
    const query = "UPDATE professor SET nome_professor = ?, email = ?, senha = ?, cargo = ?, celular = ?, cep = ?, idade = ? WHERE id_professor = ?"; // Fazendo a query

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade, req.params.id_professor], (error) => { // Rodando a query
        if (error) { // Verificando se há erros
            throw new Error(error) // Caso haja, trava o sistema de requisição e traz informações sobre o erro.
        }
        return res.status(200).json({ 
            title: "Professor atualizado com sucesso."
        });
    });
});

// get /professor:id_professor
app.get("/professor/:id_professor", urlencodedParser, (req, res) => {
    
    let db = new sqlite3.Database(DBPATH);

    const query = "SELECT id_professor, * FROM professor WHERE id_professor = ?";

    db.get(query, [req.params.id_professor], (error, rows) => {
        if(error) {
            throw new Error(error)
        }

        return res.status(200).json({
            title: "Professor pegado com sucesso.",
            professor: rows
        });
    });
});

// POST aluno; Adcionando alunos.
app.post("/aluno", (req, res) => {

    const {nome_aluno, situacao, forcas, defasagens} = req.body;

    let db = new sqlite3.Database(DBPATH);

    const query = "INSERT INTO aluno(nome_aluno, situacao , forcas, defasagens) VALUES (?, ?, ?, ?)";

    db.run(query, [nome_aluno, situacao, forcas, defasagens], (error) =>{
        if(error) {
            throw new Error(error);
        }
        return res.status(201).json({
            title: "Aluno criado com sucesso."
        });
    });
});

// get/aluno/:id_aluno Selecionando um aluno em especifico e rebendo os dados.
app.get("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH)

    const query_select = "SELECT * FROM aluno WHERE id_aluno = ?"

    const id_aluno = req.params.id_aluno;
    
    db.all(query_select, [id_aluno], (error, rows) => {
        if (error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Aluno retornado com sucesso.",
            aluno: rows
        });
    });
});


// PUT id_aluno; Atualizando os dados dos alunos
app.put("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {nome_aluno, situacao, forcas, defasagens} = req.body;

    const query = "UPDATE aluno SET nome_aluno = ?, situacao = ?, forcas = ?, defasagens = ? WHERE id_aluno = ?";

    const id_aluno = req.params.id_aluno;

    db.run(query, [nome_aluno, situacao, forcas, defasagens, id_aluno], (error) => {
        if(error) {
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Aluno atualizado com sucesso."
        });
    });
});

// DELETE aluno; Deletando um determinado aluno da base de dados.
app.delete("/aluno/:id_aluno", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM aluno WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_aluno], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Usuário não encontrado. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM aluno WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_aluno], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Usuário deletado com sucesso."
        });
    });
});

app.post("/turma", (req, res) => {

    const {nome_turma, turno, ano_turma, materias} = req.body;

    let db = new sqlite3.Database(DBPATH);

    const query = "INSERT INTO turma(nome_turma, turno, ano_turma, materias) VALUES (?, ?, ?, ?)";

    db.run(query, [nome_turma, turno, ano_turma, materias], (error) =>{
        if(error) {
            throw new Error(error);
        }
        return res.status(201).json({
            title: "Turma criada com sucesso."
        });
    });
});

app.get("/turma/:id_turma", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM turma WHERE id_turma = ?"

    const id_turma = req.params.id_turma;
    
    db.all(query_select, [id_turma], (error, rows) => {
        if (error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Turma retornada com sucesso.",
            turma: rows
        });
    });
});

app.post("/registro", (req, res) =>{
    let db = new sqlite3.Database(DBPATH);

    const {id_turma, id_aluno} = req.body;

    const query = "INSERT INTO registro(id_turma, id_aluno) VALUES(?, ?)";

    db.run(query, [id_turma, id_aluno], (error) => {
        if(error) {
            throw new Error(error);
        };
        return res.status(201).json({
            title: "Registro criado com sucesso.",
        });
    });
});

app.get("/aluno/turno/:turno", (req, res) =>{
    let db = new sqlite3.Database(DBPATH);

    const turno = req.params.turno;

    const query = `SELECT aluno.nome_aluno, turma.nome_turma
    FROM aluno
    JOIN registro ON registro.id_aluno = aluno.id_aluno
    JOIN turma ON turma.id_turma = registro.id_turma
    WHERE turma.turno = ?;
    `;

    db.all(query, [turno], (error, rows) => {
        if (error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: `Alunos do turno ${turno}`,
            turma: rows
        });
    });
});

//POST /turma
app.post("/turma", urlencodedParser, (req, res) => {
    const {id_turma, nome_turma, turno, ano_turma, materias} = req.body

    let db = new sqlite3.Database(DBPATH)
    const query = "INSERT INTO turma(id_turma, nome_turma, turno, ano_turma, materias) VALUES (?, ?, ?, ?, ?)";

    db.run(query, [id_turma, nome_turma, turno, ano_turma, materias], (error) => {
        if (error) {
            throw new Error (error)
        }
        return res.status(201).json ({
            title: "Turma criada com sucesso"
        })
    })
})

// get /turma:id_turma
app.get("/turma", urlencodedParser, (req, res) => {

    let db = new sqlite3.Database(DBPATH)
    const query = "SELECT id_turma, * FROM turma WHERE id_turma = ?"

    db.get(query, [req.params.id_turma], (error, rows) => {
        
    })
})


// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})