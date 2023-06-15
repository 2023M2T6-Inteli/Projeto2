// Importando as bibliotecas que serão utilizadas.
const express = require("express");
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");
const secretKey = "1234"
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;
const DBPATH = 'bd_nova_freire.db';

// Inicializando a aplicação.
const app = express();

// Definindo regras gerais da aplicação.
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/../Frontend")));


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
const aluno_endpoints = require("./aluno");
app.use("/aluno", aluno_endpoints);

// Puxando os endpoints de avaliacao.js.
const avaliacao_endpoints = require("./avaliacao");
app.use("/avaliacao", avaliacao_endpoints);

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

// Puxando os endpoints de alunos.js.
const alunos_endpoints = require("./alunos.js");
app.use("/alunos", alunos_endpoints);

// Puxando os endpoints de medias_habilidade.js.
const medias_habilidade = require("./medias_habilidade.js");
app.use("/medias_habilidade", medias_habilidade);

// Puxando os endpoints de medias.js.
const medias = require("./medias.js");
app.use("/medias", medias);

//Iniciar na página de login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/login.html"));
});

//Validação de login
app.post ("/login", (req, res) => {
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


// Inicializando o servidor.
app.listen(port, () => {
  console.log(
    "Servidor iniciado com sucesso. Escutando a porta http://localhost:" + port
  );
});
