/* ==========================================================================
   Ferreira Veículos — busca, filtros, ordenação e cartões do estoque
   Usado na página inicial (busca rápida + destaques) e na página de estoque.
   ========================================================================== */

(function () {
  'use strict';

  const FAIXAS_PRECO = [
    { id: '', rotulo: 'Qualquer preço' },
    { id: 'ate-40', rotulo: 'Até R$ 40.000', min: 0, max: 40000 },
    { id: '40-60', rotulo: 'R$ 40.000 a R$ 60.000', min: 40000, max: 60000 },
    { id: '60-80', rotulo: 'R$ 60.000 a R$ 80.000', min: 60000, max: 80000 },
    { id: '80-120', rotulo: 'R$ 80.000 a R$ 120.000', min: 80000, max: 120000 },
    { id: '120-mais', rotulo: 'Acima de R$ 120.000', min: 120000, max: Infinity }
  ];

  const ORDENACOES = [
    { id: 'relevancia', rotulo: 'Mais relevantes' },
    { id: 'preco-menor', rotulo: 'Menor preço' },
    { id: 'preco-maior', rotulo: 'Maior preço' },
    { id: 'ano-recente', rotulo: 'Ano mais recente' },
    { id: 'ano-antigo', rotulo: 'Ano mais antigo' },
    { id: 'km-menor', rotulo: 'Menor quilometragem' }
  ];

  /* ---------- Cartão de veículo ---------- */
  function cartaoHTML(v) {
    const titulo = nomeVeiculo(v);
    const selo = v.selo
      ? '<span class="selo ' + (v.selo === 'Novidade' ? 'selo-novidade' : 'selo-destaque') + '">' + v.selo + '</span>'
      : '';
    const versao = [v.versao, v.categoria].filter(Boolean).join(' · ');

    return '' +
      '<article class="card-veiculo reveal">' +
        '<div class="card-foto">' +
          '<img src="' + v.capa + '" alt="' + titulo + (v.ano ? ' ' + v.ano : '') + ' à venda na Ferreira Veículos" loading="lazy" width="420" height="315">' +
          selo +
          '<span class="card-marca">' + v.marca + '</span>' +
        '</div>' +
        '<div class="card-corpo">' +
          '<h3 class="card-titulo"><a href="veiculo.html?id=' + v.id + '">' + titulo + '</a></h3>' +
          '<p class="card-versao">' + (versao || 'Consulte os detalhes com a equipe') + '</p>' +
          '<ul class="card-specs">' +
            '<li><span class="rotulo">Ano</span><span class="valor">' + valorOuConsulte(v.ano) + '</span></li>' +
            '<li><span class="rotulo">KM</span><span class="valor">' + valorOuConsulte(v.km) + '</span></li>' +
            '<li><span class="rotulo">Câmbio</span><span class="valor">' + valorOuConsulte(v.cambio) + '</span></li>' +
          '</ul>' +
          '<div class="card-rodape">' +
            '<span class="card-preco' + (v.preco ? '' : ' pequeno') + '">' + precoExibicao(v) + '</span>' +
            '<a class="btn btn-sm btn-contorno" href="veiculo.html?id=' + v.id + '" aria-label="Ver detalhes de ' + titulo + '">Ver detalhes</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function preencherSelect(select, valores, textoPadrao) {
    if (!select) return;
    const atual = select.value;
    select.innerHTML = '';
    const primeiro = document.createElement('option');
    primeiro.value = '';
    primeiro.textContent = textoPadrao;
    select.appendChild(primeiro);
    valores.forEach(function (valor) {
      const opt = document.createElement('option');
      opt.value = valor;
      opt.textContent = valor;
      select.appendChild(opt);
    });
    if ([...select.options].some(function (o) { return o.value === atual; })) select.value = atual;
  }

  function faixaPorId(id) {
    return FAIXAS_PRECO.find(function (f) { return f.id === id; }) || FAIXAS_PRECO[0];
  }

  function filtrar(lista, f) {
    return lista.filter(function (v) {
      if (f.marca && v.marca !== f.marca) return false;
      if (f.modelo && v.modelo !== f.modelo) return false;
      if (f.categoria && v.categoria !== f.categoria) return false;
      if (f.texto) {
        const alvo = (nomeVeiculo(v) + ' ' + (v.versao || '') + ' ' + v.categoria + ' ' + v.ano).toLowerCase();
        if (alvo.indexOf(f.texto.toLowerCase()) === -1) return false;
      }
      if (f.preco) {
        const faixa = faixaPorId(f.preco);
        if (!v.preco || v.preco < faixa.min || v.preco > faixa.max) return false;
      }
      return true;
    });
  }

  function ordenar(lista, ordem) {
    const copia = lista.slice();
    const fim = function (a, b) {
      // nulos sempre no final
      const an = a.preco === null, bn = b.preco === null;
      if (an && bn) return 0;
      if (an) return 1;
      if (bn) return -1;
      return 0;
    };
    switch (ordem) {
      case 'preco-menor':
        copia.sort(function (a, b) { return fim(a, b) || a.preco - b.preco; });
        break;
      case 'preco-maior':
        copia.sort(function (a, b) {
          if (a.preco === null) return 1;
          if (b.preco === null) return -1;
          return b.preco - a.preco;
        });
        break;
      case 'ano-recente':
        copia.sort(function (a, b) {
          if (!a.ano) return 1;
          if (!b.ano) return -1;
          return b.ano - a.ano;
        });
        break;
      case 'ano-antigo':
        copia.sort(function (a, b) {
          if (!a.ano) return 1;
          if (!b.ano) return -1;
          return a.ano - b.ano;
        });
        break;
      case 'km-menor':
        copia.sort(function (a, b) {
          if (a.km === null) return 1;
          if (b.km === null) return -1;
          return a.km - b.km;
        });
        break;
      default:
        copia.sort(function (a, b) { return (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0); });
    }
    return copia;
  }

  function renderGrade(elemento, lista) {
    elemento.innerHTML = lista.map(cartaoHTML).join('');
    // ativa as animações de aparição imediatamente para os itens já visíveis
    requestAnimationFrame(function () {
      elemento.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visivel'); });
    });
  }

  function lerParametros() {
    const p = new URLSearchParams(window.location.search);
    return {
      marca: p.get('marca') || '',
      modelo: p.get('modelo') || '',
      categoria: p.get('categoria') || '',
      preco: p.get('preco') || '',
      texto: p.get('q') || '',
      ordem: p.get('ordem') || 'relevancia'
    };
  }

  /* =========================================================================
     Página inicial: busca rápida + grade de destaques
     ========================================================================= */
  function iniciarHome() {
    const form = document.getElementById('form-busca');
    const gradeDestaques = document.getElementById('grade-destaques');

    if (gradeDestaques) {
      const destaques = veiculosDisponiveis().filter(function (v) { return v.destaque; });
      const lista = destaques.length ? destaques : veiculosDisponiveis();
      renderGrade(gradeDestaques, lista.slice(0, 6));
      const total = veiculosDisponiveis().length;
      const verTodos = document.getElementById('ver-todos-estoque');
      if (verTodos) verTodos.textContent = 'Ver estoque (' + total + ')';
    }

    if (!form) return;

    const selMarca = form.querySelector('[name="marca"]');
    const selModelo = form.querySelector('[name="modelo"]');
    const selCategoria = form.querySelector('[name="categoria"]');
    const selPreco = form.querySelector('[name="preco"]');

    preencherSelect(selMarca, marcasDisponiveis(), 'Todas as marcas');
    preencherSelect(selCategoria, categoriasDisponiveis(), 'Todas as categorias');

    const modelosDaMarca = function () {
      const marca = selMarca.value;
      const modelos = [...new Set(
        veiculosDisponiveis()
          .filter(function (v) { return !marca || v.marca === marca; })
          .map(function (v) { return v.modelo; })
      )].sort();
      preencherSelect(selModelo, modelos, 'Todos os modelos');
    };
    modelosDaMarca();
    selMarca.addEventListener('change', modelosDaMarca);

    if (selPreco) {
      FAIXAS_PRECO.forEach(function (f) {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = f.rotulo;
        selPreco.appendChild(opt);
      });
    }

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      const p = new URLSearchParams();
      if (selMarca.value) p.set('marca', selMarca.value);
      if (selModelo.value) p.set('modelo', selModelo.value);
      if (selCategoria.value) p.set('categoria', selCategoria.value);
      if (selPreco && selPreco.value) p.set('preco', selPreco.value);
      const texto = (form.querySelector('[name="q"]') || {}).value;
      if (texto) p.set('q', texto.trim());
      const qs = p.toString();
      window.location.href = 'estoque.html' + (qs ? '?' + qs : '');
    });
  }

  /* =========================================================================
     Página de estoque
     ========================================================================= */
  function iniciarEstoque() {
    const grade = document.getElementById('grade-estoque');
    if (!grade) return;

    const form = document.getElementById('form-filtros');
    const selMarca = form.querySelector('[name="marca"]');
    const selModelo = form.querySelector('[name="modelo"]');
    const selCategoria = form.querySelector('[name="categoria"]');
    const selPreco = form.querySelector('[name="preco"]');
    const entrada = form.querySelector('[name="q"]') || { value: '' };
    const selOrdem = document.getElementById('ordem');
    const contador = document.getElementById('contador');
    const vazio = document.getElementById('vazio');
    const limpar = document.getElementById('limpar-filtros');

    preencherSelect(selMarca, marcasDisponiveis(), 'Todas as marcas');
    preencherSelect(selCategoria, categoriasDisponiveis(), 'Todas as categorias');
    FAIXAS_PRECO.forEach(function (f) {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.rotulo;
      selPreco.appendChild(opt);
    });
    ORDENACOES.forEach(function (o) {
      const opt = document.createElement('option');
      opt.value = o.id;
      opt.textContent = o.rotulo;
      selOrdem.appendChild(opt);
    });

    const params = lerParametros();
    selMarca.value = params.marca;
    selCategoria.value = params.categoria;
    selPreco.value = params.preco;
    entrada.value = params.texto;
    selOrdem.value = params.ordem;

    function popularModelos() {
      const marca = selMarca.value;
      const modelos = [...new Set(
        VEICULOS.filter(function (v) { return !marca || v.marca === marca; })
          .map(function (v) { return v.modelo; })
      )].sort();
      preencherSelect(selModelo, modelos, 'Todos os modelos');
      if (params.modelo && modelos.indexOf(params.modelo) !== -1) selModelo.value = params.modelo;
    }
    popularModelos();
    selMarca.addEventListener('change', popularModelos);

    function atualizar() {
      const filtros = {
        marca: selMarca.value,
        modelo: selModelo.value,
        categoria: selCategoria.value,
        preco: selPreco.value,
        texto: entrada.value.trim()
      };
      const disponiveis = veiculosDisponiveis();
      const resultado = ordenar(filtrar(disponiveis, filtros), selOrdem.value);

      const temFiltro = filtros.marca || filtros.modelo || filtros.categoria || filtros.preco || filtros.texto;
      if (contador) {
        contador.innerHTML = '<strong>' + resultado.length + '</strong> ' +
          (resultado.length === 1 ? 'veículo encontrado' : 'veículos encontrados') +
          (temFiltro ? ' · ' + disponiveis.length + ' disponíveis no total' : '');
      }

      if (resultado.length) {
        renderGrade(grade, resultado);
        grade.hidden = false;
        if (vazio) vazio.hidden = true;
      } else {
        grade.innerHTML = '';
        grade.hidden = true;
        if (vazio) vazio.hidden = false;
      }

      // reflete o estado na URL (compartilhável)
      const p = new URLSearchParams();
      Object.keys(filtros).forEach(function (chave) {
        if (filtros[chave]) p.set(chave === 'texto' ? 'q' : chave, filtros[chave]);
      });
      if (selOrdem.value && selOrdem.value !== 'relevancia') p.set('ordem', selOrdem.value);
      const qs = p.toString();
      history.replaceState(null, '', 'estoque.html' + (qs ? '?' + qs : ''));
    }

    form.addEventListener('input', atualizar);
    form.addEventListener('change', atualizar);
    form.addEventListener('submit', function (e) { e.preventDefault(); atualizar(); });
    selOrdem.addEventListener('change', atualizar);

    if (limpar) {
      limpar.addEventListener('click', function () {
        form.reset();
        selOrdem.value = 'relevancia';
        popularModelos();
        atualizar();
      });
    }

    atualizar();
  }

  /* ---------- Página de detalhes: galeria ---------- */
  function iniciarGaleria() {
    const principal = document.getElementById('galeria-principal');
    const thumbs = document.getElementById('galeria-thumbs');
    if (!principal || !thumbs) return;
    const botoes = thumbs.querySelectorAll('button');
    botoes.forEach(function (botao) {
      botao.addEventListener('click', function () {
        const img = botao.querySelector('img');
        principal.src = botao.getAttribute('data-grande');
        principal.alt = img.alt;
        botoes.forEach(function (b) { b.setAttribute('aria-current', 'false'); });
        botao.setAttribute('aria-current', 'true');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    iniciarHome();
    iniciarEstoque();
    iniciarGaleria();
  });
})();
