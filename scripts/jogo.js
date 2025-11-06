const palavras = [
    { palavra: "arvore", imagem: "../assets/arvore.jpg" },
    { palavra: "bola", imagem: "../assets/bola.jpg" },
    { palavra: "cachorro", imagem: "../assets/cachorro.jpg" },
    { palavra: "cadeira", imagem: "../assets/cadeira.jpg" },
    { palavra: "cama", imagem: "../assets/cama.jpg" },
    { palavra: "carro", imagem: "../assets/carro.jpg" },
    { palavra: "casa", imagem: "../assets/casa.jpg" },
    { palavra: "controle", imagem: "../assets/controle.jpg" },
    { palavra: "coxinha", imagem: "../assets/coxinha.jpg" },
    { palavra: "dinossauro", imagem: "../assets/dinossauro.jpg" },
    { palavra: "elefante", imagem: "../assets/elefante.jpg" },
    { palavra: "flor", imagem: "../assets/flor.jpg" },
    { palavra: "gato", imagem: "../assets/gato.jpg" },
    { palavra: "lápis", imagem: "../assets/lapis.jpg" },
    { palavra: "leão", imagem: "../assets/leao.jpg" },
    { palavra: "livro", imagem: "../assets/livro.jpg" },
    { palavra: "macaco", imagem: "../assets/macaco.jpg" },
    { palavra: "mesa", imagem: "../assets/mesa.jpg" },
    { palavra: "mochila", imagem: "../assets/mochila.jpg" },
    { palavra: "relógio", imagem: "../assets/relogio.jpg" },
    { palavra: "sapato", imagem: "../assets/sapato.jpg" },
    { palavra: "sol", imagem: "../assets/sol.jpg" },
    { palavra: "tartaruga", imagem: "../assets/tartaruga.jpg" },
    { palavra: "tigre", imagem: "../assets/tigre.jpg" },
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

    const alfabeto = "abcdefghijklmnopqrstuvwxyzçáéíóúãõâêô".split("");
    alfabeto.forEach(letra => {
        const botaoLetra = document.createElement("button");
        botaoLetra.innerText = letra;
        botaoLetra.onclick = () => verificarLetra(letra);
        letrasContainer.appendChild(botaoLetra);
    });
}

function criarPalavraIncompleta() {
    const palavra = palavraAtual.palavra;
    const letras = palavra.split("");

    // Define quantas letras esconder com base no tamanho da palavra
    let qtdOcultas = 2;
    if (letras.length > 6 && letras.length <= 9) qtdOcultas = 3;
    else if (letras.length > 9) qtdOcultas = 4;

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

function verificarLetra(letra) {
    let acertou = false;
    mensagem.classList.remove("correta", "incorreta");

    indicesFaltando.forEach((i) => {
        if (palavraAtual.palavra[i] === letra) {
            palavraParcial[i] = letra;
            acertou = true;
        }
    });

    atualizarPalavra();

    if (acertou) {
        mensagem.textContent = "✅ Letra correta!";
        mensagem.classList.add("correta");

        // Remove índices já preenchidos
        indicesFaltando = indicesFaltando.filter(i => palavraParcial[i] === "_");

        // Se completou a palavra
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
