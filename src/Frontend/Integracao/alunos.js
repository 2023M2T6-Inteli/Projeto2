$(document).ready(() => {
    alunos.list();
});

var alunos = {
    list() {
        $.ajax({
            url: 'http://127.0.0.1:3000/alunos',
            type: 'GET',
            success: function(response) {
                var data = response.data;

                var alunos_nome = data.map(function(item) {
                    return item.nome_aluno;
                });

                var media = data.map(function(item) {
                    return item.media_aluno;
                });

                console.log(alunos_nome);
                console.log(media);

                var tx = `
                    <div class="item">
                        <p class="nome"><strong>Nome</strong><button class="mais">+</button></p>
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
                    } else {
                        ballClass = "redBall";
                        barClass = "redBar";
                    }

                    tx += `
                        <hr>
                        <div class="item">
                            <p class="nome">${element}</p>
                            <div class="situacao">
                                <div class="${ballClass}"></div>
                            </div>
                            <div class="progresso">
                                <div style="font-size: 18px">${media[index]*10}%</div>
                            </div>
                        </div>
                        `;
                });
                tx += `<br>`

                $('.row').html(tx);
            }
        });
    }
};
