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

//DELETE /professor:id_professor
app.delete("/professor/:id_professor", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM professor WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_professor], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Usuário não encontrado. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM professor WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_professor], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Usuário deletado com sucesso."
        });
    });
});

// POST aluno; Adcionando alunos.
app.post("/aluno", (req, res) => {

    const {nome_aluno, situacao, forcas, defasagens} = req.body;

    let db = new sqlite3.Database(DBPATH);

    const query = "INSERT INTO aluno(nome_aluno, situacao, forcas, defasagens) VALUES (?, ?, ?, ?)";

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

//POST /registro
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

//get /registro/:id_registro 
app.get("/registro/:id_registro", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH)

    const query_select = "SELECT * FROM registro WHERE id_registro = ?"

    const id_registro = req.params.id_registro;

    db.all(query_select, [id_registro], (error, rows) => {
        if (error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Registro retornado com sucesso.",
            registro: rows
        })
    })

})

//PUT id_registro; Atualizando o registro 
app.put("/registro/:id_registro", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {id_turma, id_aluno} = req.body;

    const query = "UPDATE registro SET id_turma = ?, id_aluno = ? WHERE id_registro = ?";

    const id_registro = req.params.id_registro;

    db.run(query, [id_turma, id_aluno, id_registro], (error) => {
        if (error){
            throw new ErrorEvent(error);
        }
        return res.status (200).json({
            title: "Registro atualizado com sucesso."
        })
    })
})

// DELETE registro; Deletando um determinado registro da base de dados.
app.delete("/registro/:id_registro", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM registro WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_registro], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Registro não encontrado. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM registro WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_registro], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Registro deletado com sucesso."
        });
    });
});


//POST /desempenho
app.post("/desempenho", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {valor_desempenho, id_aluno, id_habilidade} = req.body;

    const query = "INSERT INTO desempenho(valor_desempenho, id_aluno, id_habilidade) VALUES (?, ?, ?)";

    db.run(query, [valor_desempenho, id_aluno, id_habilidade], (error) => {
        if (error) {
            throw new Error(error);
        };
        return res.status(201).json({
            title: "Desempenho criado com sucesso.",
        });
    });
});

//get /desempenho/:id_desempenho
app.get("/desempenho/:id_desempenho", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM desempenho WHERE id_desempenho = ?"

    const id_desempenho = req.params.id_desempenho;

    db.all(query_select, [id_desempenho], (error, rows) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Desempenho retornado com sucesso.",
            desempenho: rows
        })
    })
})

//PUT id_desempenho; Atualiza o desempenho
app.put("/desempenho/:id_desempenho", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {valor_desempenho, id_aluno, id_habilidade} = req.body;

    const query = "UPDATE desempenho SET valor_desempenho = ?, id_aluno = ?, id_habilidade = ? WHERE id_desempenho = ?";

    const id_desempenho = req.params.id_desempenho;

    db.run(query, [valor_desempenho, id_aluno, id_habilidade, id_desempenho], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status (200).json({
            title: "Desempenho atualizado com sucesso."
        });
    });
});

// DELETE /desempenho/:id_desempenho; Deletando um determinado desempenho da base de dados.
app.delete("/desempenho/:id_desempenho", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM desempenho WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_desempenho], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Desempenho não encontrado. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM desempenho WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_desempenho], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Desempenho deletado com sucesso."
        });
    });
});

//POST /habilidade
app.post("/habilidade", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {tipo_habilidade, materia_habilidade, ano_habilidade} = req.body;

    const query = "INSERT INTO habilidade(tipo_habilidade, materia_habilidade, ano_habilidade) VALUES (?, ?, ?)";

    db.run(query, [tipo_habilidade, materia_habilidade, ano_habilidade], (error) => {
        if (error) {
            throw new Error (error);
        };
        return res.status(201).json({
            title: "Habilidade criada com sucesso.",
        });
    });
});

//get /habilidade/:id_habilidade
app.get("/habilidade/:id_habilidade", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM habilidade WHERE id_habilidade = ?"

    const id_habilidade = req.params.id_habilidade;

    db.all(query_select, [id_habilidade], (error, rows) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Habilidade retornada com sucesso.",
            habilidade: rows
        });
    });
});

//PUT /habilidade/:id_habilidade; Atualiza a habilidade
app.put("/habilidade/:id_habilidade", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {tipo_habilidade, materia_habilidade, ano_habilidade} = req.body;

    const query = "UPDATE habilidade SET tipo_habilidade = ?, materia_habilidade = ?, ano_habilidade = ? WHERE id_habilidade = ?";

    const id_habilidade = req.params.id_habilidade;

    db.run(query, [tipo_habilidade, materia_habilidade, ano_habilidade, id_habilidade], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Habilidade atualizada com sucesso."
        });
    });
});

// DELETE habilidade/:id_habilidade; Deletando uma determinada habilidade da base de dados.
app.delete("/habilidade/:id_habilidade", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM habilidade WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_habilidade], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Habilidade não encontrada. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM habilidade WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_habilidade], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Habilidade deletada com sucesso."
        });
    });
});


//POST /nota
app.post("/nota", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {valor_nota, id_aluno, id_avaliacao} = req.body;

    const query = "INSERT INTO nota(valor_nota, id_aluno, id_avaliacao) VALUES (?, ?, ?)";

    db.run(query [valor_nota, id_aluno, id_avaliacao], (error) => {
        if (error){
            throw new Error (error);
        }
        return res.status(201).json({
            title: "Nota criada com sucesso",
        });
    });
});

//get /nota/:id_nota
app.get("/nota/:id_nota", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM nota WHERE id_nota = ?"

    const id_nota = req.params.id_nota;

    db.all(query_select, [id_nota], (error, rows) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Nota retornada com sucesso.",
            nota: rows
        });
    });
});

//PUT /nota/:id_nota; Atualiza a nota
app.put("/nota/:id_nota", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {valor_nota, id_aluno, id_avaliacao} = req.body;

    const query = "UPDATE nota SET valor_nota = ?, id_aluno = ?, id_avaliacao = ? WHERE id_nota = ?";

    const id_nota = req.params.id_nota

    db.run(query, [valor_nota, id_aluno, id_avaliacao, id_nota], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Nota atualizada com sucesso."
        });
    });

});

// DELETE /nota/:id_nota; Deletando uma determinada nota da base de dados.
app.delete("/nota/:id_nota", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM nota WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_nota], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        else if(!rows) {
            return res.status(404).json({
                title: "Nota não encontrada. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM nota WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_nota], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Nota deletada com sucesso."
        });
    });
});

//POST /avaliacao
app.post("/avaliacao", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {tipo_avaliacao, periodo} = req.body;

    const query = "INSERT INTO avaliacao(tipo_avaliacao, periodo) VALUES (?, ?)";

    db.run(query [tipo_avaliacao, periodo], (error) => {
        if (error){
            throw new Error (error);
        }
        return res.status(201).json({
            title: "Avaliação criada com sucesso",
        });
    });
});

//get /avaliacao/:id_avaliacao
app.get("/avaliacao/:id_avaliacao", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM avaliacao WHERE id_avaliacao = ?"

    const id_avaliacao = req.params.id_avaliacao;

    db.all(query_select, [id_avaliacao], (error, rows) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Avaliação retornada com sucesso.",
            nota: rows
        });
    });
});

//PUT /avaliacao/:id_avaliacao; Atualiza a nota
app.put("/avaliacao/:id_avaliacao", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {tipo_avaliacao, periodo} = req.body;

    const query = "UPDATE avaliacao SET tipo_avaliacao = ?, periodo = ? WHERE id_avaliacao = ?";

    const id_avaliacao = req.params.id_avaliacao

    db.run(query, [tipo_avaliacao, periodo, id_avaliacao], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Avaliação atualizada com sucesso."
        });
    });

});

// DELETE /avaliacao/:id_avaliacao; Deletando uma determinada avaliação da base de dados.
app.delete("/avaliacao/:id_avaliacao", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM avaliacao WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_avaliacao], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Avaliação não encontrada. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM avaliacao WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_avaliacao], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Avaliação deletada com sucesso."
        });
    });
});

//POST /alocacao
app.post("/alocacao", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {periodo_entrada, periodo_saida, id_professor, id_escola} = req.body;

    const query = "INSERT INTO alocacao(periodo_entrada, periodo_saida, id_professor, id_escola) VALUES (?, ?, ?, ?)";

    db.run(query [periodo_entrada, periodo_saida, id_professor, id_escola], (error) => {
        if (error){
            throw new Error (error);
        }
        return res.status(201).json({
            title: "Alocação criada com sucesso",
        });
    });
});

//get /alocacao/:id_alocacao
app.get("/alocacao/:id_alocacao", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM alocacao WHERE id_alocacao = ?"

    const id_alocacao = req.params.id_alocacao;

    db.all(query_select, [id_alocacao], (error, rows) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Alocação retornada com sucesso.",
            alocacao: rows
        });
    });
});

//PUT /alocacao/:id_alocacao; Atualiza a alocação
app.put("/alocacao/:id_alocacao", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {periodo_entrada, periodo_saida, id_professor, id_escola} = req.body;

    const query = "UPDATE alocacao SET periodo_entrada = ?, periodo_saida = ?, id_professor = ?, id_escola = ? WHERE id_alocacao = ?";

    const id_alocacao = req.params.id_alocacao

    db.run(query, [periodo_entrada, periodo_saida, id_professor, id_escola, id_alocacao], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Alocação atualizada com sucesso."
        });
    });

});

// DELETE /alocação/:id_alocacao; Deletando uma determinada alocação da base de dados.
app.delete("/alocacao/:id_alocacao", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM alocacao WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_alocacao], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Alocação não encontrada. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM alocacao WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_alocacao], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Alocação deletada com sucesso."
        });
    });
});

//POST /escola
app.post("/escola", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {nome_escola, localidade} = req.body;

    const query = "INSERT INTO escola(nome_escola, localidade) VALUES (?, ?)";

    db.run(query [nome_escola, localidade], (error) => {
        if (error){
            throw new Error (error);
        }
        return res.status(201).json({
            title: "Escola criada com sucesso",
        });
    });
});

//get /escola/:id_escola
app.get("/escola/:id_escola", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_select = "SELECT * FROM escola WHERE id_escola = ?"

    const id_escola = req.params.id_escola;

    db.all(query_select, [id_escola], (error, rows) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Escola retornada com sucesso.",
            escola: rows
        });
    });
});

//PUT /escola/:id_escola; Atualiza a escola
app.put("/escola/:id_escola", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {nome_escola, localidade} = req.body;

    const query = "UPDATE escola SET nome_escola = ?, localidade = ? WHERE id_escola = ?";

    const id_escola = req.params.id_escola

    db.run(query, [nome_escola, localidade, id_escola], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Escola atualizada com sucesso."
        });
    });

});

// DELETE /escola/:id_escola; Deletando uma determinada escola da base de dados.
app.delete("/escola/:id_escola", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM escola WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_escola], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Escola não encontrada. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM escola WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_escola], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Escola deletada com sucesso."
        });
    });
});


// GET /aluno/turno/:turno; Juntando tabelas aluno e turma.
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
            title: "Turma criada com sucesso."
        })
    })
})

//PUT /turma/:id_turma; Atualiza a turma
app.put("/turma/:id_turma", urlencodedParser, (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const {nome_turma, turno, ano_turma, materias} = req.body;

    const query = "UPDATE turma SET nome_turma = ?, turno = ?, ano_turma = ?, materias = ? WHERE id_turma = ?";

    const id_turma = req.params.id_turma

    db.run(query, [nome_turma, turno, ano_turma, materias, id_turma], (error) => {
        if (error) {
            throw new Error (error);
        }
        return res.status(200).json({
            title: "Turma atualizada com sucesso."
        });
    });

});


// get /turma
app.get("/turma", urlencodedParser, (req, res) => {

    let db = new sqlite3.Database(DBPATH)
    const query = "SELECT id_turma, * FROM turma WHERE id_turma = ?"

    db.get(query, [req.params.id_turma], (error, rows) => {
        
    })
})

// DELETE /turma/:id_turma; Deletando uma determinada nota da base de dados.
app.delete("/turma/:id_turma", (req, res) => {
    let db = new sqlite3.Database(DBPATH);

    const query_1 = "SELECT rowid, * FROM turma WHERE rowid = ?"; // query de verificação.
    
    db.get(query_1, [req.params.id_turma], (err, rows) => { // Executando a query de verificação.
        if(err) {
            throw new Error(err);
        }

        if(!rows) {
            return res.status(404).json({
                title: "Turma não encontrada. Impossivel deletar."
            });
        };
    });

    const query = "DELETE FROM turma WHERE rowid = ?"; // query de execução.

    db.run(query, [req.params.id_turma], (error) => { // Executando a query de execução.
        if(error){
            throw new Error(error);
        }
        return res.status(200).json({
            title: "Turma deletada com sucesso."
        });
    });
});

// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})