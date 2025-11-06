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
let indiceFaltando = 0;
const mensagem = document.getElementById("exibicao-resultado");

function iniciar() {
    // começa selecionando uma palavra aleatória
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
    // cria botões para cada letra do alfabeto
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
    // cria a palavra com uma letra faltando
    const palavra = palavraAtual.palavra;
    const letras = palavra.split("");
    indiceFaltando = Math.floor(Math.random() * letras.length);

    // cria a representação parcial da palavra
    palavraParcial = letras.map((letra, index) => index === indiceFaltando ? "_" : letra);
    // atualiza o display da palavra
    document.getElementById("palavra-container").innerHTML = palavraParcial.join(" ");
}

function verificarLetra(letra) {
    // verifica se a letra escolhida está correta
    const letraCorreta = palavraAtual.palavra[indiceFaltando];
    mensagem.classList.remove("correta", "incorreta");

    // verifica se a letra escolhida está correta
    if (letra === letraCorreta) {
        palavraParcial[indiceFaltando] = letra;
        atualizarPalavra();
        mensagem.textContent = "✅ Letra correta!";
        mensagem.classList.add("correta");
        // reinicia o jogo após 1.5 segundos
        setTimeout(reiniciarJogo, 1500);
    } else {
        // letra incorreta
        mensagem.textContent = "❌ Letra incorreta!";
        mensagem.classList.add("incorreta");
    }
}

function atualizarPalavra() {
    // atualiza o display da palavra
    document.getElementById("palavra-container").textContent = palavraParcial.join(" ");
}

function reiniciarJogo() {
    // reseta variáveis e inicia um novo jogo
    palavraAtual = {};
    palavraParcial = [];
    indiceFaltando = 0;
    letrasEscolhidas = [];
    iniciar();
}

window.onload = iniciar;