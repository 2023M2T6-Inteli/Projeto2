async function getContents(subject, hits) {
    const response = await fetch(
      `https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`,
      {
        method: 'GET',
        headers: {
          'X-Algolia-Application-Id': '6I7NDWQ9YU',
          'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
        }
      }
    );
    const json = await response.json();
    return json.hits;
  }
  
  window.addEventListener('load', () => {
    const searchInput = document.querySelector('input[type="text"]');
    const cards = document.getElementsByClassName('conteudo-recomendado');
  
    searchInput.addEventListener('keyup', async (event) => {
      const subject = event.target.value;
      const hits = cards.length;
      const contents = await getContents(subject, hits);
  
      Array.from(cards).forEach((card, index) => {
        const titleElement = card.querySelector('h3');
        const descriptionElement = card.querySelector('p');
  
        if (index < contents.length) {
          titleElement.innerHTML = contents[index].titulo;
          descriptionElement.innerHTML = contents[index].url;
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  