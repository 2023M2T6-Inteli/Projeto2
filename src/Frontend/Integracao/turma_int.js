
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id")
const url = "http://localhost:1234/turma/" + id;


function getUser(){
    axios.get(url)
    .then(response => {
        const turmas = response.data.data;

        let turmasHtml = document.querySelector("#turmas")
        //<a class="turma">Turma 1</a>

        turmas.forEach(turma => {
            let a = document.createElement("a");
            a.classList.add("turma");
            a.innerText = "Turma " + turma.id_turma
            a.setAttribute("href", "http://127.0.0.1:5500/Frontend/turma.html?id="+turma.id_turma)

            turmasHtml.appendChild(a);
            
        });

        

    })
    .catch(error => console.log(error))
}

getUser()
