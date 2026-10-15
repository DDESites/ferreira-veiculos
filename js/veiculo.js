/* ==========================================================================
   Ferreira Veículos — página de detalhes do veículo (veiculo.html?id=...)
   ========================================================================== */

(function () {
  'use strict';

  function texto(valor, sufixo) {
    if (valor === null || valor === undefined || valor === '') return 'Consulte';
    return String(valor) + (sufixo || '');
  }

  function meta(nome, conteudo) {
    let el = document.querySelector('meta[name="' + nome + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', nome);
      document.head.appendChild(el);
    }
    el.setAttribute('content', conteudo);
  }

  function metaProp(prop, conteudo) {
    let el = document.querySelector('meta[property="' + prop + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.setAttribute('content', conteudo);
  }

  function montarDetalhe(v) {
    const titulo = nomeVeiculo(v);
    const disponivel = v.status === 'disponivel';

    /* ----- breadcrumb ----- */
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML =
        '<li><a href="index.html">Início</a></li>' +
        '<li><a href="estoque.html">Estoque</a></li>' +
        '<li aria-current="page">' + titulo + '</li>';
    }

    /* ----- cabeçalho ----- */
    const h1 = document.getElementById('det-titulo');
    if (h1) h1.textContent = titulo;

    const sub = document.getElementById('det-sub');
    if (sub) {
      sub.textContent = [v.versao, v.ano ? v.ano : null, v.categoria].filter(Boolean).join(' · ') ||
        'Ficha completa com a equipe Ferreira Veículos';
    }

    const status = document.getElementById('det-status');
    if (status) {
      const rotulo = v.status === 'reservado' ? 'Reservado' : (v.status === 'vendido' ? 'Vendido' : 'Disponível');
      status.className = 'badge-status badge-' + v.status;
      status.textContent = rotulo;
    }

    /* ----- galeria ----- */
    const principal = document.getElementById('galeria-principal');
    const thumbs = document.getElementById('galeria-thumbs');
    if (principal && thumbs) {
      const altBase = titulo + (v.ano ? ' ' + v.ano : '') + ' — Ferreira Veículos';
      principal.src = v.fotos[0];
      principal.alt = altBase + ', foto principal';
      principal.width = 640;
      principal.height = 480;
      if (v.posicao) principal.style.objectPosition = v.posicao;

      if (v.fotos.length > 1) {
        thumbs.innerHTML = v.fotos.map(function (caminho, i) {
          return '<button type="button" data-grande="' + caminho + '" aria-current="' + (i === 0) + '">' +
            '<img src="' + caminho + '" alt="' + altBase + ', foto ' + (i + 1) + '" loading="lazy">' +
            '</button>';
        }).join('');
      } else {
        thumbs.innerHTML = '';
        thumbs.hidden = true;
      }
    }

    /* ----- ficha técnica ----- */
    const linhas = [
      ['Marca', v.marca],
      ['Modelo', v.modelo],
      ['Versão', v.versao],
      ['Ano', v.ano],
      ['Quilometragem', v.km],
      ['Câmbio', v.cambio],
      ['Combustível', v.combustivel],
      ['Categoria', v.categoria]
    ];
    const tabela = document.getElementById('det-ficha');
    if (tabela) {
      tabela.innerHTML = linhas.map(function (par) {
        const valor = (par[0] === 'Ano' && par[1]) ? String(par[1]) : texto(par[1]);
        return '<tr><th scope="row">' + par[0] + '</th><td>' + valor + '</td></tr>';
      }).join('');
    }

    /* ----- preço e ações ----- */
    const preco = document.getElementById('det-preco');
    if (preco) preco.textContent = precoExibicao(v);

    const acoes = document.getElementById('det-acoes');
    const aviso = document.getElementById('det-aviso');
    if (acoes) {
      if (disponivel) {
        const mensagem = 'Olá! Tenho interesse no ' + tituloVeiculo(v) +
          ' anunciado no site da Ferreira Veículos. Ainda está disponível?';
        acoes.innerHTML =
          '<a class="btn btn-whats" href="' + linkWhatsApp(mensagem) + '" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>' +
            'Consultar no WhatsApp</a>' +
          '<a class="btn btn-contorno" href="estoque.html">Ver outros veículos</a>';
      } else {
        acoes.innerHTML =
          '<a class="btn btn-contorno" href="estoque.html">Ver estoque disponível</a>';
      }
    }
    if (aviso) {
      if (disponivel) {
        aviso.hidden = true;
      } else {
        aviso.hidden = false;
        aviso.innerHTML = '<strong>Este veículo não está mais disponível.</strong><br>' +
          'Chame a equipe para conferir opções semelhantes ou cadastre o seu carro na avaliação.';
      }
    }

    /* ----- descrição ----- */
    const descr = document.getElementById('det-descricao');
    if (descr) descr.textContent = v.descricao;

    const fonte = document.getElementById('det-fonte');
    if (fonte) {
      const partes = [];
      if (v.atualizado) partes.push('Atualizado em ' + dataExibicao(v.atualizado));
      if (v.anuncio) {
        partes.push('<a href="' + v.anuncio + '" target="_blank" rel="noopener">Ver publicação original no Instagram</a>');
      }
      fonte.innerHTML = partes.length ? 'Fonte das informações: ' + partes.join(' · ') : '';
    }

    /* ----- veículos relacionados ----- */
    const relacionados = document.getElementById('grade-relacionados');
    if (relacionados) {
      const outros = veiculosDisponiveis()
        .filter(function (x) { return x.id !== v.id; })
        .sort(function (a, b) {
          const pa = (a.categoria === v.categoria ? 2 : 0) + (a.marca === v.marca ? 1 : 0);
          const pb = (b.categoria === v.categoria ? 2 : 0) + (b.marca === v.marca ? 1 : 0);
          return pb - pa;
        })
        .slice(0, 3);
      if (outros.length) {
        relacionados.innerHTML = outros.map(function (x) {
          return '<article class="card-veiculo">' +
            '<div class="card-foto">' +
              '<img src="' + x.capa + '" alt="' + nomeVeiculo(x) + ' à venda na Ferreira Veículos" loading="lazy" width="420" height="315">' +
              '<span class="card-marca">' + x.marca + '</span>' +
            '</div>' +
            '<div class="card-corpo">' +
              '<h3 class="card-titulo"><a href="veiculo.html?id=' + x.id + '">' + nomeVeiculo(x) + '</a></h3>' +
              '<p class="card-versao">' + [x.versao, x.categoria].filter(Boolean).join(' · ') + '</p>' +
              '<div class="card-rodape">' +
                '<span class="card-preco' + (x.preco ? '' : ' pequeno') + '">' + precoExibicao(x) + '</span>' +
                '<a class="btn btn-sm btn-contorno" href="veiculo.html?id=' + x.id + '">Ver detalhes</a>' +
              '</div>' +
            '</div>' +
          '</article>';
        }).join('');
        relacionados.parentElement.hidden = false;
      } else {
        relacionados.parentElement.hidden = true;
      }
    }

    /* ----- SEO ----- */
    const tituloDoc = titulo + (v.ano ? ' ' + v.ano : '') + ' | Ferreira Veículos';
    document.title = tituloDoc;
    const resumo = v.descricao.replace(/\s+/g, ' ').slice(0, 155);
    meta('description', resumo);
    metaProp('og:title', tituloDoc);
    metaProp('og:description', resumo);
    metaProp('og:image', v.fotos[0]);
  }

  function mostrarVazio() {
    const secao = document.getElementById('detalhe-conteudo');
    const aviso = document.getElementById('detalhe-vazio');
    if (secao) secao.hidden = true;
    if (aviso) aviso.hidden = false;
    document.title = 'Veículo não encontrado | Ferreira Veículos';
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('detalhe-conteudo')) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const veiculo = id ? acharVeiculo(id) : null;
    if (!veiculo) {
      mostrarVazio();
      return;
    }
    montarDetalhe(veiculo);
    iniciarGaleriaLocal();
  });

  function iniciarGaleriaLocal() {
    const principal = document.getElementById('galeria-principal');
    const thumbs = document.getElementById('galeria-thumbs');
    if (!principal || !thumbs) return;
    thumbs.querySelectorAll('button').forEach(function (botao) {
      botao.addEventListener('click', function () {
        const img = botao.querySelector('img');
        principal.src = botao.getAttribute('data-grande');
        principal.alt = img.alt;
        thumbs.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-current', 'false'); });
        botao.setAttribute('aria-current', 'true');
      });
    });
  }
})();
