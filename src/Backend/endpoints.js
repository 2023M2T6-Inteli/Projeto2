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

// Puxando os endpoints de alocacao.js.
const alocacao_endpoints = require("./alocacao.js");
app.use("/alocacao", alocacao_endpoints);

// Puxando os endpoints de turma.js.
const turma_endpoints = require("./turma.js");
app.use("/turma", turma_endpoints);

// Puxando os endpoints de turmas.js;
const turmas_endpoints = require("./turmas.js");
app.use("/turmas", turmas_endpoints);

// Puxando os endpoints alunos.js.
const alunos_endpoints = require("./aluno");
app.use("/aluno", alocacao_endpoints);

// Puxando os endpoints de avaliacao.js.
const avaliacao_endpoints = require("./avaliacao");
app.use("/avaliacao", alocacao_endpoints);

// Puxando os endpoints de desempenho.js.
const desempenho_endpoints = require("./desempenho");
app.use("/desempenho", desempenho_endpoints);

// Puxando os endpoints de escola.js.
const escola_endpoints = require("./desempenho.js");
app.use("/escola", escola_endpoints);

// Puxando os endpoints de habilidades.js.
const habilidade_endpoints = require("./habilidade.js");
app.use("/habilidade", habilidade_endpoints);

// Puxando os endpoints de nota.js.
const nota_endpoints = require("./nota.js");
app.use("/nota", nota_endpoints);

// Puxando os endpoints de professor.js.
const professor_endpoints = require("./professor.js");
app.use("/professor", professor_endpoints);

// Puxando os endpoints de progresso.js.
const progresso_endpoints = require("./progresso.js");
app.use("/progresso", progresso_endpoints);

// Puxando os endpoints de questao_habilidade.js.
const questao_habilidade_endpoints = require("./questao_habilidade.js");
app.use("/questao-habilidade", questao_habilidade_endpoints);

// Puxando os endpoints de questao.js.
const questao_endpoints = require("./questao.js");
app.use("/questao", questao_endpoints);

// Puxando os endpoints de registro.js.
const registro_endpoints = require("./registro.js");
app.use("/registro", registro_endpoints);

// Puxando os endpoints de defasagens.js.
const defasagens_endpoints = require("./defasagens.js");
app.use("/defasagens", defasagens_endpoints);

// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})