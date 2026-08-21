function iniciarJogo() {
  const numeroSecreto = Math.floor(Math.random() * 50) + 1;
  let palpite = null;
  let tentativas = 0;
  let acertou = false;

  while (!acertou) {
    const textoDigitado = prompt("Tentativa " + (tentativas + 1) + "\nDigite um número entre 1 e 50:");

    if (textoDigitado === null) {
      alert("Jogo encerrado.");
      return;
    }

    palpite = parseInt(textoDigitado);

    if (isNaN(palpite)) {
      alert("Digite um número válido.");
      continue;
    }

    tentativas++;

    if (palpite === numeroSecreto) {
      acertou = true;
      alert("Parabéns! Você acertou o número " + numeroSecreto + " em " + tentativas + " tentativa(s).");
    } else if (palpite > numeroSecreto) {
      alert("O número secreto é menor que " + palpite + ".");
    } else {
      alert("O número secreto é maior que " + palpite + ".");
    }
  }
}

iniciarJogo();
