$(document).ready(() => {
    alunos.list();
    turmas.list();
});

var coll = document.getElementById("botao_sobre");
var i;

function abrir(id_aluno) {
    var sobre_aluno = document.getElementById('sobre_aluno'+id_aluno);
    var botao_sobre = document.getElementById('botao_sobre'+id_aluno);
    

    if (sobre_aluno.style.maxHeight){
      sobre_aluno.style.maxHeight = null;
      botao_sobre.innerHTML = "+"

    } else {
      sobre_aluno.style.maxHeight = "200px";
      botao_sobre.innerHTML = "-"
  };
}

var alunos = {
    list() {
        $.ajax({
            url: 'http://127.0.0.1:1234/alunos/1',
            type: 'GET',
            success: function(response) {
                var data = response.data;

                var alunos_nome = data.map(function(item) {
                    return item.nome_aluno;
                });

                var media = data.map(function(item) {
                    return item.media_aluno;
                });

                var id_aluno = data.map(function(item){
                    return item.id_aluno;
                })


                var tx1 = `<div class="item">
                <p class="nome"><strong>Aluno</strong><button class="mais" id="mais_alunos" onclick="popUpOpen()">+</button></p>
                <div class="situacao" style="padding-top: 10px"><strong>Situação</strong></div>
                <div class="progresso" style="padding-top: 10px">Média</div>
            </div>`;
            
                alunos_nome.forEach(function(element, index) {
                    var ballClass, barClass;

                    if (media[index] >= 8) {
                        ballClass = "greenBall";
                        barClass = "greenBar";
                    } else if (media[index] >= 5) {
                        ballClass = "yellowBall";
                        barClass = "yellowBar";
                    } else if (media[index] < 5) {
                        ballClass = "redBall";
                        barClass = "redBar";
                    }

                    tx1 += `
                    <hr>
                    <div class="aluno_container">
                        <div class="item" id="item1"> 
                            <p class="nome">${element}</p>
                            <div class="situacao">
                                <div class="${ballClass}"></div>
                            </div>
                            <div class="progresso">
                                <div style="font-size: 18px" id="porcentagem">${media[index]*10}%</div>
                            </div>
                        </div>
                        <div class="sobre_aluno" id="sobre_aluno${id_aluno[index]}">
                            <br>
                            <div id="forcas"> <strong>Forças</strong>: EF05MA1, EF05MA2, EF05MA3</div>
                            <br>
                            <div id="defasagens"><strong>Defasagens</strong>: EF05MA4, EF05MA5, EF05MA6</div>   
                            <br>
                            <button class="deletar" id="deletar_aluno${id_aluno[index]}" onclick="popUpOpenDeletar(${id_aluno[index]})">Deletar Aluno</button>
                        </div>
                    </div>
                    <button class="toggle" id="botao_sobre${id_aluno[index]}" onclick="abrir(${id_aluno[index]})">+</button>`;

                    
                    
                });
                tx1 += `<br>`

                $('.row').html(tx1);
                
            }
        });
    },

    insert(){
        var nome_aluno = document.body.querySelector('#nome_aluno').value;
        var id_turma = document.querySelector('#id_turma').value;

        console.log(`${nome_aluno} - ${id_turma}`);

        if (nome_aluno && id_turma){
            if (nome_aluno.trim() != '' && id_turma.trim() != ''){
                $.ajax({
                    url: 'http://127.0.0.1:1234/aluno',
                    type: 'POST',
                    data: {nome_aluno: nome_aluno, id_turma: id_turma},
                }).done(function () {
                    alunos.list();
                }).fail(function (){
                    console.log('FAIL');
                }).always(function (){
                    console.log('ALWAYS');
                })
            }
            }
        },
        delete(id_aluno){
            $.ajax({
                url: 'http://127.0.0.1:1234/aluno/' + id_aluno,
                type: 'DELETE',
            }).done(function (){
                //alunos.list();
            }).fail(function (){
                console.log('FAIL');
            }).always(function (){
                console.log('ALWAYS');
            })
        }
        
};

var turmas = {
    list() {
        $.ajax({
            url: "http://127.0.0.1:1234/turma",
            type: "GET",
            success: function(response) {
                var data = response.data;

                var nome_turma = data.map(function(item) {
                    return item.nome_turma;
                });

                var id_turma = data.map(function(item){
                    return item.id_turma
                })

                var tx2 = ''

                nome_turma.forEach(function(element, index){
                    tx2 += `<option value="${id_turma[index]}">${element}</option>`
                })

                $('#id_turma').html(tx2)
                
            }
        })
        
    }
}