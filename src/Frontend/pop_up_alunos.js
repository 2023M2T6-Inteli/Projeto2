function popUpOpen(){
    document.getElementById("pop_up_alunos").style.display = "block";
    document.getElementById("darkOverlay").style.display = "block";
}

function popUpClose(){
    document.getElementById("pop_up_alunos").style.display = "none";
    document.getElementById("darkOverlay").style.display = "none";
}

function popUpOpenDeletar(id_aluno){
    document.getElementById("pop_up_deletar").style.display = "block";
    document.getElementById("darkOverlay").style.display = "block";
    document.getElementById("aviso_deletar").innerHTML = `<p id="aviso">Deseja realmente deletar o aluno? Essa é uma ação irreversível que removerá todos os dados registrados do aluno.</p>
    <input id="botao_deletar" class="botao" type="submit" value="Deletar" onclick="alunos.delete(${id_aluno})">`
}

function popUpCloseDeletar(){
    document.getElementById("pop_up_deletar").style.display = "none";
    document.getElementById("darkOverlay").style.display = "none";
}

