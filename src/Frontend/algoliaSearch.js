/**
 * @param {string} Assunto para pesquisar
 * @param {number} Número de hits a retornar
 * 
 * @returns {array} - Array de hits
 *
 */
async function getContents(subject, hits) {
    // fetch na URL de busca do Algolia com query params
    const response = await fetch(`https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`, {
        method: 'GET',
        headers: {
            // Headers necessários para autenticação no Algolia
            'X-Algolia-Application-Id': '6I7NDWQ9YU',
            'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
        }
    });
    // Transforma a resposta em JSON
    const json = await response.json();
    // Retorna o array de hits
    return json.hits;
}

// Ao carregar a tela executa na tela os conteúdos recomendados com os links de acesso.
window,addEventListener('load', () => {
    let search = window.location.search
    let query = new URLSearchParams(search)
    let subject = query.get('habilidade') // Assunto para pesquisar

    let cards = document.getElementsByClassName('conteudo-recomendado')
    let hits = cards.length
    let contador = 0
    // Chama a função getContents com os parâmetros SUBJECT e HITS
    getContents(subject, hits).then((contents) => {
        // Para cada elemento do array contents, imprime o título e a URL
        contents.forEach(element => {
            cards[contador].querySelector('h3').innerHTML = element.titulo
            cards[contador].querySelector('p').innerHTML = element.url 
            contador++
        });
    });
})

