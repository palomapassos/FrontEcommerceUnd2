//nome do usuário
const nomeUsuario = document.querySelector('.nome-usuario');

//busca pelo filme
const pesquisaFilme = document.querySelector('#pesquisa');

//cupom
const cupom = document.querySelector('.cupom');
const timerCupom = document.querySelector('.time');
const inputCupom = document.querySelector('#cupom-desconto');

//inserindo o nome
const nome = prompt('Qual é o seu nome?');
nomeUsuario.innerText = nome;
localStorage.setItem("nomeUsuario", nome);


//Montando o timer de 5 min do cupom
let valorContagem = null;
let segundos = 60;
let minutos = 4;
let contador = 0;

const timer = () => {
    if(segundos === 0){
        minutos--;
        segundos = 59;
        timerCupom.innerText = `00:0${minutos}:${segundos}`;
    }else{
        segundos--;
        segundos < 10 ? 
            timerCupom.innerText = `00:0${minutos}:0${segundos}` : timerCupom.innerText = `00:0${minutos}:${segundos}`;
    }
}

let id = setInterval(timer, 1000);
let tempo = setTimeout(() => {
    cupom.remove();
}, 300000);

//evento de se o cupom for clicado
cupom.addEventListener("click", () => {
    inputCupom.value = 'HTMLNAOELINGUAGEM';
    cupom.remove();
})

//array global para guardar os resultados do top filmes
let topFilme = [];

//array global para guardar os resultados dos filmes por categoria na página
let filme = [];

//botoes de categorias
const botaoTodos = document.querySelector('#todos');
const botaoAcao = document.querySelector('#acao');
const botaoRomance = document.querySelector('#romance');
const botaoSciFi = document.querySelector('#sci-fi');
const botaoTerror = document.querySelector('#terror');

//pegando as listas de filmes
const topFilmes = document.querySelector('.lista-top-filmes');
const filmes = document.querySelector('.lista-filmes');

//Adicionando a sacola

//criando novos elentos da sacola


const criarElementosSacola = (idFilmeClicado) => {
    const corpoSacola = document.querySelector(".corpo-sacola");

    //criando elementos

    //poster
    const posterSacola = document.createElement("img");
    posterSacola.setAttribute("src", "imagens-desafio\\filme-teste.png");
    posterSacola.classList.add("poster-filme-sacola");

    //info filme
    const infoFilmeSacola = document.createElement("div");
    infoFilmeSacola.classList.add("info-filme-sacola");
    const tituloFilmeSacola = document.createElement("div");
    tituloFilmeSacola.classList.add("titulo-filme-sacola");
    const precoFilmeSacola = document.createElement("div");
    precoFilmeSacola.classList.add("preco-filme-sacola");
    precoFilmeSacola.innerText = "R$ ";
    const valorFilmeSacola = document.createElement("span");
    valorFilmeSacola.classList.add("valor-filme-sacola");

    //qtd filme
    const qdtFilmeSacola = document.createElement("div");
    qdtFilmeSacola.classList.add("qtd-filme-sacola");
    const addFilme = document.createElement("img");
    addFilme.setAttribute("src", "imagens-desafio\\add.png");
    addFilme.classList.add("maisFilmes");
    const numeroDeFilmes = document.createElement("span");
    numeroDeFilmes.classList.add("numero-filme-sacola");
    numeroDeFilmes.innerText = 1;
    const deleteFilme = document.createElement("img");
    deleteFilme.classList.add("menosFilmes");
    deleteFilme.setAttribute("src", "imagens-desafio\\delete.png");

    //criando a div que recebe tudo isso
    const elementoSacola = document.createElement("div");
    elementoSacola.classList.add("elemento-sacola");

    //adicinando elementos
    elementoSacola.append(posterSacola);
    infoFilmeSacola.append(tituloFilmeSacola);
    precoFilmeSacola.append(valorFilmeSacola);
    infoFilmeSacola.append(precoFilmeSacola);
    elementoSacola.append(infoFilmeSacola);
    qdtFilmeSacola.append(addFilme);
    qdtFilmeSacola.append(numeroDeFilmes);
    qdtFilmeSacola.append(deleteFilme);
    elementoSacola.append(qdtFilmeSacola);

    //adicionando elemento ao corpo da sacola
    corpoSacola.append(elementoSacola);

    //colocando as informações corretas
    passandoInfoParaSacola(idFilmeClicado);

    //passando a posicao do elemento
    const filmesSacola = Array.from(document.querySelectorAll(".numero-filme-sacola"));
    const idFilmesSacola = filmesSacola.map(x => x.id);
    let posicao = null;
    idFilmesSacola.forEach((id, i) => posicao = (id == idFilmeClicado) ? i : posicao);

    //adicionando eventos aos botoes
    addFilme.addEventListener("click", (event) => {
        eventoBotaoAdd(event, posicao);
    });


    deleteFilme.addEventListener("click", (event) => {
        eventoBotaoDelete(event, posicao);
    });

}

//Array com info dos filmes na sacola

const filmesNaSacola = [];

//pegando dados do filme selecionado
const dadosFilme = (idFilme) => {
    let selecionado = null;
    topFilme.forEach( item => item.id == idFilme ? selecionado = item : selecionado);
    filme.forEach( item => item.id == idFilme ? selecionado = item : selecionado);
    return selecionado;
}

//função atribuindo as informações corretas ao filme/elemento da sacola
const passandoInfoParaSacola = (idFilme) => {
    let selecionado = dadosFilme(idFilme);
    filmesNaSacola.push(selecionado);
    const posterSacola = document.querySelectorAll(".poster-filme-sacola");
    const tituloFilmeSacola = document.querySelectorAll(".titulo-filme-sacola");
    const valorFilmeSacola = document.querySelectorAll(".valor-filme-sacola");
    const qtdFilmeSacola = document.querySelectorAll(".numero-filme-sacola");
    const posicao = tituloFilmeSacola.length-1;
    posterSacola[posicao].setAttribute("src", selecionado.poster_path);
    tituloFilmeSacola[posicao].innerText = selecionado.title;
    valorFilmeSacola[posicao].innerText = selecionado.price;
    qtdFilmeSacola[posicao].id = idFilme;
}

//função atualizar valor do elemento 
const atualizarValorElemento = (event, qtd, posicao) => {
    const elemento = event.target;
    const divValorFilmeSacola = elemento.closest(".elemento-sacola");
    const valorFilmeSacola = divValorFilmeSacola.querySelector(".valor-filme-sacola");
    const unid = filmesNaSacola[posicao].price;
    valorFilmeSacola.innerText = unid*qtd;
    atualizarValorTotal();
}

const atualizarValorTotal = () => {
    const valoresSacola = Array.from(document.querySelectorAll(".valor-filme-sacola"));
    const valores = valoresSacola.map(x => Number(x.innerText));
    const soma = valores.reduce((acc, x) => acc+x);
    document.querySelector(".precoTotal").innerText = soma; 
    return soma;
}

const eventoBotaoAdd = (event, posicao) => {
    const elemento = event.target;
    const divQtdFilmeSacola = elemento.closest(".qtd-filme-sacola");
    const elementoFilmeSacola = divQtdFilmeSacola.querySelector(".numero-filme-sacola");
    let qtd = Number(elementoFilmeSacola.innerText) + 1;
    elementoFilmeSacola.innerText = qtd;
    atualizarValorElemento(event, qtd, posicao);
}

const eventoBotaoDelete = (event, posicao) => {
    const elemento = event.target;
    const divQtdFilmeSacola = elemento.closest(".qtd-filme-sacola");
    const elementoFilmeSacola = divQtdFilmeSacola.querySelector(".numero-filme-sacola");
    let qtd = Number(elementoFilmeSacola.innerText);
    if(qtd===1){
        const elementoFilme = elemento.closest(".elemento-sacola");
        elementoFilme.remove();
        filmesNaSacola.splice(posicao, 1);
    }else{
        qtd--;
        elementoFilmeSacola.innerText = qtd;
        atualizarValorElemento(event, qtd, posicao);
    }
}

//função aumentar qtd filme sacola
const aumentarQtdFilme = (posicao) => {
    const qtdFilmeSacola = document.querySelectorAll(".numero-filme-sacola");
    const valorFilmeSacola = document.querySelectorAll(".valor-filme-sacola");
    if(posicao!==null){
        //aumentando a qtd
        let qtd = Number(qtdFilmeSacola[posicao].innerText) + 1 ;
        qtdFilmeSacola[posicao].innerText = qtd;
        //atualizando o valor
        const unid = filmesNaSacola[posicao].price;
        valorFilmeSacola[posicao].innerText = unid*qtd;
        //atualizando o valor total
        atualizarValorTotal();
    } 
}

//função pegando os dados dos filmes da sacola

const pegarDados = () => {
    const qtdFilmeSacola = Array.from(document.querySelectorAll(".numero-filme-sacola"));
    const dadosFilmes = [];
    for(const item of qtdFilmeSacola){
        const index = dadosFilmes.indexOf(item.id);
        if(index === -1){
            dadosFilmes.push({
                filme: {
                    id: item.id,
                    qtd: item.innerText
                }
            });
        }
    }
  
    return dadosFilmes;
}

// função pegando os dados gerais da sacola
const pegarDadosGerais = (cupom) => {
    let valorTotal = atualizarValorTotal();
    let desconto = false;
    if(cupom.value === 'HTMLNAOELINGUAGEM'){
        valorTotal = valorTotal*0.5;
        desconto = true;
        alert("cupom aplicado")
    }else{
        alert("cupom inválido ou não aplicado");
    }
    return {
        valor: valorTotal,
        cupom: desconto,
        dados: filmesNaSacola
    };
}

//guardando o id do filme clicado
let idFilmeClicado = null;

//apagando conteudo do corpo da sacola
const corpoSacolaVazia = document.querySelectorAll(".corpo-sacola > *");

const addASacola = (event) => {
    const addFilmeSacola = event.target;
    idFilmeClicado = addFilmeSacola.getAttribute('id');
    let selecionado = dadosFilme(idFilmeClicado);

    for(let i=0; i<corpoSacolaVazia.length;i++){
        corpoSacolaVazia[i].remove();
    }

    const filmesSacola = Array.from(document.querySelectorAll(".numero-filme-sacola"));
    const idFilmesSacola = filmesSacola.map(x => x.id);
    let posicao = null;
    idFilmesSacola.forEach((id, i) => posicao = (id == selecionado.id) ? i : posicao);
    
    if(posicao === null){
        criarElementosSacola(idFilmeClicado);
    }else{
        aumentarQtdFilme(posicao);
    }


    //indo para página de dados
    const botaoDados = document.querySelector("#conferir-dados");
    const valorInicial = botaoDados.querySelector(".precoTotal");
    const valorFilmeSacola = document.querySelector(".valor-filme-sacola");
    // valorInicial.innerText = valorFilmeSacola.innerText;
    valorInicial.innerText = atualizarValorTotal();
    botaoDados.style.display = 'flex';
    botaoDados.addEventListener("click", () => {
    const dadosFilmes = pegarDados();
    const dadosGerais = pegarDadosGerais(inputCupom);
    console.log(dadosGerais)
    const dadosFilmesJson = JSON.stringify(dadosFilmes);
    const dadosGeraisJson = JSON.stringify(dadosGerais);
    localStorage.setItem("dadosFilmes", dadosFilmesJson);
    localStorage.setItem("dadosGerais", dadosGeraisJson);

    window.location.assign("dados.html")
    });
}


//criando elemento filme

    const criarElementoFilme = (lista) => {
    //criando a imagem
    const poster = document.createElement("img");
    poster.setAttribute("src", "imagens-desafio\\filme-teste.png");

    //criando div das informações do filme
    const infoFilme = document.createElement("div");
    infoFilme.classList.add("info-filme");
    const tituloFilme = document.createElement("span");
    tituloFilme.classList.add("titulo-filme");
    const infoNotaFilme = document.createElement("span");
    const estrela = document.createElement("img");
    estrela.setAttribute("src", 'imagens-desafio\\ic-estrela.png');
    const infoNota = document.createElement("span");
    infoNota.classList.add("nota-filme");


    //criando div sacolinha
    const divPrecoFilme = document.createElement("div");
    divPrecoFilme.classList.add("conteiner-preco-filme");
    const textoPrecoFilme = document.createElement("span");
    textoPrecoFilme.innerText = "Sacola";
    const rsPrecoFilme = document.createElement("span");
    rsPrecoFilme.innerText = "R$ ";
    const valorPrecoFilme = document.createElement("span");
    valorPrecoFilme.classList.add("preco-filme");

    //criando o elemento filme
    const elementoFilme = document.createElement("li");

    //acrescentando elementos ao elemento filme
    elementoFilme.append(poster);
    infoFilme.append(tituloFilme);
    infoNotaFilme.append(estrela);
    infoNotaFilme.append(infoNota);
    infoFilme.append(infoNotaFilme);
    elementoFilme.append(infoFilme);
    divPrecoFilme.append(textoPrecoFilme);
    rsPrecoFilme.append(valorPrecoFilme);
    divPrecoFilme.append(rsPrecoFilme);
    elementoFilme.append(divPrecoFilme);

    //inserindo o elento a lista
    lista.append(elementoFilme);

    //adicionando evento ao elemento 
    divPrecoFilme.addEventListener("click", addASacola);
    
};

//criando os elementos de top filmes
const criarElementosTopFilmes = () => {
    for(let i=0; i<5; i++){
        criarElementoFilme(topFilmes);
    }
};

criarElementosTopFilmes();

const elementosTopFilmes = document.querySelectorAll('.lista-top-filmes li');

//funcao criar elementos por categoria
const criarElementosCategorias = () => {
    for(let i=0; i<20; i++){
        criarElementoFilme(filmes);
    }
};

//função atribuindo os filmes da API 
const posicionarFilmes = (results) => {

    let elementoFilmes = null;
    const filmesLi = document.querySelector('.lista-filmes li');
    if(filmesLi === null){
        criarElementosCategorias(filmes);
    }
    const elementosFilmesCategoria = document.querySelectorAll('.lista-filmes li');
    for(let i=0; i<20; i++){
        filme.push(results[i]);
        elementoFilmes = elementosFilmesCategoria[i];
        elementoFilmes.querySelector("img").setAttribute("src", filme[i].poster_path);
        elementoFilmes.querySelector(".titulo-filme").innerText = filme[i].title;
        elementoFilmes.querySelector(".nota-filme").innerText = filme[i].vote_average;
        elementoFilmes.querySelector(".preco-filme").innerText = filme[i].price;
        elementoFilmes.querySelector(".conteiner-preco-filme").id = filme[i].id;
    }
}


//Consumindo as APIs

//API dos gêneros
fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR")
  .then(resposta => {
    return resposta.json();             
 })
 .then(respostaJson => {
    console.log(respostaJson);
 })
 
 //API dos mais populares entre todas as categorias
 fetch(" https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
  .then(resposta => {
    return resposta.json();             
 })
 .then(({results}) => {
    let elementoTopFilmes = null;
    for(let i=0; i<5; i++) {
        topFilme.push(results[i]);
        elementoTopFilmes = elementosTopFilmes[i];
        elementoTopFilmes.querySelector("img").setAttribute("src", topFilme[i].poster_path);
        elementoTopFilmes.querySelector(".titulo-filme").innerText = topFilme[i].title;
        elementoTopFilmes.querySelector(".nota-filme").innerText = topFilme[i].vote_average;
        elementoTopFilmes.querySelector(".preco-filme").innerText = topFilme[i].price;
        elementoTopFilmes.querySelector(".conteiner-preco-filme").id = topFilme[i].id;
    };

    //Todos os filmes
    botaoTodos.addEventListener("click", () => {
        filme = [];
        posicionarFilmes(results);
    });
})

//API relativa a categoria pelo id

//Filmes Acao
botaoAcao.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=28&language=pt-BR")
    .then(resposta => {
      return resposta.json();             
   })
   .then(({results}) => {
        filme = [];
        posicionarFilmes(results);
   })
})

//Filmes Romance
botaoRomance.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=10749&language=pt-BR")
    .then(resposta => {
      return resposta.json();             
   })
   .then(({results}) => {
        filme = [];
        posicionarFilmes(results);
   })
})

//Filmes Ficção Científica
botaoSciFi.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=878&language=pt-BR")
    .then(resposta => {
      return resposta.json();             
   })
   .then(({results}) => {
        filme = [];
        posicionarFilmes(results);
   })
})

//Filmes Terror
botaoTerror.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=27&language=pt-BR")
    .then(resposta => {
      return resposta.json();             
   })
   .then(({results}) => {
        filme = [];
        posicionarFilmes(results);
   })
})
