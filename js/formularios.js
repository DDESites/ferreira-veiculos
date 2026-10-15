/* ==========================================================================
   Ferreira Veículos — formulários do site
   Sem servidor: os dados são montados em uma mensagem e enviados ao
   WhatsApp da loja, abrindo a conversa já preenchida.
   ========================================================================== */

(function () {
  'use strict';

  function valor(campo) {
    const el = document.querySelector('[name="' + campo + '"]');
    return el ? String(el.value || '').trim() : '';
  }

  function marcarErro(chave, texto) {
    const alvo = document.querySelector('[data-erro="' + chave + '"]');
    if (alvo) alvo.textContent = texto || '';
  }

  function limparErros(form) {
    form.querySelectorAll('[data-erro]').forEach(function (el) { el.textContent = ''; });
  }

  function telefoneValido(tel) {
    const digitos = tel.replace(/\D/g, '');
    return digitos.length >= 10 && digitos.length <= 13;
  }

  function abrirWhatsApp(mensagem) {
    const url = linkWhatsApp(mensagem);
    window.open(url, '_blank', 'noopener');
  }

  function mostrarOk(id) {
    const ok = document.getElementById(id);
    if (ok) ok.setAttribute('data-visivel', 'true');
  }

  /* ---------------- Formulário: avalie seu carro ---------------- */
  const avalie = document.getElementById('form-avalie');
  if (avalie) {
    avalie.addEventListener('submit', function (evento) {
      evento.preventDefault();
      limparErros(avalie);

      const nome = valor('nome');
      const telefone = valor('telefone');
      const marca = valor('marca');
      const modelo = valor('modelo');
      const ano = valor('ano');
      const km = valor('km');
      const obs = valor('obs');
      const consent = avalie.querySelector('[name="consentimento"]');

      let erro = false;
      if (nome.length < 2) { marcarErro('nome', 'Informe seu nome.'); erro = true; }
      if (!telefoneValido(telefone)) { marcarErro('telefone', 'Informe um telefone com DDD.'); erro = true; }
      if (!marca) { marcarErro('marca', 'Informe a marca do veículo.'); erro = true; }
      if (!modelo) { marcarErro('modelo', 'Informe o modelo.'); erro = true; }
      if (!consent || !consent.checked) { marcarErro('consentimento', 'É preciso autorizar o contato da loja.'); erro = true; }

      if (erro) {
        const primeiro = avalie.querySelector('[data-erro]:not(:empty)');
        if (primeiro) {
          const campo = avalie.querySelector('[name="' + primeiro.getAttribute('data-erro') + '"]');
          if (campo && campo.focus) campo.focus();
        }
        return;
      }

      const linhas = [
        'Olá! Vim pelo site da Ferreira Veículos e gostaria de uma avaliação do meu carro.',
        '',
        '*Nome:* ' + nome,
        '*Telefone:* ' + telefone,
        '*Veículo:* ' + marca + ' ' + modelo + (ano ? ' ' + ano : ''),
        '*Quilometragem:* ' + (km ? km + ' km' : 'não informada')
      ];
      if (obs) linhas.push('*Observações:* ' + obs);
      linhas.push('', 'Autorizo a Ferreira Veículos a entrar em contato comigo. As fotos do veículo envio na sequência pelo WhatsApp.');

      abrirWhatsApp(linhas.join('\n'));
      mostrarOk('ok-avalie');
    });
  }

  /* ---------------- Formulário: fale com a loja ---------------- */
  const contato = document.getElementById('form-contato');
  if (contato) {
    contato.addEventListener('submit', function (evento) {
      evento.preventDefault();
      limparErros(contato);

      const nome = valor('nome');
      const telefone = valor('telefone');
      const assunto = valor('assunto');
      const mensagem = valor('mensagem');

      let erro = false;
      if (nome.length < 2) { marcarErro('nome', 'Informe seu nome.'); erro = true; }
      if (telefone && !telefoneValido(telefone)) { marcarErro('telefone', 'Telefone inválido.'); erro = true; }
      if (mensagem.length < 5) { marcarErro('mensagem', 'Escreva sua mensagem.'); erro = true; }

      if (erro) {
        const primeiro = contato.querySelector('[data-erro]:not(:empty)');
        if (primeiro) {
          const campo = contato.querySelector('[name="' + primeiro.getAttribute('data-erro') + '"]');
          if (campo && campo.focus) campo.focus();
        }
        return;
      }

      const linhas = [
        'Olá! Vim pelo site da Ferreira Veículos.',
        '',
        '*Nome:* ' + nome,
        '*Telefone:* ' + (telefone || 'não informado'),
        assunto ? '*Assunto:* ' + assunto : null,
        '',
        '*Mensagem:* ' + mensagem
      ].filter(Boolean);

      abrirWhatsApp(linhas.join('\n'));
      mostrarOk('ok-contato');
    });
  }
})();
