
//recebendo os dados do carrinho da página index
const dadosFilmes = localStorage.getItem("dadosFilmes");

const dadosFilmesSacola = JSON.parse(dadosFilmes);

console.log(dadosFilmesSacola);

const dadosGerais = localStorage.getItem("dadosGerais");

const dadosGeraisSacola = JSON.parse(dadosGerais);

console.log(dadosGeraisSacola);


//funções dos botões
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

//função atualizar valor do elemento 
const atualizarValorElemento = (event, qtd, posicao) => {
    const elemento = event.target;
    const divValorFilmeSacola = elemento.closest(".elemento-sacola");
    const valorFilmeSacola = divValorFilmeSacola.querySelector(".valor-filme-sacola");
    const unid = dadosGeraisSacola.dados[posicao].price;
    valorFilmeSacola.innerText = unid*qtd;
    atualizarValorTotal();
}

const atualizarValorTotal = () => {
    const cupom = dadosGeraisSacola.cupom;
    if(cupom){
        const valoresSacola = Array.from(document.querySelectorAll(".valor-filme-sacola"));
        const valores = valoresSacola.map(x => Number(x.innerText));
        let soma = valores.reduce((acc, x) => acc+x);
        document.querySelector(".precoTotal").innerText = soma*0.5; 
        return soma*0.5;
    }else{
        const valoresSacola = Array.from(document.querySelectorAll(".valor-filme-sacola"));
        const valores = valoresSacola.map(x => Number(x.innerText));
        let soma = valores.reduce((acc, x) => acc+x);
        document.querySelector(".precoTotal").innerText = soma; 
        return soma;
    }
}

//cupom

const inputCupom = document.querySelector("#cupom-desconto");

//função desconto
const desconto = () => {
    if(dadosGeraisSacola.cupom === false){
        if(inputCupom === 'HTMLNAOELINGUAGEM'){
            dadosGeraisSacola.cupom = true;
            atualizarValorTotal();
        }else{
            alert("cupom inválido");
        }
    }else{
        alert("Você não pode inserir o mesmo cupom duas vezes");
    }
}

//criando os elementos
const criarElementosSacola = (posicao) => {
    const corpoSacola = document.querySelector(".corpo-sacola-dados");
    
    const infoElemento = dadosGeraisSacola.dados[posicao];
    const qtdElemento = dadosFilmesSacola[posicao].filme.qtd;

    //criando elementos

    //poster
    const posterSacola = document.createElement("img");
    posterSacola.setAttribute("src", infoElemento.poster_path);
    posterSacola.classList.add("poster-filme-sacola");

    //info filme
    const infoFilmeSacola = document.createElement("div");
    infoFilmeSacola.classList.add("info-filme-sacola");
    const tituloFilmeSacola = document.createElement("div");
    tituloFilmeSacola.classList.add("titulo-filme-sacola");
    tituloFilmeSacola.innerText = infoElemento.title;
    const precoFilmeSacola = document.createElement("div");
    precoFilmeSacola.classList.add("preco-filme-sacola");
    precoFilmeSacola.innerText = "R$ ";
    const valorFilmeSacola = document.createElement("span");
    valorFilmeSacola.classList.add("valor-filme-sacola");
    valorFilmeSacola.innerText = (infoElemento.price*qtdElemento);

    //qtd filme
    const qdtFilmeSacola = document.createElement("div");
    qdtFilmeSacola.classList.add("qtd-filme-sacola");
    const addFilme = document.createElement("img");
    addFilme.setAttribute("src", "imagens-desafio\\add.png");
    addFilme.classList.add("maisFilmes");
    const numeroDeFilmes = document.createElement("span");
    numeroDeFilmes.classList.add("numero-filme-sacola");
    numeroDeFilmes.innerText = qtdElemento;
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


    //adicionando eventos aos botoes
    addFilme.addEventListener("click", (event) => {
        eventoBotaoAdd(event, posicao);
    });


    deleteFilme.addEventListener("click", (event) => {
        eventoBotaoDelete(event, posicao);
    });

    //evento do input
    inputCupom.addEventListener("blur", () => {
        desconto();
    })

}

for(let i=0; i<dadosFilmesSacola.length; i++){
    criarElementosSacola(i);
}


//conferindo se os dados estão preenchidos

const botaoComprar = document.querySelector("#finalizar-compra");

document.querySelector(".precoTotal").innerText = dadosGeraisSacola.valor;

botaoComprar.addEventListener("click", () => {
    const inputsDados = document.querySelectorAll('.conteudo input');
    let preenchido = false;
    inputsDados.forEach((item, i) => {
        preenchido = item.value ? true : false;
    })
    if(preenchido){
        window.location.assign("compra.html")
    }else{
        alert("Dados incompletos. Preencha novamente.");
    }
})
