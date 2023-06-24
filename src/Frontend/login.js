// Definindo as constantes que serão utilizas.
// O conteúdo das constantes será os dados do formulário de login.
const email = document.querySelector("#email")
const senha = document.querySelector("#senha")
const button = document.querySelector("#enviar")
const url = ''

button.addEventListener("click", async (event, err) => {
    axios.post(`http://localhost:1234/login`, {
        email: email.value,
        senha: senha.value
    }).then(function(res) {
        localStorage.setItem("token", res.data.token)
        window.location.href = "./turma.html"
    })
    .catch(function(err){
        alert("E-mail ou senha estão incorretos. Tente novamente.")
        throw new Error(err)
        
    })
})

function redirecionar(){
    window.location.href = "./turma.html"
}