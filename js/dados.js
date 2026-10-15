/* ==========================================================================
   Ferreira Veículos — dados da loja e do estoque
   Fonte das informações: Instagram @ferreira_veiculos_go e cadastros públicos
   da loja (consultados em 15/10/2026). Tudo o que estiver em `null` aparece
   como "Consulte" e deve ser preenchido pela equipe antes da publicação.
   ========================================================================== */

const LOJA = {
  nome: 'Ferreira Veículos',
  nomeCompleto: 'Ferreira Veículos | Águas Lindas',
  cidade: 'Águas Lindas de Goiás - GO',
  endereco: 'Quadra 01, Lote 01 - Mansões Centroeste',
  cep: '72915-180',
  telefoneExibicao: '(61) 99140-4475',
  telefoneLink: '+5561991404475',
  whatsapp: '5561991404475',           // número usado em todos os botões wa.me
  whatsappBio: 'https://wa.me/message/S4Y6SXEYINUAM1', // link curto do perfil do Instagram
  horario: 'Segunda a sábado, das 8h às 18h',
  horarioCurto: 'Seg a sáb · 8h às 18h',
  domingo: 'Domingo fechado',
  instagram: 'https://www.instagram.com/ferreira_veiculos_go/',
  instagramHandle: '@ferreira_veiculos_go',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Quadra+01+Lote+01+Mans%C3%B5es+Centroeste+%C3%81guas+Lindas+de+Goi%C3%A1s+GO+72915-180',
  slogan: 'Aqui vendemos sonhos e fazemos amigos.',
  servicos: ['Compra e venda de seminovos', 'Financiamento', 'Consignação', 'Troca e avaliação do seu usado'],
  desde: null // "desde" visível na fachada, ano a confirmar com a loja
};

/* Abre uma conversa no WhatsApp com uma mensagem pré-preenchida. */
function linkWhatsApp(mensagem) {
  const base = 'https://wa.me/' + LOJA.whatsapp;
  return mensagem ? base + '?text=' + encodeURIComponent(mensagem) : base;
}

/* Mensagens padrão de cada canal de interesse */
const MENSAGENS = {
  geral: 'Olá! Vim pelo site da Ferreira Veículos e gostaria de mais informações sobre os veículos disponíveis.',
  estoque: 'Olá! Vi o estoque no site da Ferreira Veículos e gostaria de saber quais carros estão disponíveis.',
  financiamento: 'Olá! Vim pelo site e gostaria de saber como funciona o financiamento de veículos na Ferreira Veículos.',
  avaliacao: 'Olá! Vim pelo site e gostaria de avaliar o meu carro para venda ou troca.',
  duvida: 'Olá! Vim pelo site da Ferreira Veículos e tenho uma dúvida.'
};

/* --------------------------------------------------------------------------
   Estoque — veículos publicados no Instagram da loja e conferidos pela equipe
   Campos com `null` ainda não foram confirmados pela loja.
   status: 'disponivel' | 'reservado' | 'vendido'  (só "disponivel" é exibido)
   -------------------------------------------------------------------------- */
const VEICULOS = [
  {
    id: 'nissan-kicks-2024',
    marca: 'Nissan',
    modelo: 'Kicks',
    versao: null,
    ano: 2024,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'SUV',
    preco: null,
    status: 'disponivel',
    selo: 'Novidade',
    destaque: true,
    descricao: 'Nissan Kicks 2024 em destaque no estoque. Confira versão, quilometragem, itens e condições de venda diretamente com a equipe.',
    fotos: ['img/veiculos/nissan-kicks-2024.jpg'],
    capa: 'img/veiculos/thumbs/nissan-kicks-2024.jpg',
    atualizado: '2026-10-14',
    anuncio: 'https://www.instagram.com/p/DefGWxwGEC8/'
  },
  {
    id: 'fiat-toro-ranch-2023',
    marca: 'Fiat',
    modelo: 'Toro',
    versao: 'Ranch',
    ano: 2023,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'Picape',
    preco: null,
    status: 'disponivel',
    selo: 'Destaque',
    destaque: true,
    descricao: 'Fiat Toro Ranch 2023 — segundo o nosso anúncio, a versão mais completa da categoria. Consulte opcionais, quilometragem e condições com a equipe.',
    fotos: ['img/veiculos/fiat-toro-ranch-2023.jpg'],
    capa: 'img/veiculos/thumbs/fiat-toro-ranch-2023.jpg',
    atualizado: '2026-08-29',
    anuncio: 'https://www.instagram.com/p/DcouQw0zd_Z/'
  },
  {
    id: 'peugeot-208-2017',
    marca: 'Peugeot',
    modelo: '208',
    versao: '1.2',
    ano: 2017,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'Hatch',
    preco: null,
    status: 'disponivel',
    selo: null,
    destaque: true,
    descricao: 'Peugeot 208 1.2 2017, único dono, com todas as revisões feitas na concessionária, conforme publicado pela loja. Consulte quilometragem e preço.',
    fotos: ['img/veiculos/peugeot-208-2017.jpg'],
    capa: 'img/veiculos/thumbs/peugeot-208-2017.jpg',
    atualizado: '2026-09-24',
    anuncio: 'https://www.instagram.com/p/Ddq7OVEEeeS/'
  },
  {
    id: 'chevrolet-prisma-ltz-2016',
    marca: 'Chevrolet',
    modelo: 'Prisma',
    versao: 'LTZ 1.4 Automático',
    ano: 2016,
    km: null,
    cambio: 'Automático',
    combustivel: null,
    categoria: 'Sedã',
    preco: null,
    status: 'disponivel',
    selo: null,
    destaque: true,
    descricao: 'Chevrolet Prisma LTZ 1.4 automático 2016. Consulte quilometragem, revisões e condições de venda com a equipe Ferreira Veículos.',
    fotos: ['img/veiculos/chevrolet-prisma-ltz-2016.jpg'],
    capa: 'img/veiculos/thumbs/chevrolet-prisma-ltz-2016.jpg',
    atualizado: '2026-09-24',
    anuncio: 'https://www.instagram.com/p/Ddq7AleETvY/'
  },
  {
    id: 'fiat-punto-sporting-2011',
    marca: 'Fiat',
    modelo: 'Punto',
    versao: 'Sporting 1.8',
    ano: 2011,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'Hatch',
    preco: null,
    status: 'disponivel',
    selo: null,
    destaque: false,
    descricao: 'Fiat Punto Sporting 1.8 2011. Consulte quilometragem, revisões e condições de compra com a equipe.',
    fotos: ['img/veiculos/fiat-punto-sporting-2011.jpg'],
    capa: 'img/veiculos/thumbs/fiat-punto-sporting-2011.jpg',
    atualizado: '2026-08-26',
    anuncio: 'https://www.instagram.com/p/DcgbJjTFlhU/'
  },
  {
    id: 'fiat-palio-economy-2014',
    marca: 'Fiat',
    modelo: 'Palio',
    versao: 'Economy',
    ano: 2014,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'Hatch',
    preco: null,
    status: 'disponivel',
    selo: null,
    destaque: false,
    descricao: 'Fiat Palio Economy 2014. Consulte quilometragem, itens e condições de venda com a equipe.',
    fotos: ['img/veiculos/fiat-palio-economy-2014.jpg'],
    capa: 'img/veiculos/thumbs/fiat-palio-economy-2014.jpg',
    atualizado: '2026-09-28',
    anuncio: 'https://www.instagram.com/p/Dd1V8izlPvb/'
  },
  {
    id: 'chevrolet-corsa-joy-2008',
    marca: 'Chevrolet',
    modelo: 'Corsa',
    versao: 'Joy 1.4',
    ano: 2008,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'Hatch',
    preco: null,
    status: 'disponivel',
    selo: null,
    destaque: false,
    descricao: 'Chevrolet Corsa Joy 1.4 2008, completo e com ar-condicionado, conforme publicado pela loja. Consulte quilometragem e condições.',
    fotos: ['img/veiculos/chevrolet-corsa-joy-2008.jpg'],
    capa: 'img/veiculos/thumbs/chevrolet-corsa-joy-2008.jpg',
    atualizado: '2026-08-26',
    anuncio: 'https://www.instagram.com/p/Dcga_RtFvit/'
  },
  {
    id: 'chevrolet-s10',
    marca: 'Chevrolet',
    modelo: 'S10',
    versao: null,
    ano: null,
    km: null,
    cambio: null,
    combustivel: null,
    categoria: 'Picape',
    preco: null,
    status: 'disponivel',
    selo: 'Destaque',
    destaque: true,
    descricao: 'Chevrolet S10 publicada no Instagram da loja. Ano, versão, quilometragem e preço sob consulta com a equipe Ferreira Veículos.',
    fotos: ['img/veiculos/chevrolet-s10.jpg'],
    capa: 'img/veiculos/thumbs/chevrolet-s10.jpg',
    atualizado: '2026-08-26',
    anuncio: 'https://www.instagram.com/p/DcgbDr8lv8o/'
  }
];

/* ---------- Helpers de estoque ---------- */

function veiculosDisponiveis() {
  return VEICULOS.filter(function (v) { return v.status === 'disponivel'; });
}

function acharVeiculo(id) {
  return VEICULOS.find(function (v) { return v.id === id; }) || null;
}

function nomeVeiculo(v) {
  return (v.marca + ' ' + v.modelo).trim();
}

function tituloVeiculo(v) {
  const partes = [nomeVeiculo(v)];
  if (v.versao) partes.push(v.versao);
  if (v.ano) partes.push(String(v.ano));
  return partes.join(' ');
}

function precoExibicao(v) {
  if (v.preco === null || v.preco === undefined) return 'Consulte';
  return v.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function valorOuConsulte(valor, sufixo) {
  if (valor === null || valor === undefined || valor === '') return 'Consulte';
  return String(valor) + (sufixo || '');
}

function dataExibicao(iso) {
  if (!iso) return '—';
  const partes = iso.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function categoriasDisponiveis() {
  return [...new Set(VEICULOS.map(function (v) { return v.categoria; }))].sort();
}

function marcasDisponiveis() {
  return [...new Set(VEICULOS.map(function (v) { return v.marca; }))].sort();
}
