/* ==========================================================================
   Ferreira Veículos — interações gerais do site
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Cabeçalho: sombra ao rolar ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const aoRolar = function () {
      header.classList.toggle('rolado', window.scrollY > 12);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
  }

  /* ---------- Menu compacto (celular) ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const painel = document.getElementById('menu-mobile');

  function fecharMenu() {
    if (!toggle || !painel) return;
    toggle.setAttribute('aria-expanded', 'false');
    painel.setAttribute('data-aberto', 'false');
  }

  if (toggle && painel) {
    toggle.addEventListener('click', function () {
      const aberto = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!aberto));
      painel.setAttribute('data-aberto', String(!aberto));
    });

    painel.addEventListener('click', function (evento) {
      if (evento.target.closest('a')) fecharMenu();
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') fecharMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) fecharMenu();
    });
  }

  /* ---------- Botões e links de WhatsApp ---------- */
  document.querySelectorAll('[data-whats]').forEach(function (el) {
    const chave = el.getAttribute('data-whats');
    const mensagem = typeof MENSAGENS !== 'undefined' && MENSAGENS[chave] ? MENSAGENS[chave] : null;
    el.setAttribute('href', linkWhatsApp(mensagem));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* Telefone: link tel: */
  document.querySelectorAll('[data-tel]').forEach(function (el) {
    el.setAttribute('href', 'tel:' + LOJA.telefoneLink.replace(/\s/g, ''));
  });

  /* Instagram */
  document.querySelectorAll('[data-instagram]').forEach(function (el) {
    el.setAttribute('href', LOJA.instagram);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* Mapa */
  document.querySelectorAll('[data-mapa]').forEach(function (el) {
    el.setAttribute('href', LOJA.mapa);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* Ano atual no rodapé */
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Revelação suave ao rolar ---------- */
  const alvos = document.querySelectorAll('.reveal');
  if (alvos.length) {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzir || !('IntersectionObserver' in window)) {
      alvos.forEach(function (el) { el.classList.add('visivel'); });
    } else {
      const obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            obs.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      alvos.forEach(function (el) { obs.observe(el); });
    }
  }

  /* ---------- Filtros colapsáveis no celular (estoque) ---------- */
  const botaoFiltros = document.querySelector('.filtros-mobile-btn');
  const alvoFiltros = document.getElementById('filtros');
  const painelFiltros = alvoFiltros ? (alvoFiltros.closest('.filtros-card') || alvoFiltros) : null;
  if (botaoFiltros && painelFiltros) {
    botaoFiltros.addEventListener('click', function () {
      const recolhido = painelFiltros.getAttribute('data-rec') === 'true';
      painelFiltros.setAttribute('data-rec', String(!recolhido));
      botaoFiltros.setAttribute('aria-expanded', String(recolhido));
      botaoFiltros.textContent = recolhido ? 'Ocultar filtros' : 'Filtrar veículos';
    });
  }
})();
