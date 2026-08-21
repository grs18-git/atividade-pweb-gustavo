const formBusca = document.getElementById('formBusca');
const inputTime = document.getElementById('inputTime');
const mensagemStatus = document.getElementById('mensagemStatus');
const areaResultado = document.getElementById('resultado');

const URL_BASE = 'https://www.thesportsdb.com/api/v1/json/123/searchteams.php';

formBusca.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nomeDoTime = inputTime.value.trim();

  if (nomeDoTime === '') {
    exibirStatus('Digite o nome de um time para começar a busca.', true);
    return;
  }

  buscarTime(nomeDoTime);
});

async function buscarTime(nomeDoTime) {
  exibirStatus('Buscando na central de dados...', false);
  areaResultado.innerHTML = '';

  try {
    const url = `${URL_BASE}?t=${encodeURIComponent(nomeDoTime)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('A central de dados não respondeu corretamente.');
    }

    const data = await response.json();

    if (!data.teams) {
      exibirStatus(`Nenhum time encontrado para "${nomeDoTime}".`, true);
      return;
    }

    const time = data.teams[0];
    exibirStatus('', false);
    renderizarTicket(time);

  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    exibirStatus('Não foi possível buscar os dados agora. Tente novamente.', true);
  }
}

function renderizarTicket(time) {
  const capacidade = time.intStadiumCapacity
    ? Number(time.intStadiumCapacity).toLocaleString('pt-BR')
    : 'Não informada';

  const escudoHtml = time.strTeamBadge
    ? `<img class="escudo" src="${time.strTeamBadge}" alt="Escudo do ${time.strTeam}">`
    : `<div class="escudo-ausente">${obterIniciais(time.strTeam)}</div>`;

  const sinopse = time.strDescriptionPT || time.strDescriptionEN;

  const redes = montarRedesSociais(time);

  areaResultado.innerHTML = `
    <article class="ticket">
      <div class="entalhe topo"></div>
      <div class="entalhe base"></div>

      <div class="ticket-principal">
        <p class="ticket-liga">${time.strLeague || 'Liga não informada'}</p>
        <h2 class="ticket-nome">${time.strTeam}</h2>

        <div class="ticket-linha">
          <span class="ticket-rotulo">Estádio</span>
          <span class="ticket-valor">${time.strStadium || 'Não informado'}</span>
        </div>
        <div class="ticket-linha">
          <span class="ticket-rotulo">Capacidade</span>
          <span class="ticket-valor">${capacidade}</span>
        </div>
        <div class="ticket-linha">
          <span class="ticket-rotulo">Cidade</span>
          <span class="ticket-valor">${time.strLocation || 'Não informada'}</span>
        </div>
        <div class="ticket-linha">
          <span class="ticket-rotulo">Fundado em</span>
          <span class="ticket-valor">${time.intFormedYear || 'Não informado'}</span>
        </div>

        ${sinopse ? `<p class="ticket-sinopse">${sinopse.split('\n')[0]}</p>` : ''}
        ${redes ? `<div class="ticket-redes">${redes}</div>` : ''}
      </div>

      <div class="ticket-canhoto">
        ${escudoHtml}
        <p class="ticket-selo">Ficha oficial</p>
      </div>
    </article>
  `;
}

function montarRedesSociais(time) {
  const links = [
    { rotulo: 'Site', url: time.strWebsite ? `https://${time.strWebsite}` : null },
    { rotulo: 'Facebook', url: time.strFacebook ? `https://${time.strFacebook}` : null },
    { rotulo: 'Instagram', url: time.strInstagram ? `https://${time.strInstagram}` : null },
    { rotulo: 'Twitter', url: time.strTwitter ? `https://${time.strTwitter}` : null },
    { rotulo: 'Youtube', url: time.strYoutube ? `https://${time.strYoutube}` : null },
  ];

  return links
    .filter(link => link.url)
    .map(link => `<a href="${link.url}" target="_blank" rel="noopener">${link.rotulo}</a>`)
    .join('');
}

function obterIniciais(nomeTime) {
  if (!nomeTime) return '?';
  return nomeTime
    .split(' ')
    .slice(0, 2)
    .map(palavra => palavra[0])
    .join('')
    .toUpperCase();
}

function exibirStatus(texto, ehErro) {
  mensagemStatus.textContent = texto;
  mensagemStatus.classList.toggle('erro', ehErro);
}
