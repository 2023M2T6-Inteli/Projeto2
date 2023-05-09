BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "turma" (
	"id_turma"	INTEGER NOT NULL,
	"nome_turma"	TEXT NOT NULL,
	"turno"	TEXT NOT NULL,
	"ano_turma"	INTEGER NOT NULL,
	"materias"	TEXT NOT NULL,
	PRIMARY KEY("id_turma" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "professor" (
	"id_professor"	INTEGER NOT NULL,
	"nome_professor"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"senha"	INTEGER NOT NULL,
	"cargo"	TEXT NOT NULL,
	"celular"	INTEGER NOT NULL,
	"cep"	INTEGER NOT NULL,
	"idade"	INTEGER NOT NULL,
	PRIMARY KEY("id_professor" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "escola" (
	"id_escola"	INTEGER NOT NULL,
	"nome_escola"	TEXT NOT NULL,
	"localidade"	TEXT NOT NULL,
	PRIMARY KEY("id_escola" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "alocacao" (
	"id_alocacao"	INTEGER NOT NULL,
	"periodo_entrada"	INTEGER NOT NULL,
	"periodo_saida"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	"id_escola"	INTEGER NOT NULL,
	PRIMARY KEY("id_alocacao" AUTOINCREMENT),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor"),
	FOREIGN KEY("id_escola") REFERENCES "escola"("id_escola")
);
CREATE TABLE IF NOT EXISTS "aluno" (
	"id_aluno"	INTEGER NOT NULL,
	"nome_aluno"	TEXT NOT NULL,
	"situacao"	INTEGER NOT NULL,
	"forcas"	TEXT NOT NULL,
	"defasagens"	TEXT NOT NULL,
	PRIMARY KEY("id_aluno" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "registro" (
	"id_registro"	INTEGER NOT NULL,
	"id_turma"	INTEGER NOT NULL,
	"id_aluno"	INTEGER NOT NULL,
	PRIMARY KEY("id_registro" AUTOINCREMENT),
	FOREIGN KEY("id_turma") REFERENCES "turma"("id_turma"),
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno")
);
CREATE TABLE IF NOT EXISTS "avaliacao" (
	"id_avaliacao"	INTEGER NOT NULL,
	"tipo_avaliacao"	TEXT NOT NULL,
	"periodo"	TEXT NOT NULL,
	PRIMARY KEY("id_avaliacao" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "nota" (
	"id_nota"	INTEGER NOT NULL,
	"valor_nota"	INTEGER NOT NULL,
	"id_aluno"	INTEGER NOT NULL,
	"id_avaliacao"	INTEGER NOT NULL,
	PRIMARY KEY("id_nota" AUTOINCREMENT),
	FOREIGN KEY("id_avaliacao") REFERENCES "avaliacao"("id_avaliacao"),
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno")
);
CREATE TABLE IF NOT EXISTS "habilidade" (
	"id_habilidade"	INTEGER NOT NULL,
	"tipo_habilidade"	TEXT NOT NULL,
	"materia_habilidade"	TEXT NOT NULL,
	"ano_habilidade"	INTEGER NOT NULL,
	PRIMARY KEY("id_habilidade" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "desempenho" (
	"id_desempenho"	INTEGER NOT NULL,
	"valor_desempenho"	INTEGER NOT NULL,
	"id_aluno"	INTEGER NOT NULL,
	"id_habilidade"	INTEGER NOT NULL,
	PRIMARY KEY("id_desempenho" AUTOINCREMENT),
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno"),
	FOREIGN KEY("id_habilidade") REFERENCES "habilidade"("id_habilidade")
);
COMMIT;
