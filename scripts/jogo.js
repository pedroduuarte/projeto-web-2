const palavras = [
    { palavra: "abacaxi", imagem: "../assets/abacaxi.jpg" },
    { palavra: "abelha", imagem: "../assets/abelha.jpg" },
    { palavra: "arvore", imagem: "../assets/arvore.jpg" },
    { palavra: "avião", impagem: "../assets/aviao.jpg" },
    { palavra: "banana", imagen: "../assets/banana.jpg" },
    { palavra: "bola", imagem: "../assets/bola.jpg" },
    { palavra: "cachorro", imagem: "../assets/cachorro.jpg" },
    { palavra: "cadeira", imagem: "../assets/cadeira.jpg" },
    { palavra: "cama", imagem: "../assets/cama.jpg" },
    { palavra: "carro", imagem: "../assets/carro.jpg" },
    { palavra: "casa", imagem: "../assets/casa.jpg" },
    { palavra: "controle", imagem: "../assets/controle.jpg" },
    { palavra: "coelho", imagem: "../assets/coelho.jpg" },
    { palavra: "coxinha", imagem: "../assets/coxinha.jpg" },
    { palavra: "dinossauro", imagem: "../assets/dinossauro.jpg" },
    { palavra: "elefante", imagem: "../assets/elefante.jpg" },
    { palavra: "flor", imagem: "../assets/flor.jpg" },
    { palavra: "garfo", imagem: "../assets/garfo.jpg" },
    { palavra: "gato", imagem: "../assets/gato.jpg" },
    { palavra: "girafa", imagem: "../assets/girafa.jpg" },
    { palavra: "golfinho", imagem: "../assets/golfinho.jpg" },
    { palavra: "lápis", imagem: "../assets/lapis.jpg" },
    { palavra: "leão", imagem: "../assets/leao.jpg" },
    { palavra: "livro", imagem: "../assets/livro.jpg" },
    { palavra: "macaco", imagem: "../assets/macaco.jpg" },
    { palavra: "mesa", imagem: "../assets/mesa.jpg" },
    { palavra: "mochila", imagem: "../assets/mochila.jpg" },
    { palavra: "morango", imagem: "../assets/morango.jpg" },
    { palavra: "pinguim", imagem: "../assets/pinguim.jpg" },
    { palavra: "pipoca", imagem: "../assets/pipoca.jpg" },
    { palavra: "relógio", imagem: "../assets/relogio.jpg" },
    { palavra: "sapato", imagem: "../assets/sapato.jpg" },
    { palavra: "sol", imagem: "../assets/sol.jpg" },
    { palavra: "tartaruga", imagem: "../assets/tartaruga.jpg" },
    { palavra: "tigre", imagem: "../assets/tigre.jpg" },
    { palavra: "uva", imagem: "../assets/uva.jpg" },
    { palavra: "vaca", imagem: "../assets/vaca.jpg" },
    { palavra: "zebra", imagem: "../assets/zebra.jpg" },
]


let palavraAtual = {};
let letrasEscolhidas = [];
let palavraParcial = [];
let indicesFaltando = [];
const mensagem = document.getElementById("exibicao-resultado");

function iniciar() {
    // seleciona uma palavra aleatória
    const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
    palavraAtual = palavraSorteada;

    // atualiza a imagem
    document.getElementById("imagem-palavra").src = palavraAtual.imagem;

    criarPalavraIncompleta();
    criarLetras();

    // limpa mensagens anteriores
    mensagem.innerText = "";
    mensagem.classList.remove("correta", "incorreta");
}

function criarLetras() {
    const letrasContainer = document.getElementById("letras-container");
    letrasContainer.innerHTML = "";

    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ".split("");

    // exibição em duas linhas
    const linha1 = document.createElement("div");
    const linha2 = document.createElement("div");
    linha1.classList.add("linha-letras");
    linha2.classList.add("linha-letras");

    alfabeto.forEach((letra, index) => {
        const botaoLetra = document.createElement("button");
        botaoLetra.innerText = letra;
        botaoLetra.onclick = () => verificarLetra(letra);
        if (index < 14) linha1.appendChild(botaoLetra);
        else linha2.appendChild(botaoLetra);
    });

    letrasContainer.appendChild(linha1);
    letrasContainer.appendChild(linha2);
}

function criarPalavraIncompleta() {
    const palavra = palavraAtual.palavra;
    const letras = palavra.split("");

    // define quantas letras esconder com base no tamanho da palavra
    let qtdOcultas = 2;
    if (letras.length > 6 && letras.length <= 9) {
        qtdOcultas = 3;
    } 
    else if (letras.length > 9) {
        qtdOcultas = 4;
    } 

    indicesFaltando = [];

    while (indicesFaltando.length < qtdOcultas) {
        const indice = Math.floor(Math.random() * letras.length);
        if (!indicesFaltando.includes(indice)) {
            indicesFaltando.push(indice);
        }
    }

    palavraParcial = letras.map((letra, i) =>
        indicesFaltando.includes(i) ? "_" : letra
    );

    document.getElementById("palavra-container").innerHTML = palavraParcial.join(" ");
}

function removerAcentos(letra) {
    return letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function verificarLetra(letra) {
    let acertou = false;
    mensagem.classList.remove("correta", "incorreta");

    indicesFaltando.forEach((i) => {
        const letraPalavra = palavraAtual.palavra[i];

        // compara ignorando acentos
        if (removerAcentos(letraPalavra).toUpperCase() === letra.toUpperCase()) {
            palavraParcial[i] = letraPalavra; 
            acertou = true;
        }
    });

    atualizarPalavra();

    if (acertou) {
        mensagem.textContent = "✅ Letra correta!";
        mensagem.classList.add("correta");

        // remove índices já preenchidos
        indicesFaltando = indicesFaltando.filter(i => palavraParcial[i] === "_");

        // se completou a palavra
        if (!palavraParcial.includes("_")) {
            mensagem.textContent = "🎉 Parabéns! Você completou a palavra!";
            setTimeout(reiniciarJogo, 1500);
        }
    } else {
        mensagem.textContent = "❌ Letra incorreta!";
        mensagem.classList.add("incorreta");
    }
}

function atualizarPalavra() {
    document.getElementById("palavra-container").textContent = palavraParcial.join(" ");
}

function reiniciarJogo() {
    palavraAtual = {};
    palavraParcial = [];
    indicesFaltando = [];
    letrasEscolhidas = [];
    iniciar();
}

window.onload = iniciar;
document.getElementById("btn-voltar").onclick = () => {
    window.location.href = "../index.html";
}

document.getElementById("btn-proxima").onclick = () => {
    palavraAtual = {};
    palavraParcial = [];
    indicesFaltando = [];
    letrasEscolhidas = [];
    iniciar();
}