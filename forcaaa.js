function iniciarJogo() {
  const bancoDePalavras = [
    "javascript", "computador", "teclado", "internet", "programa",
    "variavel", "funcao", "algoritmo", "navegador", "servidor",
    "arquivo", "sistema", "usuario", "linguagem", "software"
  ];

  const palavraSecreta = bancoDePalavras[Math.floor(Math.random() * bancoDePalavras.length)];
  const letrasDaPalavra = palavraSecreta.split("");

  let tabuleiro = [];
  for (let i = 0; i < letrasDaPalavra.length; i++) {
    tabuleiro.push("_");
  }

  let tentativas = 6;
  let venceu = false;

  while (tentativas > 0 && !venceu) {
    const estadoAtual = tabuleiro.join(" ");
    const letraDigitada = prompt(
      "Chances restantes: " + tentativas + "\nPalavra: " + estadoAtual
    );

    if (letraDigitada === null) {
      alert("Jogo encerrado. A palavra era: " + palavraSecreta);
      return;
    }

    const letra = letraDigitada.toLowerCase();

    if (!palavraSecreta.includes(letra)) {
      tentativas--;
    } else {
      for (let i = 0; i < letrasDaPalavra.length; i++) {
        if (letrasDaPalavra[i] === letra) {
          tabuleiro[i] = letra;
        }
      }
    }

    if (!tabuleiro.includes("_")) {
      venceu = true;
    }
  }

  if (venceu) {
    alert("Parabéns! Você acertou a palavra: " + palavraSecreta);
  } else {
    alert("Suas chances acabaram. A palavra era: " + palavraSecreta);
  }
}

iniciarJogo();
