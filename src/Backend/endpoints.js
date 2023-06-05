// Importando as bibliotecas que serão utilizadas.
const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000

// Inicializando a aplicação.
const app = express();

// Definindo regras gerais da aplicação.
app.use(express.json())
app.use(cors());

// Importando o banco.
const DBPATH = 'bd_nova_freire.db'

// Iniciando a construção de endpoints
// POST /turma
app.post("/turma", urlencodedParser, (req, res) =>{
    // Criando variáveis para receber os dados da requisição.
    const {nome_turma, ano_turma} = req.body

    let db = new sqlite3.Database(DBPATH); // Abrindo o banco de dados.
    const query = "INSERT INTO turma(nome_turma, ano_turma) VALUES(?, ?)"; // Construindo a query para a requisição.

    db.run(query, [nome_turma, ano_turma], (error) =>{
        if (error) {
            res.status(500).json({error: "Erro ao criar turma."})
        }
        return res.status(200).json({
            status: "Turma criada com sucesso."
        })
    })
})


// GET /turma/:id_turma
app.get("/turma/:id_turma", urlencodedParser, (req, res) =>{
    // Pegando o id da turma.
    const id_turma = req.params.id_turma;
    
    // Fazendo a query de seleção.
    const query_selecao = "SELECT * FROM turma WHERE id_turma = ?"
    let db = new sqlite3.Database(DBPATH); // Abrindo o banco.

    db.all(query_selecao, [id_turma], (error, rows) => {
        if (error) {
            res.status(500).json({error: "Erro ao selecionar turma."})
        }
        return res.status(200).json({
            title: "Turma selecionada com sucesso.",    
            data: rows
        });
    });
});

app.get("/turmas", urlencodedParser, (req, res) =>{

    // Fazendo a query de seleção.
    const query_selecao = "SELECT nome_turma FROM turma"
    let db = new sqlite3.Database(DBPATH); // Abrindo o banco.

    db.all(query_selecao, [], (error, rows) => {
        if (error) {
            res.status(500).json({error: "Erro ao selecionar turma."})
        }
        return res.status(200).json({
            title: "Turmas selecionada com sucesso.",    
            data: rows
        });
    });
});


// PUT /turma/:id_turma
app.put("/turma/:id_turma", urlencodedParser, (req, res) =>{
    const {nome_turma, ano_turma} = req.body;
    const id_turma = req.params.id_turma;


    const query = "UPDATE turma SET nome_turma = ?, ano_turma = ? WHERE id_turma = ?";
    let db = new sqlite3.Database(DBPATH);


    db.run(query, [nome_turma, ano_turma, id_turma], (error) =>{
        if (error) {
            res.status(500).json({error: "Erro ao atualizar turma."})
        }
        return res.status(200).json({
            status: "Turma atualizada com sucesso."
        })
    })
})


// DELETE /turma/:id_turma
app.delete("/turma/:id_turma", urlencodedParser, (req, res) => {
    const query_1 = "SELECT rowid, * FROM turma WHERE rowid = ?";

    let db = new sqlite3.Database(DBPATH) // Abrindo o banco de dados.

    const id_turma = req.params.id_turma;

    db.get(query_1, [id_turma], (err, rows) => {
        if (err) {
            res.status(500).json({error: "Erro ao deletar turma."})
        }
        else if(!rows) {
            res.status(404).json({error: "Turma não encontrada."})
        }
    })
    const query = "DELETE FROM turma WHERE rowid = ?";

    db.run(query, [id_turma], (error) => {
        if (error) {
            res.status(500).json({error: "Erro ao deletar turma."})
        }
        return res.status(200).json({
            status: "Turma deletada com sucesso."
        })
    })
})

// POST  /aluno
app.post("/aluno", urlencodedParser, (req, res) => {
    const {nome_aluno} = req.body;

    const query = "INSERT INTO aluno(nome_aluno) VALUES (?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_aluno], (error) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Aluno criado com sucesso."
        })
    })
})

// GET /aluno/:id_aluno
app.get("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    const id_aluno = req.params.id_aluno;

    const query = "SELECT * FROM aluno WHERE id_aluno = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_aluno], (error, rows) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Aluno pego com sucesso.",
            data: rows
        })
    })
})

// GET /nota/aluno/:id_aluno
app.get("/aluno/nota/:id_nota", urlencodedParser, (req, res) => {
    const id_nota = req.params.id_nota;

    const query = "SELECT aluno.valor_nota, habilidade.id_habilidade FROM desempenho JOIN aluno ON aluno.id_aluno = desempenho.id_aluno JOIN habilidade ON habilidade.id_habilidade = desempenho.id_habilidade WHERE desempenho.id_nota = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_nota], (error, rows) => {
        if (error) {
            return res.json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        });
    });
});



// PUT /aluno/:id_aluno
app.put("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    const id_aluno = req.params.id_aluno;
    const {nome_aluno} = req.body;

    const query = "UPDATE aluno SET nome_aluno = ? WHERE id_aluno = ?"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_aluno, id_aluno], (error) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        return res.status(200).json({
            title: "Aluno alterado com sucesso."
        })
    })
})


// DELETE /aluno/:id_aluno
app.delete("/aluno/:id_aluno", urlencodedParser, (req, res) => {
    const id_aluno = req.params.id_aluno;

    const query_1 = "SELECT rowid, * FROM aluno WHERE rowid = ?";
    let db = new sqlite3.Database(DBPATH);

    db.get(query_1, [id_aluno], (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        }
        else if(!rows) {
            res.status(404).json({
                title: "Aluno não encontrado."
            })
        }
    })
    const query = "DELETE FROM aluno WHERE rowid = ?"

    db.run(query, [id_aluno], (error) => {
        if (error) {
            res.status(400).json({
                error: error
            })
        }
        return res.status(200).json({
            title: "Aluno removido com sucesso."
        })
    })
})


// POST habilidade
app.post("/habilidade", urlencodedParser, (req, res) => {
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
app.put("/habilidade/:id_habilidade", urlencodedParser, (req, res) => {
    const {tipo_habilidade, ano_habilidade} = req.body;
    const id_habilidade = req.params.id_habilidade;

    const query = "UPDATE habilidade SET tipo_habilidade = ? ano_habilidade = ? WHERE id_habilidade = ?"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [tipo_habilidade, ano_habilidade, id_habilidade], (error) => {
        if(error) {
            res.status(400).json({
                error: error
            })
        }
        return res.status(200).json({
            title: "Habilidade atualizada com sucesso."
        });
    });
});

// GET /habilidade/:id_habilidade
app.get("/habilidade/:id_habilidade", urlencodedParser, (req, res) => {
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
app.get("/habilidade", urlencodedParser, (req, res) => {
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
app.delete("/habilidade/:id_habilidade", urlencodedParser, (req, res) => {
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
                title: "Usuário não encontrado."
            })
        }
    });
    const query = "DELETE FROM habilidade WHERE rowid = ?";
    db.run(query, [id_habilidade], (error) => {
        if(error) {
            res.status(500).json({
                title: "Erro em deletar o usuário."
            })
        }
        return res.status(200).json({
            title: "Usuário deletado com sucesso."
        })
    })
});


// POST avaliacao
app.post("/avaliacao", urlencodedParser, (req, res) => {
    const {nome_avaliacao, data} = req.body;

    const query = "INSERT INTO avaliacao(nome_avaliacao, data) VALUES (?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_avaliacao, data], (error) => {
        if(error) {
            throw new Error(error)
        }
        return res.status(200).json({
            title: "Avaliação cadastrada com sucesso."
        })
    })
})

// PUT avaliacao/:id_avaliacao
app.put("/avaliacao/:id_avaliacao", urlencodedParser, (req, res) => {
    const {nome_avaliacao, data} = req.body;
    const id_habilidade = req.params.id_avaliacao;

    const query = "UPDATE avaliacao SET nome_avaliacao = ? data = ? WHERE id_avaliacao = ?"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_avaliacao, data, id_habilidade], (error) => {
        if(error) {
            res.status(500).json({
                title: "Não foi possível atualizar o usuário."
            })
        }
        return res.status(200).json({
            title: "Usuário atualizado com sucesso."
        })
    })
})

// GET /avaliacao/:id_avaliacao
app.get("/avaliacao/:id_avaliacao", urlencodedParser, (req, res) => {
    const id_avaliacao = req.params.id_avaliacao;

    const query = "SELECT rowid, * FROM avaliacao WHERE id_avaliacao = ?"
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_avaliacao], (error, rows) => {
        if (error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Avaliação pega com sucesso.",
            data: rows
        })
    })
})

// GET /avaliacao
app.get("/avaliacao", urlencodedParser, (req, res) => {
    const id_avaliacao = req.params.id_avaliacao;

    const query = "SELECT * FROM avaliacao";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [id_avaliacao], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Avaliações pegas com sucesso.",
            data: rows
        })
    })
})

// DELETE /avaliacao/:id_avaliacao
app.delete("/avaliacao/:id_avaliacao", urlencodedParser, (req, res) => {
    const id_avaliacao = req.params.id_avaliacao;

    const query_selecao = "SELECT rowid, * FROM avaliacao WHERE id_avaliacao = ?"
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_avaliacao], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        else if(!rows) {
            res.status(200).json({
                title: "Avaliação não encontrada."
            })
        }
    })
    
    const query = "DELETE FROM avaliacao WHERE id_avaliacao = ?";
    db.run(query, [id_avaliacao], (error) => {
        if(error) {
            res.status(500).json({
                title: "Impossivel deletar usuário."
            })
        }
        return res.status(200).json({
            title: "Usuário deletado com sucesso."
        })
    })
})


// POST professor
app.post("/professor", urlencodedParser, (req, res) => {
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
app.put("/professor/:id_professor", urlencodedParser, (req, res) => {
    const {nome_professor, email, senha, cargo, celular, cep, idade} = req.body;
    const id_professor = req.params.id_professor;

    const query = "UPDATE professor SET nome_professor = ? email = ? senha = ? cargo = ? celular = ? cep = ? idade = ? WHERE id_professor = ?"
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_professor, email, senha, cargo, celular, cep, idade, id_professor], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Perfil atualizado com sucesso."
        })
    })
})

// GET /professor/:id_professor
app.get("/professor/:id_professor", (req, res) => {
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
app.delete("/professor/:id_professor", urlencodedParser, (req, res) => {
    const id_professor = req.params.id_professor;

    const query_selecao = "SELECT rowid, * FROM professor WHERE id_professor = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_professor], (error, rows) => {
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


// POST escola
app.post("/escola", urlencodedParser, (req, res) => {
    const {nome_escola} = req.body;
    
    const query = "INSERT INTO escola(nome_escola) VALUES(?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [nome_escola], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola criada com sucesso."
        })
    })
})

// PUT /escola/:id_escola
app.put("/escola/:id_escola", urlencodedParser, (req, res) => {
    const id_escola = req.params.id_escola;
    const {nome_escola} = req.body;

    const query = "UPDATE escola SET nome_escola = ? WHERE id_escola = ?";
    let db = new sqlite3.Database(DBPATH)
    db.run(query, [nome_escola, id_escola], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola alterada com sucesso."
        })
    })
})


// GET /escola/:id_escola
app.get("/escola/:id_escola", urlencodedParser, (req, res) => {
    const id_escola = req.params.id_escola;

    const query = "SELECT rowid, * FROM escola WHERE id_escola = ?";
    let db = new sqlite3.Database(DBPATH);
    db.all(query, [id_escola], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola encontrada.",
            data: rows
        })
    })
})

// DELETE /escola/:id_escola
app.delete("/escola/:id_escola", urlencodedParser, (req, res) => {
    const id_escola = req.params.id_escola;

    const query_selecao = "SELECT rowid, * FROM escola WHERE id_escola = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_escola], (error, rows) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        if(!rows) {
            return res.status(404).json({
                title: "Escola não encontrado."
            })
        }
    })
    const query = "DELETE FROM escola WHERE id_escola = ?"
    db.run(query, [id_escola], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Escola deletado com sucesso."
        })
    })
})


// GET /registro/:id_registro
app.get("/registro/:id_registro", urlencodedParser, (req, res) => { // Iniciando o caminho da requisição.

    let db = new sqlite3.Database(DBPATH) // Abrindo o banco de dados
    const query = "SELECT registro.id_registro, turma.id_turma, aluno.id_aluno FROM registro JOIN aluno ON registro.id_aluno = aluno.id_aluno JOIN turma ON registro.id_turma = turma.id_turma WHERE registro.id_registro = ?";

    db.get(query, [req.params.id_registro], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Registro pego com sucesso.",
            data: rows
        })
    })
})

// GET /questao-habilidade/:id_questao_habilidade
app.get("/questao-habilidade/:id_questao_habilidade", urlencodedParser, (req, res) =>{
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

// POST /questao
app.post("/questao", urlencodedParser, (req, res) => {
    const {numero, id_avaliacao} = req.body;
    
    const query = "INSERT INTO questao(numero, id_avaliacao) VALUES(?, ?)";
    let db = new sqlite3.Database(DBPATH);
    
    db.run(query, [numero, id_avaliacao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão criada com sucesso."
        });
    });
});

// PUT /questao/id_questao
app.put("/questao/:id_questao", urlencodedParser, (req, res) => {
    const {numero} = req.body;
    const id_questao = req.params.id_questao;

    const query = "UPDATE questao SET numero = ? WHERE id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [numero, id_questao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão atualizada com sucesso."
        });
    });
});


// GET /questão/:id_questao
app.get("/questao/:id_questao", urlencodedParser, (req, res) => {
    const id_questao = req.params.id_questao;

    const query = "SELECT rowid, * FROM questao WHERE id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_questao], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão pega com sucesso.",
            data: rows
        })
    })
})

// GET /questão/:id_questao
app.get("/questao", urlencodedParser, (req, res) => {

    const query = "SELECT * FROM questao";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão pega com sucesso.",
            data: rows 
        })
    })
})

// DELETE /questao/:id_questao
app.delete("/questao/:id_questao", urlencodedParser, (req, res) => {
    const id_questao = req.params.id_questao;

    const query_selecao = "SELECT rowid, * FROM questao WHERE id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query_selecao, [id_questao], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        else if(!rows) {
            return res.status(404).json({
                title: "Questão não encontrada."
            })
        }
    })

    const query = "DELETE FROM questao WHERE id_questao = ?";
    db.run(query, [id_questao], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Questão deletada com sucesso."
        })
    })
})

// GET /medias/:id_turma
app.get('/medias/:id_turma', urlencodedParser, (req, res) => {
    const id_turma = req.params.id_turma;

    const query = `SELECT av.data, AVG(n.valor_nota) AS media_notas
    FROM nota n
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN avaliacao av ON q.id_avaliacao = av.id_avaliacao
    JOIN turma t ON av.id_turma = t.id_turma
    WHERE t.id_turma = ?
    GROUP BY av.id_avaliacao`;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_turma], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows
        })
    })
})

app.get('/medias_habilidades', urlencodedParser, (req, res) =>{ //DANDO ERRO
   
    const query = `SELECT h.tipo_habilidade, AVG(n.valor_nota) AS media_habilidade
    FROM nota n
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN questao_habilidade qh ON q.id_questao = qh.id_questao_habilidade
    JOIN habilidade h ON qh.id_habilidade = h.id_habilidade
    GROUP BY h.tipo_habilidade`;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows 
        })
    });
});

app.get('/progresso', (req, res) =>{
    const query = `SELECT AVG(valor_nota) AS progresso
    FROM nota`

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows 
        })  
    })
})

app.get('/defasagens', (req, res) =>{
    const query = `SELECT h.tipo_habilidade, COUNT(*) AS num_alunos
    FROM nota n
    JOIN questao q ON n.id_questao = q.id_questao
    JOIN questao_habilidade qh ON q.id_questao = qh.id_questao_habilidade
    JOIN habilidade h ON qh.id_habilidade = h.id_habilidade
    WHERE n.valor_nota < 5
    GROUP BY h.tipo_habilidade
    ORDER BY COUNT(*) ASC
    LIMIT 3;
    `;

    let db = new sqlite3.Database(DBPATH);

    db.all(query, [], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            data: rows 
        })  
    })
})

// POST /nota
app.post("/nota", urlencodedParser, (req, res) => {
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
app.put("/nota/:id_nota", urlencodedParser, (req, res) => {
    const id_nota = req.params.id_nota;
    const {valor_nota, id_aluno, id_questao} = req.body;

    const query = "UPDATE nota SET valor_nota = ? id_aluno = ? id_questao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_nota, id_aluno, id_questao, id_nota], (error) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Nota atualizada com sucesso."
        })
    })
})

app.get("/nota/:valor_nota", urlencodedParser, (req, res) => {
    const valor_nota = req.params.valor_nota;

    const query = "SELECT valor_nota >= valor_nota FROM nota";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [valor_nota], (error, rows) => {
        if (error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Lista de alunos com notas.",
            data: rows
        })
    })
})

// DELETE /nota/:id_nota
app.delete("/nota/:id_nota", urlencodedParser, (req, res) => {
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


// POST /desempenho
app.post("/desempenho", urlencodedParser, (req, res) => {
    const {valor_desempenho, id_aluno, id_habilidade} = req.body;

    const query = "INSERT INTO desempenho (valor_desempenho, id_aluno, id_habilidade) VALUES (?, ?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_desempenho, id_aluno, id_habilidade], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Desempenho adicionado com sucesso."
        })
    })
})


// GET /desempenho/id_desempenho
app.get("/desempenho/:id_desempenho", urlencodedParser, (req, res) => {
    const id_desempenho = req.params.id_desempenho;

    const query = "SELECT rowid, * FROM desempenho WHERE id_desempenho = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_desempenho], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Desempenho encontrado.",
            data: rows
        })
    })
})


// PUT /desempenho/:id_desempenho
app.put("/desempenho/:id_desempenho", urlencodedParser, (req, res) => {
    const id_desempenho = req.params.id_desempenho;
    const {valor_desempenho, id_aluno, id_habilidade} = req.body

    const query = "UPDATE desempenho SET valor_desempenho = ? id_aluno = ? id_habilidade = ?";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [valor_desempenho, id_aluno, id_habilidade, id_desempenho], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Desempenho atualizado com sucesso."
        })
    })
})

// POST /alocacao
app.post("/alocacao", urlencodedParser, (req, res) => {
    const {id_professor, id_escola, id_turma} = req.body;

    const query = "INSERT INTO alocacao(id_professor, id_escola, id_turma) VALUES = (?, ?, ?)";
    let db = new sqlite3.Database(DBPATH);

    db.run(query, [id_professor, id_escola, id_turma], (error) => {
        if(error) {
            res.status(500).json({ error: error })
        }
        return res.status(200).json({
            title: "Alocação adicionada com sucesso."
        })
    })
})
// GET /alocacao/:id_alocacao
app.get("/alocacao/:id_alocacao", urlencodedParser, (req, res) => {
    const id_alocacao = req.params.id_alocacao;

    const query = "SELECT rowid, * FROM alocacao WHERE id_alocacao = ?";
    let db = new sqlite3.Database(DBPATH);

    db.all(query, [id_alocacao], (error, rows) => {
        if(error) {
            res.json({ error: error });
        }
        return res.status(200).json({
            title: "Alocação encontrada.",
            data: rows
        })
    })
})

// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})