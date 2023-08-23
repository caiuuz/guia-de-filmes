let nomeFilmeRef = document.getElementById("nome-filme");
let buscaBtn = document.getElementById("busca-bnt");
let resultado = document.getElementById("resultado");

// função para buscar dados da API

let buscaFilme = () => {
    let nomeFilme = nomeFilmeRef.value;
    let url = `http://www.omdbapi.com/?t=${nomeFilme}&apikey=${key}`;

    // se o campo de entrada estiver vazio
    if (nomeFilme.length <= 0) {
        resultado.innerHTML = `<h3 class="msg">Insira um nome de um filme </h3>`;
    }

    // se o campo de não estiver vazio
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // se o filme existir na base de dados
            if (data.Response == "True") {
                resultado.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="avaliacao">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="detalhes">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genero">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Trama:</h3>
                    <p>${data.Plot}</p>
                    <h3>Elenco:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            // se o filme não existir na base de dados
            else {
                resultado.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            // se ocorrer um erro
            .catch(() => {
                resultado.innerHTML = `<h3 class="msg">Ocorreu um erro</h3>`;
            });
    }
};

buscaBtn.addEventListener("click", buscaFilme);
window.addEventListener("load", buscaFilme);