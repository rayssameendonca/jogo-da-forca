let modoNoturnoAtivo = localStorage.getItem("modoNoturno") === "true";
let body = document.querySelector("body");
let corForca = "#757575";
let corBoneco = "#757575";

const checkbox = document.querySelector(".input-toggle");

if (modoNoturnoAtivo) {
  body.classList.add("modo-noturno");
}

checkbox.addEventListener("change", function () {
  if (this.checked) {
    body.classList.remove("modo-noturno");
  } else {
    body.classList.add("modo-noturno");
  }
  redesenhaBoneco();
});

const redesenhaBoneco = () => {
  limpaTela();
  fazDesenho("forca");
  for (let i = 0; i < parteAtual; i++) {
    fazDesenho(desenha[i]);
  }
};

let palavras = [
  "cachorro",
  "girassol",
  "elefante",
  "jornada",
  "relatorio",
  "prateleira",
  "telefone",
  "sanduiche",
  "borboleta",
  "maquiagem",
  "motorista",
  "professor",
  "chocolate",
  "aventura",
  "palmeiras",
  "manteiga",
  "bananada",
  "claridade",
  "cobertura",
  "batom",
  "mascara",
  "pastelaria",
  "frango",
  "abacaxi",
  "caderneta",
  "desenhista",
  "mandioca",
  "paciencia",
  "bolacha",
  "escovar",
  "estudante",
  "planilha",
  "sorvete",
  "armario",
  "teclado",
  "gasolina",
  "natureza",
  "cereja",
  "floresta",
  "almofada",
];
let palavra;
let palavraOculta;
let tentativas = 8;

const validarInput = (input) => {
  input.value = input.value.replace(/[^A-Za-z]/g, "");
};

const entrada = document.getElementById("entrada");
entrada.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    tentarLetra();
  }
});

const iniciarJogo = (p) => {
  palavra = p;
  palavraOculta = Array(palavra.length).fill("_");
  atualizarTela();
};

const atualizarTela = () => {
  document.getElementById("palavra").textContent = palavraOculta.join(" ");
  document.getElementById("tentativas").textContent =
    "Tentativas restantes: " + tentativas;
};

let letrasTentadas = [];

const tentarLetra = () => {
  let letra = document.getElementById("entrada").value.toLowerCase();

  if (letra === "" || letrasTentadas.includes(letra)) {
    document.getElementById("entrada").value = "";
    return;
  }

  letrasTentadas.push(letra);

  let acertou = false;

  for (let i = 0; i < palavra.length; i++) {
    if (palavra[i] === letra) {
      palavraOculta[i] = letra;
      acertou = true;
    }
  }

  if (!acertou) {
    tentativas--;
  }

  if (!acertou) {
    if (parteAtual < 8) {
      fazDesenho(desenha[parteAtual++]);
    } else {
      fazDesenho(desenha[parteAtual++]);
      fazDesenho(desenha[parteAtual++]);
      fazDesenho(desenha[parteAtual++]);
      document.getElementById("mensagem").textContent =
        "Você perdeu! A palavra era: " + palavra;
      document.getElementById("jogarNovamente").style.display = "block";
    }
  }

  if (palavraOculta.join("") === palavra) {
    document.getElementById("mensagem").textContent = "Parabéns! Você venceu!";
    document.getElementById("jogarNovamente").style.display = "block";
  } else if (tentativas <= 0) {
    document.getElementById("mensagem").textContent =
      "Você perdeu! A palavra era: " + palavra;
    document.getElementById("jogarNovamente").style.display = "block";
  }

  atualizarTela();
  document.getElementById("entrada").value = "";
};

const buscarPalavraAleatoria = () => {
  let palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
  iniciarJogo(palavraAleatoria);
};

buscarPalavraAleatoria();

const canvas = document.getElementById("boneco");
const contexto = canvas.getContext("2d");

const desenha = [
  "cabeca",
  "corpo",
  "bracoDireito",
  "bracoEsquerdo",
  "pernaDireita",
  "pernaEsquerda",
  "olhos",
  "boca",
  "forca",
];
let parteAtual = 0;

const fazDesenho = (parte) => {
  switch (parte) {
    case "forca":
      contexto.strokeStyle = parte === "forca" ? corForca : corBoneco;
      contexto.lineWidth = 10;
      contexto.beginPath();
      contexto.moveTo(175, 225);
      contexto.lineTo(5, 225);
      contexto.moveTo(40, 225);
      contexto.lineTo(25, 5);
      contexto.lineTo(100, 5);
      contexto.lineTo(100, 25);
      contexto.stroke();
      break;

    case "cabeca":
      contexto.lineWidth = 5;
      contexto.beginPath();
      contexto.arc(100, 50, 25, 0, Math.PI * 2, true);
      contexto.closePath();
      contexto.stroke();
      break;

    case "olhos":
      contexto.lineWidth = 3;
      contexto.beginPath();
      contexto.moveTo(90, 40);
      contexto.lineTo(95, 45);
      contexto.moveTo(95, 40);
      contexto.lineTo(90, 45);
      contexto.stroke();

      contexto.beginPath();
      contexto.moveTo(105, 40);
      contexto.lineTo(110, 45);
      contexto.moveTo(110, 40);
      contexto.lineTo(105, 45);
      contexto.stroke();
      break;

    case "boca":
      contexto.lineWidth = 3;
      contexto.beginPath();
      contexto.arc(100, 60, 10, Math.PI, 2 * Math.PI, false);
      contexto.stroke();
      break;

    case "corpo":
      contexto.beginPath();
      contexto.moveTo(100, 75);
      contexto.lineTo(100, 140);
      contexto.stroke();
      break;

    case "bracoDireito":
      contexto.beginPath();
      contexto.moveTo(100, 85);
      contexto.lineTo(60, 100);
      contexto.stroke();
      break;

    case "bracoEsquerdo":
      contexto.beginPath();
      contexto.moveTo(100, 85);
      contexto.lineTo(140, 100);
      contexto.stroke();
      break;

    case "pernaDireita":
      contexto.beginPath();
      contexto.moveTo(100, 140);
      contexto.lineTo(80, 190);
      contexto.stroke();
      break;

    case "pernaEsquerda":
      contexto.beginPath();
      contexto.moveTo(100, 140);
      contexto.lineTo(125, 190);
      contexto.stroke();
      break;
  }
};

fazDesenho("forca");
