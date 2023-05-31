// Definindo as constantes que serão utilizas.
// O conteúdo das constantes será os dados do formulário de login.
const email = document.querySelector("email")
const senha = document.querySelector("#senha")
const button = document.querySelector("#enviar")
const url = ''

// Pegando toda a URL
let params = new URL(document.location).searchParams;
// Puxando somente o ID da URL
let id = params.get('email', 'senha')

// Pegando dados do back com o método get()
axios.get(`http://localhost:3000/professor/${id}`).then((res) => {
    let login = res.data.login;

    email.value = login.email
    senha.value = login.senha

}).catch((err) => {
    throw new Error(err)    
});

button.addEventListener("click", async (event, err) => {
    axios.post(`http://localhost:3000/professor/${id}`, {
        email: email.value,
        senha: senha.value
    }).then(function(res) {
        console.log(res)
    })
    .catch(function(err){
        throw new Error(err)
    })
})